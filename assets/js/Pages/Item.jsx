import React, { useState, useEffect, useContext } from 'react';
import '../../scss/Item.scss'
import UnsplashAPI from '../Services/UnsplashAPI';
import Axios from 'axios';
import AuthContext from '../Contexts/AuthContext';
import basketContext from '../Contexts/basketContext';
import { Link } from 'react-router-dom';
import { API_URL } from '../config';

const Item = ({history, match}) => {
  
  const id = match.params.id;
  const [pictures, setPictures] = useState([]);
  const [styleError, setStyleError] = useState({display: 'none'});
  const [item, setItem] = useState({
    "@context": "string",
    "@id": "string",
    "@type": "string",
    "id": 0,
    "name": "string",
    "price": 0,
    "resume": "string",
    "pictures": [
      "string"
    ],
    "stocks": [
      {
        "@context": "string",
        "@id": "string",
        "@type": "string",
        "id": 0,
        "size": 0,
        "quantity": 0
      }
    ]});
  const {basket, setBasket} = useContext(basketContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [itemBasket, setItemBasket] = useState({
    productId: id,
    productGenre: "men",
    productSize: "",
    productPrice: "",
    productName: "",
  });
  const [productOnBasket, setProductOnBasket] = useState(false);
  const [currentMofify, setCurrentModify] = useState(false);
  const [styleBackground, setStyleBackground] = useState({display: 'none'});
  const picturesArray = [];
  const basketArray = [];

  const fetchPictures = async() => {
    try {
      Axios.get(UnsplashAPI.unsplashPackShot())
      .then(response => {
        for (let index = 0; index < response.data.results.length; index++) {
          picturesArray.push(response.data.results[index].urls.regular)
          
        }
        setPictures(picturesArray);
      })
    }catch(error) {
      console.log(error)
    }
  }

  const checkBasket = () => {
    if(JSON.parse(localStorage.getItem("basket"))){
      for (let index = 0; index < JSON.parse(localStorage.getItem("basket")).length; index++) {

        if(id === JSON.parse(localStorage.getItem("basket"))[index].productId){
          setProductOnBasket(true);
          setItemBasket({...itemBasket, productSize : JSON.parse(localStorage.getItem("basket"))[index].productSize})
        }
      }
    }
  }

  const fetchItem = async(id) => {
    try{
      Axios.get(API_URL + '/products/'+id)
      .then(response => setItem(response.data));
     
    }catch(error){
      console.log(error)
    }
  }
  
  const handleGenre = ({currentTarget}) => {
    document.getElementsByClassName('item-genre-btn').forEach(element => {
      element.classList.remove("item-genre-selected")
    });
    currentTarget.classList.add("item-genre-selected");
    setItemBasket({...itemBasket, productGenre : currentTarget.value});
  }

  const handleSize = ({currentTarget}) => {
    document.getElementsByClassName('item-size-btn').forEach(element => {
      element.classList.remove("item-size-selected")
    });
    currentTarget.classList.add("item-size-selected");
    setItemBasket({...itemBasket, productSize : currentTarget.value, productPrice : item.price, productName: item.name});
  }

  const handleBasket = () => {
    
    if(itemBasket.productSize === ""){
      setStyleError({display: 'block'})
    }else{

      if(JSON.parse(localStorage.getItem("basket")) && currentMofify === true){
        for (let index = 0; index < JSON.parse(localStorage.getItem("basket")).length; index++) {         
          basketArray.push(JSON.parse(localStorage.getItem("basket"))[index])
        }
        for (let index = 0; index < basketArray.length; index++) {
          if(basketArray[index].productId === id){
            basketArray[index].productSize = itemBasket.productSize;
            basketArray[index].productGenre = itemBasket.productGenre;
          }
        }
        localStorage.removeItem('basket')
        localStorage.setItem('basket', JSON.stringify(basketArray))
        setProductOnBasket(true);
        setBasket(basketArray);
        setStyleBackground({display: 'block'});
        setTimeout(() => {
          setStyleBackground({display: 'none'});
        }, 5000);
      }else if (JSON.parse(localStorage.getItem("basket"))){
          for (let index = 0; index < JSON.parse(localStorage.getItem("basket")).length; index++) {
            
            basketArray.push(JSON.parse(localStorage.getItem("basket"))[index])
          }
          basketArray.push(itemBasket);
          localStorage.removeItem('basket')
          localStorage.setItem('basket', JSON.stringify(basketArray))
          setProductOnBasket(true);
          setBasket(basketArray);
          setStyleBackground({display: 'block'});
          setTimeout(() => {
            setStyleBackground({display: 'none'});
          }, 5000);
      }else{
        basketArray.push(itemBasket);
        localStorage.setItem('basket', JSON.stringify(basketArray))
        setBasket(basketArray);
        setProductOnBasket(true);
        setStyleBackground({display: 'block'});
        setTimeout(() => {
          setStyleBackground({display: 'none'});
        }, 5000);
      }
    }
    
  }

  const handleModifyBasket = () => {
    document.getElementsByClassName('item-size-btn').forEach(element => {
      element.classList.remove("item-size-selected")
    });
    setProductOnBasket(false);
    setCurrentModify(true);
  }

  useEffect(() => {
    fetchPictures();
    fetchItem(id);
    checkBasket();
  }, [])

  return ( <>
    <div className="container-product-add" style={styleBackground}>
      <div className="product-add">
        <div className="product-add-close">
          <p><ion-icon name="checkmark-circle-sharp"></ion-icon> Add to basket</p>
          <span>X</span>
        </div>
        <div className="product-add-img">
          <img src={pictures[0]} alt=""/>
          <div className="product-add-info">
            <p>{item.name}</p>
            <p>{itemBasket.productGenre}</p>
            <p>EU {itemBasket.productSize}</p>
            <p>{item.price} €</p>
          </div>
        </div>
        <div className="product-add-btn">
          <Link to="/basket"><button>Go to basket</button></Link>
        </div>
      </div>
    </div>
    
    <div className="container-item container-item-overlay">
      <div className="item-left">
      {
        pictures.map((item, index) =>
          <img key={index} src={item} alt=""/>
        )
      }
      </div>
      <div className="item-right">
        <div className="item-info">
          <p>{item.name}</p>
          <p>{item.price} €</p>
        </div>
        <h4>Select Genre</h4>
        <div className="item-genre">
          {
            (itemBasket.productGenre === "men") ?
            <>
            <button onClick={handleGenre} className="item-genre-btn item-genre-selected" value="men">Men</button>
            <button value="women" className="item-genre-btn" onClick={handleGenre}>Women</button> </>: 
            <>
            <button onClick={handleGenre} className="item-genre-btn" value="men">Men</button>
            <button value="women" className="item-genre-btn item-genre-selected" onClick={handleGenre}>Women</button></>
          }
          
          
        </div>
        <h4>Select Size <span style={styleError}>Chose a size</span></h4>
        <div className="item-size">
          {
            item.stocks.map(stock =>
              (parseInt(itemBasket.productSize) === stock.size) ?
              <button onClick={handleSize} className="item-size-btn item-size-selected" key={stock.id} value={stock.size} >EU {stock.size}</button> :
              <button onClick={handleSize} className="item-size-btn" key={stock.id} value={stock.size} >EU {stock.size}</button>
            )
          }
        </div>
        {
          (productOnBasket) ?
          <button onClick={handleModifyBasket} className="add-basket">modify product</button> :
          <button onClick={handleBasket} className="add-basket">add to basket</button>
        }
        
        <div className="item-resume">
          <p>The {item.name} {item.resume}</p>
        </div>
      </div>

    </div>
  </> );
}
 
export default Item;