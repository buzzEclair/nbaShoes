import React from 'react';
import NavSide from '../Components/NavSIde';

const Dashboard = (props) => {
  return ( <>
    <div className="container-admin">
      <NavSide></NavSide>
      <div className="content-view">
        <h2>Dashboard</h2>
        <div className="admin-block message"></div>
        <div className="admin-block">
          <h4>Latest Sells</h4>
          <table>
            <thead>
              <tr>
                <th>Sell Date</th>
                <th>Amount</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>20120-20-15</td>
                <td>100 €</td>
                <td><ion-icon name="arrow-forward-circle"></ion-icon></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </> );
}
 
export default Dashboard;