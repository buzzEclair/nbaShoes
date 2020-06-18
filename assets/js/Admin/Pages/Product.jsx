import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import NavSide from '../Components/NavSIde';

const Product = ({history, match}) => {

  const id = match.params.id;
  const [data, setData] = useState({
    name : "",
    price: 0,
    resume: ""
  });
  const [editing, setEditing] = useState(true);
  
  const fetchData = async id => {
    try{
      if(editing){
        const { name, price, resume} = await Axios.get('http://127.0.0.1:8000/api/products/' + id).then(response => response.data);
        setData({ name, price, resume});
      }
    }catch(error){
      console.log(error);
    }
  }

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
   
    setData({ ...data, [name]: value });
  };
  const handleChangeNumber = ({ currentTarget }) => {
    const { value, name } = currentTarget;
   
    setData({ ...data, [name]: parseInt(value) });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    
    try{
      if(!editing){
        await Axios.post('http://127.0.0.1:8000/api/products', data)
        history.replace('/dashboard/products')
      }else{
        await Axios.put('http://127.0.0.1:8000/api/products/'+ id, data)
      }
    }catch (response) {
      const { violations } = response.data;
      if(violations){
        const apiErrors = {};
        violations.map(({propertyPath, message}) => {
          apiErrors[propertyPath] = message;
        });
       console.log(apiErrors)
      }
    }
  }

  useEffect(() => {
    if(id === "new"){
      setEditing(false)
    }else{
      fetchData(id);

    }
  }, []);

  return ( <>
  
    <div className="container-admin">
      <NavSide></NavSide>
      <div className="content-view">
        <h2>Products {id} / {data.name}</h2>
        <div className="admin-block">
          <form onSubmit={handleSubmit}>
            <div className="form-grp">
              <label>Name</label>
              <input value={data.name} name="name" onChange={handleChange} id="name" type="text" placeholder="Name"/>
            </div> 
            <div className="form-grp">
              <label>Price</label>
              <input value={parseInt(data.price, 10)} name="price" onChange={handleChangeNumber} id="price" type="number" placeholder="Price"/>
            </div> 
            <div className="form-grp">
              <label>Resume</label>
              <textarea value={data.resume} name="price" onChange={handleChange} name="resume" id="resume">{data.resume}</textarea>
            </div> 
            <button className="primary" type="submit">Validate</button>
          </form>
        </div>
      </div>
    </div>
  </> );
}
 
export default Product;