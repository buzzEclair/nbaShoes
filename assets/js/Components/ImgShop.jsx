import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import UnsplashAPI from '../Services/UnsplashAPI';

const ImgShop = ({customClickEvent, id}) => {

  const [item, setitem] = useState()

  const fetchItem = async (id) => {
    try{
      await Axios.get(UnsplashAPI.unsplashId(id))
      .then(response => setitem(response.data.urls.regular))
      
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchItem(id)
  }, [])

  return ( <>
    <img  onClick={customClickEvent} src={item} alt=""/>
  </> );
}
 
export default ImgShop;