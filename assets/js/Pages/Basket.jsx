import React, { useEffect, useState, useContext } from 'react';
import '../../scss/Basket.scss';
import AuthContext from '../Contexts/AuthContext';
import Axios from 'axios';
import ImgShop from '../Components/imgShop';
import ImgBasket from '../Components/ImgBasket';


const Basket = ({history}) => {

  const token = localStorage.getItem('authToken');
  const config =  {
    headers: { Authorization: `Bearer ${token}` }
  };
  const { isAuthenticated } = useContext(AuthContext);
  const [basketLocal, setBasketLocal] = useState([{productId: 0}]);
  const [code, setCode] = useState({
    code : ""
  })
  const [activate, setActivate] = useState(false);
  const [amount, setAmount] = useState();
  const [amountPrimary, setAmountPrimary] = useState();
  const [tax, setTax] = useState();
  const [process, setProcess] = useState(0);
 
  const fetchBastket = () => {
    if(localStorage.getItem('basket') === null){
      console.log('noob')
      setBasketLocal([]);
      totalAmount([])
    }else{

      setBasketLocal(JSON.parse(localStorage.getItem('basket')));
      totalAmount(JSON.parse(localStorage.getItem('basket')))
    }
  }

  const totalAmount = (basketLocal) => {
    let amount = 0;
    for (let i = 0; i < basketLocal.length; i++) {
      amount += basketLocal[i].productPrice;
    }
    setAmount(amount);
    setAmountPrimary(amount);
    const tax = Math.round((amount * 12)/100);
    setTax(tax);
  }

  const linkBasketToUser = async event => {

    try{
      
      await Axios.post('http://127.0.0.1:8000/api/sells', {
        amount: amount,
        products : basketLocal
      },config).then(function (response) {
        console.log(response);
      })
    }catch(error){
      
    }
  }

  const handleChange = ({currentTarget}) => {
    const {value} = currentTarget;

    if(value.toLowerCase() === "nike"){
      setActivate(true)
      setCode({...code, code: value })
    }else{
      setActivate(false)
      setCode({...code, code: value })
      setAmount(amountPrimary);
      document.getElementById("btn-promo").disabled = false;
    }
  }

  const handlePromo = ({currentTarget}) => {
    if(activate){
      const promo = Math.round(amount - (amount * 10 / 100));
      currentTarget.disabled = true;
      setAmount(promo);
    }
  }

  const handlePayement = () => {
    if(isAuthenticated){
      linkBasketToUser();
      //localStorage.removeItem('basket');
      //history.replace('/payement')
    }else{
      history.replace('/login')
    }
  }

  const handleRemove = (productId) => {
    for (let j = 0; j < basketLocal.length; j++) {
      if(productId === basketLocal[j].productId){
        basketLocal.splice(j, 1);
      }
    }
    console.log(basketLocal);
    setBasketLocal(basketLocal);
    setProcess(process + 1);
    localStorage.removeItem('basket');
    localStorage.setItem('basket', JSON.stringify(basketLocal));
    totalAmount(basketLocal);
  }

  useEffect(()=> {
    fetchBastket();
  }, [])
  
  return ( <>
    <div className="container-basket">
      <h2>bag</h2>
      <div className="basket-info">
        <div className="basket-left">
          <table>
            <thead>
              <tr>
                <th>Product List</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {

              basketLocal.map(item=>
                <tr key={item.productId}>
                  <td>
                    <div>
                     {
                       
                       (item.productId === 0) ? 
                       <img src="" alt=""/> :
                       <ImgBasket id={item.productId}></ImgBasket>

                     }
                      <div>
                        <span>{item.productName}</span>
                        <span>{item.productGenre}</span>
                        <span>{item.productSize}</span>

                      </div>
                    </div>
                  </td>

                  <td>{item.productPrice} €</td>
                  <td  ><span onClick={() => handleRemove(item.productId)}className="table-td-remove">x</span></td>
                </tr>
              )
             
            }
            </tbody>
          </table>
        </div>
        <div className="basket-right">
          <div className="basket-code">
            <input onChange={handleChange} value={code.code} placeholder="Code : NIKE" type="text"/>
            {
              (activate) ?
              <button id="btn-promo" className="primary" onClick={handlePromo}>Apply</button> :
              <button id="btn-promo" onClick={handlePromo}>Apply</button>
            }
            
          </div>
          <div className="basket-bill">
            <div>
          <p>Item Subtotal</p><span>{amount} €</span>
            </div>
            <div>
              <p>Deliver Fee</p><span>10 €</span>
            </div>
            <div>
              <p>Tax and Fees</p><span>{tax} €</span>
            </div>
            <div className="total-bill">
          <p>Total</p><span>{amount + tax} €</span>
            </div>
          </div>
        <button onClick={handlePayement} className="primary">Payement</button>
        </div>



      </div>
    </div>
  </> );
}
 
export default Basket;