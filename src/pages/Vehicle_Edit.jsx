import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCar, faCarSide, faStore} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Formik ,Form} from 'formik';
import { officeSchema, storeSchema, typeVehicleSchema, vehicleSchema } from '../schemas';
import CustomInput from '../components/CustomInput';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import axios from 'axios';

function Vehicle_Edit() {
    const navigate = useNavigate();
    let {Id} = useParams();
    const [isSave, setIsSave] = useState(false);
    const [element,setElement]=useState([]);
    const [drivers,setDrivers] = useState([]);
    const [driversId,setDriversId] = useState("");

    const [typeVehicle,setTypeVehicle] = useState([]);
    const [typeVehicleId,setTypeVehicleId] = useState("");
    const [model,setModel] = useState("");

    const [name,setName] = useState("");
    const [color,setColor] = useState("");
    const [car_number,setCar_number] = useState("");

    const authHeader = useAuthHeader();
    let isauth = useIsAuthenticated();

    const config = {
        headers: { 'Authorization': authHeader() }
    };
    
    useEffect(()=>{

        if(isauth()){

            axios.get(`${bisUrl}/vehicle/vehicle/${Id}`,config).then(res=>{
                setElement(res.data);
              }).catch(e=>{
                alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
              })
  
          axios.get(`${bisUrl}/vehicle/types_vehicle/`,config).then(res=>{
            setTypeVehicle(res.data);
          }).catch(e=>{
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
          })

          axios.get(`${bisUrl}/vehicle/driver/`,config).then(res=>{
            setDrivers(res.data);
          }).catch(e=>{
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
          })
  
        }

    
    },[])

    useEffect(()=>{
        setName(element?.name);
        setColor(element?.color);
        setDriversId(element?.driver);
        setTypeVehicleId(element?.types_vehicle);
        setModel(element?.model);
        setCar_number(element?.car_number);
    },[element]);


    
    useEffect(()=>{
        setDriversId(drivers[0]?.id)
    },[drivers]);

    useEffect(()=>{
        setTypeVehicleId(typeVehicle[0]?.id)
    },[typeVehicle]);


  let handelSubmit = (values,action)=>{
    if(isauth()){
      setIsSave(true)

      axios.put(`${bisUrl}/vehicle/vehicle/${Id}/`,{...values,model,"driver":driversId,"types_vehicle":typeVehicleId},config).then(()=>{
          setIsSave(false);
          action.resetForm();
          navigate('/transportation_home/vehicle')
    
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

    {/* {phoneVal && <div class="alert alert-danger"><b> رقم الهاتف المدحل غير صالح</b></div>} */}

    <h6 className='text-dark'><FontAwesomeIcon icon={faCar} /> تعديل مركبة </h6>

    <Formik 
      enableReinitialize={true}
      initialValues={{
        name:name||"",
        color:color||"",
        car_number:car_number||"",
      }}
      validationSchema={vehicleSchema}
      onSubmit={(values, action)=>handelSubmit(values,action)}
    >
      {(props) => (
        <Form>

            <CustomInput
            label={" الأسم :"}
            name="name"
            type="text"
            placeholder="الأسم..."
            />

            <CustomInput
            label={" اللون:"}
            name="color"
            type="text"
            placeholder="اللون..."
            />

            <CustomInput
            label={" رقم اللوحة السيارة:"}
            name="car_number"
            type="text"
            />

        <div className="mb-3">
            <label className="form-label fs-6"> الموديل:</label>
            <input type="date" value={model} onChange={(e)=>setModel(e.target.value)} style={{fontSize:'14px',width:'300px'}} className="form-control mt-s form-control-sm outline-none" />
        </div>

        <div className="mb-3">
                <label className="form-label fs-6"> نوع المركبة:</label>
                <select onChange={(e)=> setTypeVehicleId(+e.target.value)}  value={typeVehicleId} className="form-select form-select-sm"
                    style={{fontSize:'14px',width:'300px' }} 
                    id="floatingSelectGrid">
                    {typeVehicle.map(el=>{
                        return <option key={el.id} value={el.id}>{el.name}</option>
                    })}
                </select>
        </div>

        <div className="mb-3">
                <label className="form-label fs-6"> السائق:</label>
                <select onChange={(e)=> setDriversId(+e.target.value)}  value={driversId} className="form-select form-select-sm"
                    style={{fontSize:'14px',width:'300px' }} 
                    id="floatingSelectGrid">
                    {drivers.map(el=>{
                        return <option key={el.id} value={el.id}>{el.name}</option>
                    })}
                </select>
        </div>


      

          <Link role='button' to={"/transportation_home/vehicle"} className="btn  ms-2 btn-sm">رجوع</Link>
          |
          <button type="submit" disabled={isSave} className="btn btn-dark btn-sm me-2">حفظ</button>
        </Form>
      )}
    </Formik>
  
  </div>
  )
}

export default Vehicle_Edit