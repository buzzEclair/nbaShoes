import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import UnsplashAPI from '../Services/UnsplashAPI';
import { API_URL } from '../config';

const ImgBasket = ({id}) => {

  const [data, setData] = useState({pictures : [
    "jifk"
  ]});

  const fetchItem = async () => {

    try{
      Axios.get(API_URL + '/products/' + id).then(response => Axios.get(UnsplashAPI.unsplashId(response.data.pictures[0])).then(data => setData(data.data.urls.small)))
    }catch(error){
      console.log(error);
    }

  }

  useEffect(() => {
    fetchItem()
  }, []);


  return ( 
    <>
     <img src={data} alt=""/>
    </>
   );
}
 
export default ImgBasket;