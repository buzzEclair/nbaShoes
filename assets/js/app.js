import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import '../scss/app.scss';
import '../scss/Form.scss';
import '../scss/Button.scss';
import Home from './Pages/Home';
import '../scss/Breackpoint.scss';
import Login from './Pages/Login';
import NavBar from './Components/NavBar';
import AuthContext from './Contexts/AuthContext';
import AuthAPI from './Services/AuthAPI';
import Account from './Pages/Account';
import Shop from './Pages/Shop';
import Item from './Pages/Item';
import Basket from './Pages/Basket';
import basketContext from './Contexts/basketContext';
import PrivateRoute from './Components/PrivateRoute';
import AdminContext from './Contexts/AdminContext';
import PrivateRouteAdmin from './Components/PrivateRouteAdmin';
import Dashboard from './Admin/Pages/Dashboard';
import Products from './Admin/Pages/Products';
import '../scss/admin/Dashboard.scss';
import Product from './Admin/Pages/Product';
import Stocks from './Admin/Pages/Stocks';
import Stock from './Admin/Pages/Stock';
import StockAdd from './Admin/Pages/StockAdd';
import Collections from './Admin/Pages/Collections';
import Collection from './Admin/Pages/Collection';
import Payement from './Pages/Payement';
import SearchPage from './Pages/SearchPage';


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );
  const [isAdmin, setIsAdmin] = useState(
    AuthAPI.isAdmin()
  );
  const [basket, setBasket] = useState([]);


  const NavbarWithRouter = withRouter(NavBar);

  return <>
    <basketContext.Provider value={{basket,setBasket}} >
    <AdminContext.Provider value={{isAdmin,setIsAdmin}} >
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated }}>
    
    <HashRouter>
      <NavbarWithRouter />
      <Switch>
        <PrivateRoute path="/payement" component={Payement}></PrivateRoute>
        <Route path="/login" component={Login}></Route>
        <PrivateRouteAdmin path="/dashboard/collections/:id" component={Collection} ></PrivateRouteAdmin>
        <PrivateRouteAdmin path="/dashboard/stocks/add/:id" component={StockAdd} ></PrivateRouteAdmin>
        <PrivateRouteAdmin path="/dashboard/stocks/:id" component={Stock} ></PrivateRouteAdmin>
        <PrivateRouteAdmin path="/dashboard/products/:id" component={Product} ></PrivateRouteAdmin>
        <PrivateRouteAdmin path="/dashboard/collections" component={Collections} ></PrivateRouteAdmin>
        <PrivateRouteAdmin path="/dashboard/stocks" component={Stocks} ></PrivateRouteAdmin>
        <PrivateRouteAdmin path="/dashboard/products" component={Products} ></PrivateRouteAdmin>
        <PrivateRouteAdmin path="/dashboard" component={Dashboard} ></PrivateRouteAdmin>
        <PrivateRoute path="/profil" component={Account}></PrivateRoute>
        <Route path="/search/:q" component={SearchPage}></Route>
        <Route path="/shop/:id" component={Item}></Route>
        <Route path="/shop" component={Shop}></Route>
        <Route path="/basket" component={Basket}></Route>
        <Route path="/" component={Shop}></Route>
      </Switch>
    </HashRouter>
    </AuthContext.Provider>
    </AdminContext.Provider>
    </basketContext.Provider>
  </>
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>,  rootElement);