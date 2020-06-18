import React, { useEffect, useState } from 'react';
import NavSide from '../Components/NavSIde';
import Axios from 'axios';
import ImgShopThumb from '../Components/ImgShopThumb';

const Collection = ({history, match}) => {

  const id = match.params.id;
  const [data, setData] = useState({
    title: "",
    productList: [
      
    ]
  });
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(true);

  const fetchData = async id => {
    try{
      if(editing){
        const { title, productList} = await Axios.get('http://127.0.0.1:8000/api/collections/' + id).then(response => response.data);
        setData({ title, productList});
      }
    }catch(error){
      console.log(error);
    }
  }

  const fetchItem = async () => {
    try{
      await Axios.get('http://127.0.0.1:8000/api/products/').then(response => setProducts(response.data['hydra:member']))
    }catch(error){
      console.log(error)
    }
  }

  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
   
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    
    try{
      if(!editing){
        await Axios.post('http://127.0.0.1:8000/api/collections', data)
        history.replace('/dashboard/collections')
      }else{
        await Axios.put('http://127.0.0.1:8000/api/collections/'+ id, data)
        history.replace('/dashboard/collections')
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

  const handleChose = (event, id) => {
    const array = data.productList;
    let base = false;
    for (let i = 0; i < data.productList.length; i++) {
      if(data.productList[i] === id){
        data.productList.splice(i, 1);
        base = true;
      }
    }
    if(!base){
      array.push(id);
      event.target.style.outline =  '3px solid red';
      setData({...data, productList : array});
    }else{
      event.target.style.outline =  'none';
      setData({...data, productList : array});

    }
  }

  console.log(data)

  useEffect(() => {
    if(id === "new"){
      setEditing(false)
    }else{
      fetchData(id);

    }
    fetchItem();
  }, []);

  return ( <>
   <div className="container-admin">
      <NavSide></NavSide>
      <div className="content-view">
        <h2>Collection {id} / {data.title}</h2>
        <div className="admin-block">
          <form onSubmit={handleSubmit}>
            <div className="form-grp">
              <label>Title</label>
              <input value={data.title} name="title" onChange={handleChange} id="title" type="text" placeholder="Title"/>
            </div> 
            <div className="form-grp form-grp-img">
             <label>Chose Product of collection</label>
             <div>
              {
                products.map(item => 
                  <ImgShopThumb key={item.id} id={item.pictures[0]} customClickEvent={() => {handleChose(event, item.id); }} ></ImgShopThumb>
                )
              }
             </div>
            </div>  
            <button className="primary" type="submit">Validate</button>
          </form>
        </div>
      </div>
    </div>
  </> );
}
 
export default Collection;