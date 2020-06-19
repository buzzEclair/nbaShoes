import React, { useState, useEffect } from 'react';
import NavSide from '../Components/NavSIde';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import {API_URL} from '../../config';

const Collections = (props) => {


  const [data, setData] = useState([]);

  const fetchData = async => {
    try{
      Axios.get(API_URL + '/collections')
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
        <h2>Collections</h2>
        <div className="admin-block">
          <div className="admin-block-header">
            <h4>Collections</h4>
            <Link to={"/dashboard/collections/new"}>
              <button className="primary">New Collection</button>
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>title</th>
                <th></th>
                
              </tr>
            </thead>
            <tbody>
              {
                data.map((item, index)=>
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    
                    <td>
                      <Link to={"/dashboard/collections/" + item.id}>
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
 
export default Collections;