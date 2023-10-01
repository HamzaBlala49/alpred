import React from 'react'
import { BrowserRouter, Route,Link, Routes } from 'react-router-dom'
import SideNavBar from './SideNavBar';
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle"
import Home from '../pages/Home'

// Office
import Office from '../pages/Office';
import Office_Add from '../pages/Office_Add';
import Office_Edit  from '../pages/Office_Edit';

// Customer 
import Customer from '../pages/Customer';
import Customer_Add from '../pages/Customer_Add';
import Customer_Edit from '../pages/Customer_Edit';

// Expulsion 
import Expulsion from '../pages/Expulsion';
import Expulsion_Add from '../pages/Expulsion_Add';
import Expulsion_Edit from '../pages/Expulsion_Edit';
import Expulsion_Add2 from '../pages/Expulsion_Add2';

// Trip
import Trip from '../pages/Trip';
import Trip_Add from '../pages/Trip_Add';
import Trip_Edit from '../pages/Trip_Edit';

// Store
import Store from '../pages/Store';
import Store_Add from '../pages/Store_Add';
import Store_Edit from '../pages/Store_Edit';

// Records
import Records from '../pages/Records';
import Records_Add from '../pages/Records';
import Records_Edit from '../pages/Records';

// vehicles
import Home_vehicle from '../pages/home_vehicle';


import LogIn from '../pages/LogIn';
import { RequireAuth, useIsAuthenticated } from 'react-auth-kit';
import Finance from '../pages/Finance';
import Finance_Add from '../pages/Finance_Add';
import Finance_Edit from '../pages/Finance_Edit';
import Office_home from '../pages/Office_home';
import CustomerDetiles from '../pages/CustomerDetiles';
import Print_1 from '../pages/Print_1';
import Print__2 from '../pages/Print__2';
import P404 from '../pages/P404';
import TypeVehicle from '../pages/TypeVehicle';
import TypeVehicle_add from '../pages/TypeVehicle_add';
import TypeVehicle_Edit from '../pages/TypeVehicle_Edit';
import Drivers from '../pages/Drivers';
import Drivers_Add from '../pages/Drivers_Add';
import Drivers_Edit from '../pages/Drivers_Edit';
import DriverDetiles from '../pages/DriverDetiles';
import Vehicle from '../pages/Vehicle';
import Vehicle_Add from '../pages/Vehicle_Add';
import Vehicle_Edit from '../pages/Vehicle_Edit';
import Print_3 from '../pages/Print_3';
import Location_home from '../pages/Location_home';
import Provinces from '../pages/Provinces';
import Provinces_Add from '../pages/Provinces_Add';
import Provinces_Edit from '../pages/Provinces_Edit';
import Directorate from '../pages/Directorate';
import Directorate_Add from '../pages/Directorate_Add';
import Directorate_Edit from '../pages/Directorate_Edit';
import City from '../pages/City';
import City_Add from '../pages/City _Add';
import City_Edit from '../pages/City_Edit';
import Change_Password from '../pages/Change_Password';
import Users_home from '../pages/Users_home';


