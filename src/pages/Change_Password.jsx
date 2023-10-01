import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCarSide, faKey, faLocation, faLocationDot, faStore} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { changePasswordSchema, directorateSchema, officeSchema, provinecSchema, storeSchema, typeVehicleSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import BtnLoader from '../components/BtnLoader';

function Change_Password() {
    const [isSave, setIsSave] = useState(false);
    const [directorate ,setdirectorate] =useState([]);
    const authHeader = useAuthHeader()
    let isauth = useIsAuthenticated()

    let [error_1,setError_1] = useState(false);
    let [error_2,setError_2] = useState(false);

    const config = {
        headers: { 'Authorization': authHeader() }
    };

    
    


  let handelSubmit = (values,action)=>{
    if(isauth()){
      setIsSave(true)
      setError_1(false)
      setError_1(false)

      axios.post(`${bisUrl}/password/change/`,values,config).then(()=>{
          setIsSave(false);
          action.resetForm();
          history.back();
    
      }).catch((e)=>{
          setIsSave(false);
          console.log(e)

//           0
// : 
// "The password is too similar to the username."
// 1
// : 
// "This password is too common."
          let x = [].includes()
          if(e.response.status == 400){
            if(e.response.data["new_password2"].includes("The password is too similar to the username.")){
              setError_1(true)
            }

            if(e.response.data["new_password2"].includes( "This password is too common.")){
              setError_2(true)
            }


          }else{

            alert("حدث خطأ أثناء عملية الأضافة")
          }

      })
    }
    
  
  }


    return (
      <div className='p-2 container-fluid'>  
      <h6 className='text-dark mb-4'><FontAwesomeIcon icon={faKey} /> تغير كلمة السر</h6>
  
      <Formik 
        initialValues={{
          // old_password:"",
          new_password1:"",
          new_password2:""
        }}
        validationSchema={changePasswordSchema}
        onSubmit={(values, action)=>handelSubmit(values,action)}
      >
        {(props) => (
          <Form>
  
            {/* <CustomInput
              label={" كلمة السر السابقة:"}
              name="old_password"
              type="text"
            /> */}

            <CustomInput
              label={"كلمة السر الجديدة:"}
              name="new_password1"
              type="password"
            />


            <CustomInput
              label={"تأكيد كلمة السر الجديدة:"}
              name="new_password2"
              type="password"
            />
            {
              error_1 && <p className='text-warning p-0 ' style={{fontSize:"14px",fontWeight:"bold"}}>*يجب أن لا تكون كلمة السر مقاربه لأسم المستخدم</p>
            }

            {
              error_2  &&  <p className='text-warning p-0 ' style={{fontSize:"14px",fontWeight:"bold"}}>*يجب أن لا تكون كلمة السر شائعة</p>
            }

  

            <Link role='button' onClick={()=>history.back()} className="btn  ms-2 btn-sm">رجوع</Link>
            |
            <button type="submit" disabled={isSave} className="btn btn-dark btn-sm me-2">
                {
                  isSave ? <BtnLoader/> : "حفظ"
                } 
            </button>
          </Form>
        )}
      </Formik>
    
    </div>
    )
}

export default Change_Password