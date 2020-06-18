import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import ImgShop from '../Components/imgShop';

const SearchPage = (props) => {

  const history = useHistory();
  const query = props.match.params.q;
  const [result, setResult] = useState([{pictures: []}]);


  const search = async() => {
    try {
      await Axios
      .get('http://127.0.0.1:8000/api/products?name='+query)
      .then(response => setResult(response.data['hydra:member']))
    } catch (error) {
      
    }
  }

  const handleClick = (id) => {
    history.replace('/shop/'+id)
  }

  useEffect(() => {
    search();
  }, [query])

  return ( <>
    <div className="content-shop">
      <div className="content-shop-items">
      {
        result.map((item, index) => 
          <div  key={item.id} className="shop-item">
            <div className="shop-item-img">
       
              <ImgShop customClickEvent={() => {handleClick(item.id); }} id={item.pictures[0]}></ImgShop> 
            </div>
            <div onClick={() => handleClick(item.id)} className="shop-item-info">
              <p>{item.name}</p>
              <p>{item.price} €</p>
            </div>
          </div>
        )
      }
      </div>
    </div>
    </>);
}
 
export default SearchPage;