import React, { useState, useEffect } from 'react';
import JwtDecode from 'jwt-decode';
import UserApi from '../Services/UserApi';

const Account = (props) => {

  const token = window.localStorage.getItem("authToken");
  const email = JwtDecode(token);

  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
      const data = await UserApi.getUser(email.username)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
     fetchUser();
  }, [])

  return ( <>
    <h1>Profile</h1>
    <p>{user.email}</p>
    <p>{user.firstName}</p>
    <p>sells</p>
  </> );
}
 
export default Account;