function AllContent() {
    let isAuth = useIsAuthenticated()
  return (
    <BrowserRouter>
        <div>
            <div className='row g-0'>

                { isAuth() && 
                <div className='col-lg-2 col-md-2 d-sm-none d-none d-sm-none d-md-block  d-lg-block'>
                    <SideNavBar/>  
                </div>
                }
                <div className={ isAuth() ?'col-10 col-12 col-lg-10 col-md-10 col-sm-12':""}>
                { 
                    isAuth() && <NavBar/>
                }  
                <div className={ isAuth() ? 'bg-white m-3 p-3': 'bg-white'}>
                <Routes>
                    <Route path='/'  element={
                        <RequireAuth  loginPath='/logIn'>
                            <Home/>
                        </RequireAuth>
                    
                    }/>

                    <Route path='/office_home'  element={
                        <RequireAuth  loginPath='/logIn'>
                            <Office_home/>
                        </RequireAuth>
                    }/>
                    
                    
                    {/* Office */}
                    <Route path='/office'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Office/>
                        </RequireAuth>
                    }/>
                    <Route path='/office/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Office_Add/>
                        </RequireAuth>
                    }/>
                    <Route path='/office/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Office_Edit/>
                        </RequireAuth>
                    }/>

                    
                    {/* Customer */}
                    <Route path='/customer'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Customer/>
                        </RequireAuth>
                    }/>
                    <Route path='/customer/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Customer_Add/>
                        </RequireAuth>
                    }/>
                    <Route path='/customer/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Customer_Edit/>
                        </RequireAuth>
                    
                    }/>

                    <Route path='/customerDetiles/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <CustomerDetiles/>
                        </RequireAuth>
                    
                    }/>
                    
                    {/* Expulsion */}
                    <Route path='/expulsion'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Expulsion/>
                        </RequireAuth>
                    }/>
                    <Route path='/expulsion/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Expulsion_Add/>
                        </RequireAuth>
                    
                    }/>

                    <Route path='/expulsion/add/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Expulsion_Add2/>
                        </RequireAuth>
                    
                    }/>

                    <Route path='/expulsion/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Expulsion_Edit/>
                        </RequireAuth>
                    }/>


                    {/* Finance */}
                    <Route path='/finance'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Finance/>
                        </RequireAuth>
                    }/>
                    <Route path='/finance/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Finance_Add/>
                        </RequireAuth>
                    
                    }/>
                    <Route path='/finance/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Finance_Edit/>
                        </RequireAuth>
                    }/>

                    {/* Trip */}
                    <Route path='/trip'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Trip/>
                        </RequireAuth>
                    }/>
                    <Route path='/trip/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Trip_Add/>
                        </RequireAuth>
                    }/>
                    <Route path='/trip/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Trip_Edit/>
                        </RequireAuth>
                    }/>

                    <Route path='/trip/print/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Print_3/>
                        </RequireAuth>
                    }/>

                    {/* Store */}
                    <Route path='/store'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Store/>
                        </RequireAuth>
                    }/>
                    <Route path='/store/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Store_Add/>
                        </RequireAuth>
                    }/>
                    <Route path='/store/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Store_Edit/>
                        </RequireAuth>
                    }/>
                    
                    {/* Records */}

                    <Route path='/records'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Records/>
                        </RequireAuth>
                    }/>
                    <Route path='/records/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Records_Add/>
                        </RequireAuth>
                    }/>
                    <Route path='/records/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Records_Edit/>
                        </RequireAuth>
                    }/>

                    {/* vehicle */}
                    <Route path='/transportation_home'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Home_vehicle/>
                        </RequireAuth>
                    }/>

                    <Route path='/transportation_home/typeVehicle'  element={
                        <RequireAuth loginPath='/logIn'>
                            <TypeVehicle/>
                        </RequireAuth>
                    }/>
                    <Route path='/transportation_home/typeVehicle/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <TypeVehicle_add/>
                        </RequireAuth>
                    }/>
                    <Route path='/transportation_home/typeVehicle/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <TypeVehicle_Edit/>
                        </RequireAuth>
                    }/>

                    {/* drivers */}
                    <Route path='/transportation_home/drivers'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Drivers/>
                        </RequireAuth>
                    }/>

                    <Route path='/transportation_home/drivers/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Drivers_Add/>
                        </RequireAuth>
                    }/>

                    <Route path='/transportation_home/drivers/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Drivers_Edit/>
                        </RequireAuth>
                    }/>

                    <Route path='/transportation_home/drivers/driverDetiles/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <DriverDetiles/>
                        </RequireAuth>
                    }/>

                    {/* Vehicle */}
                    <Route path='/transportation_home/vehicle'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Vehicle/>
                        </RequireAuth>
                    }/>
                    <Route path='/transportation_home/vehicle/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Vehicle_Add/>
                        </RequireAuth>
                    }/>
                    <Route path='/transportation_home/vehicle/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Vehicle_Edit/>
                        </RequireAuth>
                    }/>


                    {/* location */}
                    <Route path='/location_home'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Location_home/>
                        </RequireAuth>
                    }/>

                    <Route path='/location_home/provinec'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Provinces/>
                        </RequireAuth>
                    }/>

                    <Route path='/location_home/provinec/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Provinces_Add/>
                        </RequireAuth>
                    }/>

                    <Route path='/location_home/provinec/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Provinces_Edit/>
                        </RequireAuth>
                    }/>


                    <Route path='/location_home/directorate'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Directorate/>
                        </RequireAuth>
                    }/>

                    <Route path='/location_home/directorate/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Directorate_Add/>
                        </RequireAuth>
                    }/>

                    <Route path='/location_home/directorate/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <Directorate_Edit/>
                        </RequireAuth>
                    }/>

                    
                    <Route path='/location_home/city'  element={
                        <RequireAuth loginPath='/logIn'>
                            <City/>
                        </RequireAuth>
                    }/>

                    <Route path='/location_home/city/add'  element={
                        <RequireAuth loginPath='/logIn'>
                            <City_Add/>
                        </RequireAuth>
                    }/>

                    <Route path='/location_home/city/:Id'  element={
                        <RequireAuth loginPath='/logIn'>
                            <City_Edit/>
                        </RequireAuth>
                    }/>

                    {/* users */}
                    <Route path='/users_home' element={
                        <RequireAuth loginPath='/logIn'>
                            <Users_home/>
                        </RequireAuth>
                    } />







                    {/* LogIn */}
                    <Route path='/logIn'  element={<LogIn/>}/>

                    {/* change password */}
                    <Route path='/change_password' element={
                        <RequireAuth loginPath='/logIn'>
                            <Change_Password/>
                        </RequireAuth>
                    } />


                    {/* 404 page */}
                    <Route path='/*' element={
                        <RequireAuth loginPath='/logIn'>
                            <P404/>
                        </RequireAuth>
                    } />

                    {/* print */}
                    <Route path='/print_1/:id' element={
                        <RequireAuth loginPath='/logIn'>
                            <Print_1/>
                        </RequireAuth>
                    } />

                    <Route path='/print__2' element={
                        <RequireAuth loginPath='/logIn'>
                            <Print__2/>
                        </RequireAuth>
                    } />


                    </Routes>
                </div>
                </div>
            </div>
        </div>
    </BrowserRouter>    
  )
}

export default AllContent