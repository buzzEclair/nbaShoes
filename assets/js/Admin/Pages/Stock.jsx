import React, { useState, useEffect } from 'react';
import NavSide from '../Components/NavSIde';
import Axios from 'axios';
import {API_URL} from '../../config';

const Stock = ({history, match}) => {

  const id = match.params.id;
  const [data, setData] = useState({
    size : 0,
    quantity: 0,
  });
  

  const fetchData = async id => {
    try{
      
        const { size, quantity } = await Axios.get(API_URL + '/stocks/' + id).then(response => response.data);
        setData({ size, quantity });
      
    }catch(error){
      console.log(error);
    }
  }

  const handleChangeNumber = ({ currentTarget }) => {
    const { value, name } = currentTarget;
   
    setData({ ...data, [name]: parseInt(value) });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    
    try{
      
      await Axios.put(API_URL + '/stocks/'+ id, data)
      
    }catch (response) {
      const { violations } = response.data;
      if(violations){
        const apiErrors = {};
        violations.map(({propertyPath, message}) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
      }
    }
  }

  useEffect(() => {
   
    fetchData(id);
    
  }, []);

  return ( <>
  <div className="container-admin">
      <NavSide></NavSide>
      <div className="content-view">
        <h2>Products {id} / {data.name}</h2>
        <div className="admin-block">
          <form onSubmit={handleSubmit}>
            <div className="form-grp">
              <label>Size</label>
              <input value={data.size} name="size" onChange={handleChangeNumber} id="size" type="number" placeholder="Size"/>
            </div> 
            <div className="form-grp">
              <label>Quantity</label>
              <input value={data.quantity} name="quantity" onChange={handleChangeNumber} id="quantity" type="number" placeholder="Quantity"/>
            </div> 
           
            <button className="primary" type="submit">Validate</button>
          </form>
        </div>
      </div>
    </div>
  </> );
}
 
export default Stock;