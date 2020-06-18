import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import UnsplashAPI from '../../Services/UnsplashAPI';

const ImgShopThumb = ({customClickEvent, id}) => {
  const [item, setitem] = useState()
 
  const fetchItem = async (id) => {
    try{
      await Axios.get(UnsplashAPI.unsplashId(id))
      .then(response => setitem(response.data.urls.thumb))
      
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchItem(id)
  }, [])

  return ( <>
    <img onClick={customClickEvent} src={item} alt=""/> 
  </> );
}

 
export default ImgShopThumb;