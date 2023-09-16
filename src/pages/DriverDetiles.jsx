import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDriversLicense, faStore} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { driverSchema, officeSchema, storeSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';

function DriverDetiles() {
    const navigate = useNavigate();
    const [isSave, setIsSave] = useState(false);
    let {Id} = useParams()
    const [element,setElement]=useState([]);
    let isauth = useIsAuthenticated()
    const authHeader = useAuthHeader()

    const config = {
        headers: { 'Authorization': authHeader() }
    };

    useEffect(()=>{

        if(isauth()){
    
          axios.get(`${bisUrl}/vehicle/driver/${Id}`,config).then(res=>{
            setElement(res.data);
          }).catch(e=>{
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
          })

    
        }
      
    },[])


  return (
    <div className='p-2 mt-3'>
    <h6 className='text-dark'><FontAwesomeIcon icon={faDriversLicense} /> تفاصيل السائق </h6>
    <div className='mt-5'>
       <ul class="nav nav-tabs" id="myTab" role="tablist">
           <li class="nav-item" role="presentation">
               <button class="nav-link text-dark active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">معلومات شخصية</button>
           </li>
          
   </ul>
   <div class="tab-content m-3" id="myTabContent">

       <div class="tab-pane fade bg-white show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
           <div className='info'>
               <div className='row p-3'>
               <div className='body-info col-12' >

                   <p><b>الأسم: </b>{element?.name}</p>
                   <p><b> رقم الهوية: </b>{element?.ind}</p>
                   <p><b>  نوع الهوية: </b>{element?.name_Status_Ind}</p>
                   <p><b> تاريخ الميلاد : </b>{element?.b_day}</p>
                   <p><b> رقم الهاتف 1 : </b>{element?.phone_1}</p>
                   <p><b> رقم الهاتف 2 : </b>{element?.phone_2}</p>
                   <p><b> الحالة: </b>{element?.status_available == 2 ? "متوفر" : "غير متوفر"}</p>
               </div>
               <div className='col-12'>
                    <p><b>البطاقة الشخصية:</b></p>
                   {element?.docm_url ? <img src={element?.docm_url} className='shadow-sm'style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} /> : <img src={""} className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} /> }

               </div>

               <div className='col-12 pt-1'>
                    <p><b>الليسن:</b></p>

                    {element?.docm_1_url ? <img src={element?.docm_1_url} className='shadow-sm'style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} /> : <img src={""} className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} /> }

                </div>
               </div>
           </div>
       </div>


   </div>
    </div>

    <Link role='button' to={"/transportation_home/drivers"} className="btn btn-dark  ms-2">رجوع</Link>

    </div>
  )
}

export default DriverDetiles