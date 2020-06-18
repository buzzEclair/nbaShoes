import React, { useState, useEffect, useCallback, useContext } from 'react';
import '../../scss/NavBar.scss';
import { useHistory, Link } from "react-router-dom";
import AuthContext from '../Contexts/AuthContext';
import AuthAPI from '../Services/AuthAPI';
import AdminContext from '../Contexts/AdminContext';
import Search from './Saerch';

const NavBar = (props) => {

  // 
  const { isAdmin ,setIsAdmin } = useContext(AdminContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const basket = JSON.parse(localStorage.getItem('basket'));
  
  // State useHistory
  const history = useHistory();

  // Const style
  const [inputStyle, setInputStyle] = useState({});
  const [iconSearchStyle, setIconSearchStyle] = useState({});
  const [showInput, setShowInput] = useState(0);
  const [fontColor, setFontColor] = useState({color: '#101010'});

  // Show input to search
  const handleSearch = () => {
    setInputStyle({width: '140px', opacity: 1});
    setIconSearchStyle({fontSize: '20px', marginRight: '10px'});
    setShowInput(1);
  }

  // Hide input to search
  const handleClickOutside = (event) => {
    if(showInput === 1 && event.path[0].id !== "navbar-search-input"){
      setInputStyle({width: '0', opacity: 0});
      setIconSearchStyle({});
      setShowInput(0);
    }
  };


  const handleClickLogin = () => {
    if(isAuthenticated){
      history.replace("/profil");
    }else{
      history.replace("/login");
    }
  }

  const handleLogout = (event) => {
    event.preventDefault();
    AuthAPI.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
    history.push("/login");
  };

  useEffect(() => {
    document.getElementsByTagName("body")[0].addEventListener("click", handleClickOutside);
    return () => {
      document.getElementsByTagName("body")[0].removeEventListener("click", handleClickOutside);
    }
  });

  return ( <>
    <div className="navbar" style={fontColor}>
      <div className="navbar-left">
        <Link to="/"><ion-icon name="basketball-outline"></ion-icon></Link>
        
      </div>
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Search style={inputStyle}></Search>
          <ion-icon style={iconSearchStyle} onClick={handleSearch} name="search-outline"></ion-icon>
        </div>
        <div>
        <Link to="/shop"> <ion-icon name="pricetag-outline"></ion-icon></Link>
        </div>
        <Link to="/basket">
        <div className="navbar-basket-icon">
        <ion-icon name="basket-outline"></ion-icon>
        {

          (basket) ? 
          <span>{basket.length}</span> :
          <></>
        }
        </div>
        </Link>
        <div>
          <ion-icon onClick={handleClickLogin}  name="person-circle-outline"></ion-icon>
        </div>
        {(isAuthenticated && (
          <div>
            <ion-icon onClick={handleLogout} name="close-outline"></ion-icon>
          </div>
          ))}
        {
          (isAdmin && (
            <Link to="/dashboard">
              <div>
               <ion-icon name="planet-outline"></ion-icon>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  </> );
}
 
export default NavBar;