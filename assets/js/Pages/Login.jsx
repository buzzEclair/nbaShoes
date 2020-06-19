import React, { useState, useContext } from 'react';
import '../../scss/Login.scss';
import Axios from 'axios';
import AuthContext from '../Contexts/AuthContext';
import JwtDecode from "jwt-decode";
import AdminContext from '../Contexts/AdminContext';

const Login = ({history}) => {

  // 
  const { setIsAuthenticated } = useContext(AuthContext);
  const { setIsAdmin } = useContext(AdminContext);

  // State credentials match to our api 
  const [credentials, setCredentials] = useState({
    username : "",
    password: ""
  })

  const [error, setError] = useState("");

  const handleChange = ({currentTarget}) => {
    const {name, value} = currentTarget;
    setCredentials({...credentials, [name]: value })
  }

  const handleSubmit = async event => {
    event.preventDefault();
    try{
      await Axios.post(API_URL + '/login_check', {
        username : credentials.username,
        password : credentials.password
      }, 
      )
      .then(response => response.data.token)
      .then(token => {
        window.localStorage.setItem("authToken", token);
        const decode = JwtDecode(token);
        if(decode.roles.includes('ROLE_ADMIN')){
          setIsAdmin(true)
        }
      })
      
      
      setIsAuthenticated(true);
      if(window.localStorage.getItem("basket")){
        history.replace("/basket");
      }else{
        history.replace("/");
      }
    } catch(error) {
      setError("Bad informations !")
    }
  }

  return ( <>
  <div className="container-fluid">
    <div className="login-content">

      <div className="login-left">
        <img src="../img/login/background.jpg" alt=""/>
      </div>
      <div className="login-right">
        <div className="login-form">
          
          <form onSubmit={handleSubmit}>
            {(error) && <p>{error}</p>}
            <h2>Sign In to NBA Nike Shoes</h2>
            <div className="form-grp">
              <label>Email Address</label>
              <input value={credentials.username} onChange={handleChange} name="username" id="username" type="text" placeholder="Email Address"/>
            </div> 
            <div className="form-grp">
              <label>Password</label>
              <input value={credentials.password} onChange={handleChange} type="password" name="password" id="password" placeholder="Password"/>
            </div> 
            <button className="primary" type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </> );
}
 
export default Login;