import React from 'react'
import './SideNavBar.css'
import { logo } from "../assets/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser,faHome,faStapler ,faBuilding,faUsers,faBox,faStore,faBus,faClipboard,faUsersCog,faMoneyBill} from '@fortawesome/free-solid-svg-icons';

import { Link, NavLink } from 'react-router-dom';


function SideNavBar() {
  return (
    <div className='SideNavbar'>
      {/* <img className='bg' src={bgSN2} alt="bg" /> */}
      <div className='sideBar-content'>

      <div className=''>
        <img className='logo' src={logo} alt="logo" />
      </div>

      <ul className='links'>
        <li>
          <NavLink to={"/"}><FontAwesomeIcon icon={faHome} /> الرئيسية</NavLink>
        </li>
        <li>
          <NavLink to={'/office_home'}><FontAwesomeIcon icon={faBuilding} /> إدارة المكاتب</NavLink>
        </li>
        <li>
          <NavLink to={"/transportation_home"}><FontAwesomeIcon icon={faBus} /> إدارة النقل</NavLink>
        </li>
        <li>
          <NavLink to={"/location_home"} ><FontAwesomeIcon icon={faBox} /> إدارة الأماكن</NavLink>
        </li>
        <li>
          <NavLink to={"/users_home"}><FontAwesomeIcon icon={faUsersCog} /> إدارة المستخدمين</NavLink>
        </li>

      </ul>
      </div>
    </div>
  )
}

export default SideNavBar