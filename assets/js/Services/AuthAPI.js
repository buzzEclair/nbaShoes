import Axios from "axios";
import JwtDecode from "jwt-decode";

function logout() {
  window.localStorage.removeItem("authToken");
  delete Axios.defaults.headers["Authorization"];
}


function isAuthenticated(){
  const token = window.localStorage.getItem("authToken");

  // 2. Si le token est encore valide
  if (token) {
    const { exp: expiration } = JwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      return true;
    }else{
      return false;
    }
  }
  return false;
}

function isAdmin(){
  const token =window.localStorage.getItem("authToken");
  if (token) {
    const { exp: expiration } = JwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      const decode = JwtDecode(token)
      if(decode.roles.includes("ROLE_ADMIN")){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  return false;
}

export default {
  logout,
  isAuthenticated,
  isAdmin
}