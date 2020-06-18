import React, { useState, useEffect } from 'react';
import NavSide from '../Components/NavSIde';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Stocks = (props) => {

  const [dataProduct, setDataProduct] = useState([]);
  const [dataStocks, setDataStocks] = useState([]);
  const [stockOpen, setStockOpen] = useState(false);
  const [currentProduct, setCurrnetProduct] = useState();

  const fetchDataProduct = async => {
    try{
      Axios.get('http://127.0.0.1:8000/api/products')
      .then(response => setDataProduct(response.data['hydra:member']))
    }catch(error){
      console.log(error);
    }
  }



  const handleClick = async (stocks, id, name) => {
    const stocksArray = [];
    for (let i = 0; i < stocks.length; i++) {
      stocksArray.push(stocks[i]);
    }
    setDataStocks(stocksArray);
    setStockOpen(true);
    setCurrnetProduct({id, name});
  }

  useEffect(() =>{
    fetchDataProduct()
  }, []);

  return ( <>
    <div className="container-admin">
      <NavSide></NavSide>
      <div className="content-view">
        <h2>Stocks</h2>
        <div className="admin-block admin-block-100">
          <div className="admin-block-header">
            <h4>All Products</h4>
            
          </div>
          <div className="content-stock">

            {
              dataProduct.map(item =>
              <button key={item.id} className="primary" onClick={() => handleClick(item.stocks, item.id, item.name)}>{item.name}</button>
              )
            }
          </div>
        </div>
        {
          (stockOpen) ?
          <div className="admin-block admin-block-100">
            <div className="admin-block-header">
              <h4>Stock of product : {currentProduct.name}</h4>
              <Link to={'/dashboard/stocks/add/'+ currentProduct.id}>
                <button className="primary">Add Stock</button>
              </Link>
            </div>
            <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              {
                dataStocks.map((item, index)=>
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.size}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <Link to={"/dashboard/stocks/" + item.id}>
                        <ion-icon name="arrow-forward-circle"></ion-icon>
                      </Link>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
          </div> :
          <></>
        }
      </div>
    </div>
  </> );
}
 
export default Stocks;