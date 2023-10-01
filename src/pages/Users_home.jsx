import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { bisUrl } from '../context/biseUrl';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser,faHome,faStapler ,faBuilding,faUsers,faBox,faStore,faBus,faClipboard,faUsersCog,faMoneyBill, faDriversLicense, faBusAlt, faBusSimple, faCarBurst, faCarAlt, faCarSide, faCarOn, faListCheck} from '@fortawesome/free-solid-svg-icons';
import { check_permissions } from '../context/permissions';

function Users_home() {
  return (
    <div className='row g-1'>
    <div className="row g-2">

      {
        check_permissions("places.view_provinec") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
        <Link to={"provinec"} style={{textDecoration:"none"}} className='text-dark fs-5'>
        <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
          <div>
            <p><FontAwesomeIcon style={{fontSize:"44px"}} icon={faUsers} /></p>
            <p>المستخدمين</p>
          </div>
          {/* <p className='mt-1 fs-1'>{data.vehicles}</p> */}
        </div>
        </Link>
      </div>
      }
      

      {
        check_permissions("places.view_directorate") && <div className='col-12 col-lg-4 col-md-4 col-sm-12'>
        <Link  to={'directorate'} style={{textDecoration:"none"}} className='text-dark fs-5'>
        <div className='text-light p-3 rounded text-center' style={{backgroundColor:"#212121", display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignItems:"center"}} >
          <div>
            <p><FontAwesomeIcon style={{fontSize:"44px"}} icon={faListCheck} />  </p>
            <p>مجموعة الصلاحيات</p>
          </div>
          {/* <p className=' mt-1 fs-1'>{data.drivers}</p> */}
        </div>
        </Link>
      </div>

      }

    </div>
    
  </div>
  )
}

export default Users_home