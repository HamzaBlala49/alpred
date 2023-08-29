import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { customerSchema} from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';
import { user_avatar } from '../assets/image';
import BtnLoader from '../components/BtnLoader';



function Customer_Edit() {
  let navigate = useNavigate()
  const [isSave, setIsSave] = useState(false);
  let {Id} = useParams()
  const [element,setElement]=useState([]);
  const  [name,setName] = useState("");
  const  [phone_1,setPhone_1] = useState("");
  const  [phone_2,setPhone_2]= useState("");
  const [place,setPlace] = useState("");
  const [number_doc,setNumber_doc] = useState("")
  const [doc_url,setDoc_url] = useState("");
  const [newImage ,setNewImage] = useState("");
  const [type_doc,setType_doc] = useState(1);
  const [city,setCity] = useState([]);
  const [photoVal,setPhotoVal] = useState(false);



  const authHeader = useAuthHeader()
  let isauth = useIsAuthenticated()
  const config = {
    headers: { 'Authorization': authHeader() }
  };

  useEffect(()=>{

    if(isauth()){

      axios.get(`${bisUrl}/office/customers/${Id}`,config).then(res=>{
        setElement(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })

      axios.get(`${bisUrl}/places/city/`,config).then(res=>{
        setCity(res.data);
      }).catch(e=>{
        alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
      })

    }
  
},[])

  useEffect(()=>{
    setName(element?.name);
    setDoc_url(element?.doc_url);
    setPhone_1(element?.phone_1);
    setPhone_2(element?.phone_2);
    setPlace(element?.place);
    setNumber_doc(element?.number_doc);
  },[element]);


let handelSubmit = (values,action)=>{
  if(isauth()){
    setIsSave(true);
    let {name , phone_1 ,phone_2 ,number_doc} = values;
    let formData =  new FormData();
    formData.append("name",name)
    formData.append("phone_1",phone_1)
    formData.append("phone_2",phone_2)
    formData.append("number_doc",+number_doc)
    formData.append("place",place)
    formData.append("type_doc",type_doc)
    
    if(newImage){
      formData.append("doc_url",newImage)
      console.log("in new")
    }

    console.log(config)

    axios.put(`${bisUrl}/office/customers/${Id}/`,formData,config).then(()=>{
        action.resetForm();
        setIsSave(false);
        navigate("/customer")
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
          console.log(e)

          alert("حدث خطأ أثناء عملية الأضافة")
        }
    })

  }


}




  return (
    <div className='p-2 container-fluid'>

    <h6 className='text-dark'><FontAwesomeIcon icon={faUsers} /> تعديل عميل </h6>

  <Formik 
      initialValues={{
        name:name || "",
        phone_2:phone_2 || "",
        phone_1:phone_1 || "",
        number_doc:number_doc || 0,
      }}
      enableReinitialize="true"
      validationSchema={customerSchema}
      onSubmit={(values, action)=>handelSubmit(values,action)}
    >
      {({isSubmitting}) => (
        <Form>
          <div className='row g-1'>
            <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomInput
                label={"الأسم:"}
                name="name"
                type="text"
                placeholder="الأسم.."
              />
            </div>
            <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomInput
                label={"رقم الهاتف 1:"}
                name="phone_1"
                type="text"
                placeholder="الأسم.."

              />
            </div>
            <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomInput
                label={" رقم الهاتف 2:"}
                name="phone_2"
                type="text"
                placeholder="الأسم.."

              />
            </div>
          <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
              <CustomInput
                label={"رقم الهوية :"}
                name="number_doc"
                type="text"
                placeholder="الأسم.."

              />
          </div>
          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label fs-6">نوع الهوية :</label>
            <select onChange={(e)=> setType_doc(+e.target.value)}  value={type_doc} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  <option value="1">بطاقة شخصية</option>
                  <option value="2">جواز سفر</option>
              </select>
          </div>

          <div className="col-12 col-lg-6 col-md-6 col-sm-12">
            <label className="form-label fs-6">المدينة :</label>
            <select onChange={(e)=> setPlace(+e.target.value)}  value={place} className="form-select form-select-sm"
                style={{fontSize:'14px',width:'300px' }} 
                id="floatingSelectGrid">
                  {city.map(el=>{
                    return <option key={el.id} value={el.id}>{el.name}</option>
                  })}
              </select>
          </div>

          <div className='col-12 col-lg-6 col-md-6 col-sm-12'>
            <label className="form-label fs-6"> صورة الهوية:</label>
            <input  accept='image/*' onChange={(e)=> setNewImage(e.target.files[0])} type="file" className="form-control mt-s form-control-sm outline-none"
            style={{fontSize:'14px',width:'300px'}}
            />

            { photoVal && <p className='text-danger' style={{fontSize:"14px"}}>هذا الحقل مطلوب</p>}
          </div>

          <div className='col-12 col-lg-6 mb-3 col-md-6 col-sm-12'>
          <label className="form-label fs-6"> </label>
          {

            newImage ? <img src={URL.createObjectURL(newImage)} className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} alt="" /> 
            :
            doc_url ?  <img src={doc_url} className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} alt="" /> :  <img src={user_avatar} className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} alt="" />

          }
          </div>

          </div>
          <Link role='button' to={"/customer"} className="btn  ms-2 btn-sm">رجوع</Link>
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

export default Customer_Edit