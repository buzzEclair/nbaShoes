import React from 'react';
import '../../../scss/admin/NavSide.scss';
import { Link } from 'react-router-dom';

const NavSide = (props) => {
  return ( <>
    <nav className="nav-side">
      <Link to="/dashboard"> 
        <div className="item item-active">
          <ion-icon name="planet-outline"></ion-icon><span>Dashboard</span>
        </div>
      </Link>
      <Link to="/dashboard/products">
        <div className="item">
          <ion-icon name="pricetags-outline"></ion-icon><span>Products</span>
        </div>
      </Link>
      <Link to="/dashboard/stocks">
      <div className="item">
        <ion-icon name="albums"></ion-icon><span>Stocks</span>
      </div>
      </Link>
      <div className="item">
        <ion-icon name="cash-outline"></ion-icon><span>Sales</span>
      </div>
      <Link to="/dashboard/collections">
        <div className="item">
          <ion-icon name="albums-outline"></ion-icon><span>Collections</span>
        </div>
      </Link>
    </nav>
    
  </> );
}
 
export default NavSide;