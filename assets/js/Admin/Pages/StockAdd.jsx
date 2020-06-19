import React, { useEffect, useState } from 'react';
import NavSide from '../Components/NavSIde';
import Axios from 'axios';
import {API_URL} from '../../config';

const StockAdd = ({match, history}) => {

  const id = match.params.id;
  const [dataStock, setDataStock] = useState({
    size : 0,
    quantity: 0,
    productId: ""
  });
  const [stockProduct, setStockProducts] = useState();
  const [validate, setValidate] = useState(false);
  const [error, setError] = useState("");

  const fetchDataProduct = async id => {

    try{
      const response = await Axios.get(API_URL + '/products/' + id).then(setValidate(true))
      setStockProducts(response.data.stocks);
      
    }catch(error){
      console.log(error);
    }
  }

  const handleChangeNumber = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setDataStock({ ...dataStock, [name]: parseInt(value)});
  };

  const handleSubmit = async event => {
    event.preventDefault();

    for (let i = 0; i < stockProduct.length; i++) {
      if(stockProduct[i].size === dataStock.size){
        return setError("Size "+stockProduct[i].size+" already exist")
      }
    }
    try{
      console.log(id);
      await Axios.post(API_URL + '/stocks', {...dataStock, productId: '/api/products/'+id})
      history.replace('/dashboard/stocks')
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDataProduct(id);
  }, [])

  return ( <>
    <div className="container-admin">
      <NavSide></NavSide>
      <div className="content-view">
        <h2>Products {id} </h2>
        <div className="admin-block">
          <form onSubmit={handleSubmit}>
            <span>{error}</span>
            <div className="form-grp">
              <label>Size</label>
              <input value={dataStock.size} name="size" onChange={handleChangeNumber} id="size" type="number" placeholder="Size"/>
            </div> 
            <div className="form-grp">
              <label>Quantity</label>
              <input value={dataStock.quantity} name="quantity" onChange={handleChangeNumber} id="quantity" type="number" placeholder="Quantity"/>
            </div> 
            {
              (validate) ?<button className="primary" type="submit">Validate</button>      : <></>
            }
                 
          </form>
         
        </div>
      </div>
    </div>
  </> );
}
 
export default StockAdd;