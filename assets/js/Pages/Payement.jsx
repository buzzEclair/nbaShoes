import React, { useEffect } from 'react';
import '../../scss/Payement.scss';

const Payement = ({history}) => {

  useEffect(() => {
    setTimeout(() => 
      history.replace('/profil')
    , 6000);

  })

  return ( <>
    <div className="content-payement">
      <div className="payement">
        <div className="circle"></div>
        <p>Payement</p>
      </div>
    </div>
  </> );
}
 
export default Payement;