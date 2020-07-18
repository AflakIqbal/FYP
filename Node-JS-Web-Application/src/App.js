import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

//Common
import Alert from './component/layout/Alert';
import setAuthToken from './utils/setAuthToken';

// Start page
import Navbar from './component/layout/navebar';
import Landing from './component/layout/landing';

//Sub Admin Routes
import SubAdminRegister from './component/Sub-Admin/auth/Register';
import SubAdminLogin from './component/Sub-Admin/auth/Login';

import { loadSubAdmin } from './actions/Sub-Admin/auth';
import SubAdminDashboard from './component/Sub-Admin/dashboard/Dashboard';
import SubAdminPrivateRoute from './component/Sub-Admin/routing/PrivateRoute';
import SubAdminOwners from './component/Sub-Admin/Owner/Owners';
import SubAdminCustomers from './component/Sub-Admin/Customer/Customer';
import SubAdminVehicle from './component/Sub-Admin/Vehicle/Vehicle';
import SubAdminReport from './component/Sub-Admin/Reports/Report';
import SubAdminBooking from './component/Sub-Admin/Owner/Bookings';
import SubAdminOwnerById from './component/Sub-Admin/Owner/OwnerById';
import SubAdminCustomerById from './component/Sub-Admin/Customer/CustomerById';
import SubAdminVehicleById from './component/Sub-Admin/Vehicle/VehicleById';

//Admin
import AdminLogin from './component/Admin/auth/Login';
import { loadAdmin } from './actions/Admin/auth';
import AdminDashboard from './component/Admin/dashboard/Dashboard';
import AdminPrivateRoute from './component/Admin/routing/PrivateRoute';
import AdminOwners from './component/Admin/Owner/Owners';
import AdminCustomers from './component/Admin/Customer/Customer';
import AdminVehicle from './component/Admin/Vehicle/Vehicle';
import AdminReport from './component/Admin/Reports/Report';
import AdminBooking from './component/Admin/Owner/Bookings';
import AdminOwnerById from './component/Admin/Owner/OwnerById';
import AdminCustomerById from './component/Admin/Customer/CustomerById';
import AdminVehicleById from './component/Admin/Vehicle/VehicleById';
import SubAdmin from './component/Admin/SubAdmin/SubAdmin';
import SubAdminById from './component/Admin/SubAdmin/SubAdminById';
import { connect } from 'react-redux';

//redux

import { Provider } from 'react-redux';
import store from './store';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // const userType = localStorage.getItem('userType');
    // if (userType === 1) {
    //   store.dispatch(loadSubAdmin());
    // } else if (userType === 0) {
    store.dispatch(loadAdmin());
    // }
  }, []);

  // const App = ({ auth: { userType } }) => {
  //   useEffect(() => {
  //     if (userType === 1) {
  //       store.dispatch(loadSubAdmin());
  //     } else {
  //       store.dispatch(loadAdmin());
  //     }
  //   }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/*    Landing Page    */}
          <Navbar />
          <Route exact path='/' component={Landing} />

          <section className='container'>
            <Switch>
              {/*    Sub-Admin Routes    */}

              <Route
                exact
                path='/SubAdminRegister'
                component={SubAdminRegister}
              />

              <Route exact path='/SubAdminLogin' component={SubAdminLogin} />
              <Route exact path='/SubAdmin/Owners' component={SubAdminOwners} />
              <Route
                exact
                path='/SubAdmin/Customer'
                component={SubAdminCustomers}
              />
              <Route
                exact
                path='/SubAdmin/Vehicle'
                component={SubAdminVehicle}
              />
              <Route
                exact
                path='/SubAdmin/Reports'
                component={SubAdminReport}
              />
              <Route
                exact
                path='/SubAdmin/OwnerById/:id'
                component={SubAdminOwnerById}
              />
              <Route
                exact
                path='/SubAdmin/CustomerById/:id'
                component={SubAdminCustomerById}
              />
              <Route
                exact
                path='/SubAdmin/VehicleById/:id'
                component={SubAdminVehicleById}
              />
              <Route
                exact
                path='/SubAdmin/Bookings/:id'
                component={SubAdminBooking}
              />
              <SubAdminPrivateRoute
                exact
                path='/SubAdminDashboard'
                component={SubAdminDashboard}
              />

              {/*        Admin Routes    */}

              <Route exact path='/AdminLogin' component={AdminLogin} />
              <Route exact path='/AdminOwners' component={AdminOwners} />

              <Route exact path='/AdminCustomer' component={AdminCustomers} />
              <Route exact path='/Admin/SubAdmin' component={SubAdmin} />
              <Route exact path='/AdminVehicle' component={AdminVehicle} />
              <Route exact path='/AdminReports' component={AdminReport} />
              <Route
                exact
                path='/Admin/OwnerById/:id'
                component={AdminOwnerById}
              />
              <Route
                exact
                path='/Admin/SubAdminById/:id'
                component={SubAdminById}
              />
              <Route
                exact
                path='/Admin/CustomerById/:id'
                component={AdminCustomerById}
              />
              <Route
                exact
                path='/Admin/VehicleById/:id'
                component={AdminVehicleById}
              />
              <Route
                exact
                path='/Admin/Bookings/:id'
                component={AdminBooking}
              />
              <AdminPrivateRoute
                exact
                path='/AdminDashboard'
                component={AdminDashboard}
              />
            </Switch>
            <Alert />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import Navbar from './core/Navbar';
// import SignUpSubadmin from './auth/SignUpSubadmin';
// import SignInSubadmin from './auth/SignInSubadmin';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <Switch>
//         <Route path={'/SignupSadmin'} component={SignUpSubadmin} />
//         <Route path={'/SignInSubadmin'} component={SignInSubadmin} />
//       </Switch>
//     </Router>
//   );
// }

export default App;
