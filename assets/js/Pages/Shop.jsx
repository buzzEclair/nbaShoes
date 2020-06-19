import React, { useEffect } from 'react';
import { useState } from "react";
import Axios from 'axios';
import '../../scss/Shop.scss';
import ImgShop from '../Components/imgShop';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import {API_URL} from '../config';

const Shop = ({history}) => {
  const [items, setItems] = useState([]);
  
  const fetchItems = async() => {
    try {
      Axios.get(API_URL + '/products')
      .then(response => setItems(response.data['hydra:member']))
    }catch(error) {
      console.log(error)
    }
  }

  const handleClick = (id) => {
    history.replace('/shop/'+id)
  }

  useEffect(() => {
    fetchItems();
  }, [])

  return ( <>

    <div className="content-shop">
      <div className="content-shop-items">
      {
        items.map((item, index) => 
          <div  key={item.id} className="shop-item">
            <div className="shop-item-img">
       
              <ImgShop customClickEvent={() => {handleClick(item.id); }} id={item.pictures[0]}></ImgShop> 
            </div>
            <div onClick={() => handleClick(item.id)} className="shop-item-info">
              <p>{item.name || <Skeleton />}</p>
              <p>{item.price} €</p>
            </div>
          </div>
        )
      }
    </div>
    </div>
   
  </> );
}
 
export default Shop;