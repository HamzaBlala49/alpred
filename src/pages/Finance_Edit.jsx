import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStore,faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { financeSchema, officeSchema, storeSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import CustomTextarea from '../components/CustomTextarea';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import CustomSelect from '../components/CustomSelect';
import { date } from 'yup';


function Finance_Edit() {
  const [price,setPrice] = useState(null);
  const [nots,setNots] = useState("");
  const [type_account,SetType_account] = useState("");
  const [type_currency,setType_currency] = useState("");

  const [isSave, setIsSave] = useState(false);
  const [office,setOffice] = useState([]);
  const [expulsions,setExpulsions] = useState([]);

  const [officeId,setOfficeId] = useState(null);
  const [expulsionId,setExpulsionId] = useState(null);

  let navigate = useNavigate()
  let {Id} = useParams()
  const [element,setElement]=useState([]);

  const authHeader = useAuthHeader()
  let isauth = useIsAuthenticated()

  const config = {
    headers: { 'Authorization': authHeader() }
  };

  useEffect(()=>{

    if(isauth()){

      axios.get(`${bisUrl}/office/finamcefunds/${Id}`,config).then(res=>{
       setElement(res.data)

      }).catch(e=>{
        console.error(e)

      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })

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
    setOfficeId(element?.office);
    setExpulsionId(element?.expulsion);
    setPrice(element?.price);
    setNots(element?.nots);
    setType_currency(element?.type_currency);
    SetType_account(element?.type_account)
    setNots(element?.nots);
  },[element]);




let handelSubmit = (values,action)=>{
  if(isauth()){
    setIsSave(true);

    axios.put(`${bisUrl}/office/finamcefunds/${Id}/`,{...values,office:officeId,expulsion:expulsionId},config).then(()=>{
        action.resetForm();
        setIsSave(false);
        navigate("/finance")
    }).catch((e)=>{
        setIsSave(false);
        console.log(e)
        if(e.response.status == 400){
          let messes = '';
          for (const i in e.response.data) {
            let listError = e.response.data[i];
            listError.forEach(el => {
              messes +=` تحذير : ${el} \n` 
            })
            
          }
          alert(messes)


        }else{

          alert("حدث خطأ أثناء عملية الأضافة")
        }
    })

  }

}



  return (
    <div className='p-2 container-fluid'>

    {isSave && <div class="alert alert-success"><b>تم الحفظ بنجاح</b></div>}
    <h6 className='text-dark'><FontAwesomeIcon icon={faMoneyBill} /> تعديل مالية </h6>

    <Formik 
      initialValues={{
        price:"" || price,
        nots:"" || nots,
        type_account:type_account,
        type_currency: type_currency 
      }}
      validationSchema= {financeSchema}
      onSubmit={(values, action)=>handelSubmit(values,action)}
      enableReinitialize= {true}
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
            <option value="6">مرتبات</option>
            <option value="7">نسبة مكتب</option>
            <option value="8">نسبة وكيل</option>
            <option value="9">عمولة تأمين</option>
            <option value="10">نسبة سائق</option>
            <option value="11">إيحازات</option>
            <option value="12">كهرباء</option>
            <option value="13">سلفة</option>
            <option value="14">خصميات جزاء</option>
            <option value="15">قيمة شراء عملة</option>
            <option value="16">أجرة تحويل</option>
            <option value="17">قيمة جمارك بضاعة</option>
            <option value="18">اجراة حمالة</option>
            <option value="19">إيداع مصرفي</option>
            <option value="20">ماء</option>
            <option value="21">تليفونات</option>
            <option value="22">إنترنت</option>
            <option value="23">مشتقات نفظية</option>
          </CustomSelect>


         
      


          <Link role='button' to={"/finance"} className="btn  ms-2 btn-sm">رجوع</Link>
          |
          <button type="submit" disabled={isSave} className="btn btn-dark btn-sm me-2">حفظ</button>
        </Form>
      )}
    </Formik>
  
  </div>
  )
}

export default Finance_Edit