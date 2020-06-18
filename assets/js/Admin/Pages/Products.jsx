import React, { useState, useEffect } from 'react';
import NavSide from '../Components/NavSIde';
import Axios from 'axios';
import { useHistory, Link } from "react-router-dom";

const Products = (props) => {
  
  const [data, setData] = useState([]);

  const fetchData = async => {
    try{
      Axios.get('http://127.0.0.1:8000/api/products')
      .then(response => setData(response.data['hydra:member']))
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return ( <>
    <div className="container-admin">
      <NavSide></NavSide>
      <div className="content-view">
        <h2>Products</h2>
        <div className="admin-block">
          <div className="admin-block-header">
            <h4>Latest Sells</h4>
            <Link to={"/dashboard/products/new"}>
              <button className="primary">New Product</button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Price</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index)=>
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <Link to={"/dashboard/products/" + item.id}>
                        <ion-icon name="arrow-forward-circle"></ion-icon>
                      </Link>
                    </td>
                  </tr>
                )
              }
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </> );
}
 
export default Products;