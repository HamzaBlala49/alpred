import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStore,faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { financeSchema, officeSchema, storeSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import CustomTextarea from '../components/CustomTextarea';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import CustomSelect from '../components/CustomSelect';


function Finance_Add() {
  const [isSave, setIsSave] = useState(false);
  const navigate = useNavigate();
  const [office,setOffice] = useState([]);
  const [expulsions,setExpulsions] = useState([]);

  const [officeId,setOfficeId] = useState(null);
  const [expulsionId,setExpulsionId] = useState(null);


  const authHeader = useAuthHeader()
  let isauth = useIsAuthenticated()

  const config = {
    headers: { 'Authorization': authHeader() }
  };

  useEffect(()=>{

    if(isauth()){

      

      axios.get(`${bisUrl}/office/office/`,config).then(res=>{
        setOffice(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })


      axios.get(`${bisUrl}/office/expulsions/`,config).then(res=>{
        setExpulsions(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })

    }
  
},[])

  useEffect(()=>{
    setOfficeId(office[0]?.id)
  },[office]);




let handelSubmit = (values,action)=>{
  if(isauth()){
    setIsSave(true);
    
    axios.post(`${bisUrl}/office/finamcefunds/`,{...values,office:officeId,expulsion:expulsionId},config).then(()=>{
        action.resetForm();
        setIsSave(false);
        navigate("/finance")
    }).catch((e)=>{
      setIsSave(false);
      console.log(e)
      alert("حدث خطأ أثناء عملية الأضافة")
    })

  }

}


  return (
    <div className='p-2 container-fluid'>

    <h6 className='text-dark'><FontAwesomeIcon icon={faMoneyBill} /> إضافة مالية </h6>

    <Formik 
      initialValues={{
        price:"",
        nots:"",
        type_account:1,
        type_currency:1
      }}
      validationSchema={financeSchema}
      onSubmit={(values, action)=>handelSubmit(values,action)}
    >
      {(props) => (
        <Form>
          <CustomInput
            label={"السعر:"}
            name="price"
            type="number"
          />

          <CustomTextarea
              label={"الملاحظة:"}
              name="nots"
              placeholder="ملاحظة..."
          />

          

          <div className="mb-3">
            <label className="form-label fs-6">المكتب :</label>
            <select onChange={(e)=> setOfficeId(+e.target.value)}  value={officeId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {office.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>

          <div className="mb-3">
            <label className="form-label fs-6">الطرد :</label>
            <select onChange={(e)=> setExpulsionId(+e.target.value)}  value={expulsionId} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  <option value={null}>لايوجد</option>
                  {expulsions.map(el=>{
                    return <option key={el.id} value={el.id}>{el.id}</option>
                  })}
              </select>
          </div>

          <CustomSelect
            name="type_currency"
            label={"نوع العملة"}
          >
            <option value="1">ريال يمني عملة عدن</option>
            <option value="2">ريال سعودي</option>
            <option value="3">دولار</option>
            <option value="4">ريال يمني عملة صنعاء</option>
          </CustomSelect>

          <CustomSelect
            name="type_account"
            label={"نوع الحساب"}
          >
            <option value="1">إراد</option>
            <option value="2">مصروفات</option>
            <option value="3">مشتريات</option>
            <option value="4">مبيعات</option>
            <option value="5">رأس مال</option>
          </CustomSelect>


         
      


          <Link role='button' to={"/finance"} className="btn  ms-2 btn-sm">رجوع</Link>
          |
          <button type="submit" disabled={false} className="btn btn-dark btn-sm me-2">حفظ</button>
        </Form>
      )}
    </Formik>
  
  </div>
  )
}

export default Finance_Add