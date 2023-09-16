import React, { useState ,useEffect} from 'react'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd ,faTrashCan, faPenToSquare,faStore ,faBuilding, faCarSide, faDriversLicense, faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import { bisUrl } from '../context/biseUrl';
import Confirm from '../components/Confirm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { check_permissions } from '../context/permissions';
import BtnLoader from '../components/BtnLoader';

function Drivers() {
    const [data, setData] = useState([]);
    let [isLoad, setIsLoad] = useState(false);
    let [element,setElement] = useState(null);
    let [searchValue,setSearchValue] = useState("")
    let [selectValue,setSelectValue] = useState("old");

    const authHeader = useAuthHeader()
    const config = {
    headers: { 'Authorization': authHeader() }
    };
    let isauth = useIsAuthenticated();


    useEffect(() => {
        setIsLoad(true)
        if(isauth()){
          axios.get(`${bisUrl}/vehicle/driver/`,config).then(res=>{
            setData(res.data.reverse());
            setIsLoad(false)
    
          }).catch(e=>{
            console.error(e)
    
          alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
          })
    
        }
    
      },[])


      // useEffect(() => {
      //   setIsLoad(true)
      //   if(isauth()){
      //     axios.get(`${bisUrl}/vehicle/driver/`,config).then(res=>{
      //       setData(res.data);
      //       setIsLoad(false)
    
      //     }).catch(e=>{
      //       console.error(e)
    
      //     alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      //     })
    
      //   }
    
      // },[])
      
    
      let handelElement = (el)=>{
        setElement(el)
      }
    
      let handelDelete = (el)=>{
    
        if(isauth()){
    
          axios.delete(`${bisUrl}/vehicle/types_vehicle/${el.id}`,config).then(()=>{
            let _data= data;
            const index = _data.indexOf(el);
            _data.splice(index,1);
            setData([..._data]);
    
          }).catch(e=>{
            console.error(e)
            alert("هناك خطأ حدث أثناء الخذف!!")
          })
    
        }
    
      }
    
      let handelChangeSearchValue = (e)=>{
          setSearchValue(e.target.value);
      }
    


  return (
    <div className='p-2'>

    <h6 className='text-dark'><FontAwesomeIcon icon={faDriversLicense} /> إدارة السائقين </h6>

    <div className='row g-1 mt-3'>

      <div className='col-12 col-lg-1 col-md-3 col-sm-12'>
      <Link to={'/transportation_home'} className="btn btn-outline-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">رجوع</Link>
      </div>

      {
          check_permissions("vehicle.add_driver") ?  <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
          <Link to={'add'} className="btn btn-dark btn-sm w-100" style={{fontSize:'14px'}} role="button" >إضافة سائق<FontAwesomeIcon icon={faAdd} /></Link>
          </div> : <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
          <Link className="btn btn-secondary btn-sm w-100" style={{fontSize:'14px',cursor:"not-allowed"}} role="button">إضافة سائق <FontAwesomeIcon icon={faAdd} /></Link>
          </div>
      }

      <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
        
      <input 
        onChange={(e)=>  handelChangeSearchValue(e)} 
        type="text" 
        className="form-control  form-control-sm outline-none"
        style={{fontSize:'14px'}}
        placeholder='البحث بأسم او رقم الهوية'/>
      </div>




    </div>

    {isLoad ?
    <Loader/>
       : 
      <div className="table-responsive mt-4" style={{fontSize:"16px"}}>
      <table className="table table-striped">
        <thead>
            <tr>
              <th scope="col">الرقم</th>
              <th scope="col">الأسم</th>
              <th scope="col">رقم الهوية</th>
              <th scope="col">نوع الهوية</th>
              <th scope="col">تاريخ الميلاد</th>
              <th scope="col">رقم الجوال 1</th>
              <th scope="col">رقم الجوال 2</th>
              <th scope="col">الحالة</th>
              <th scope="col">تاريخ الانشاء</th>
              <th scope="col" className='text-primary'>تفاصيل أكثر</th>
              <th scope="col" className='text-success'>تعديل</th>
              <th scope="col" className='text-danger'>حذف</th>

            </tr>
        </thead>
        <tbody>
          { data.map((el,index)=>{

            return el.name.startsWith(searchValue) || el.ind.toString().startsWith(searchValue) ? <tr key={index}>
            <th scope="row">{data.length - index}</th>
            <td>{el.name}</td>
            <td>{el.ind}</td>
            <td>{el.name_Status_Ind}</td>
            <td>{el.b_day}</td>
            <td>{el.phone_1 || "لايوجد"}</td>
            <td>{el.phone_2 || "لايوجد"}</td>
            <td>{el.status_available == 2 ? <span className='text-primary'>متوفر</span> : <span className='text-danger'>غير متوفر</span>}</td>
            <td>{el.create_at.slice(0,10)}</td>
            <td> <Link  to={`driverDetiles/${el.id}`} role='button'><FontAwesomeIcon className='text-primary' icon={faInfoCircle} /></Link></td>

            {
                check_permissions("vehicle.change_driver")?  <td> <Link  to={`${el.id}`} role='button'><FontAwesomeIcon className='text-success' icon={faPenToSquare} /></Link></td>: <td> <Link  style={{cursor:"not-allowed"}} role='button'><FontAwesomeIcon className='text-secondary' icon={faPenToSquare} /></Link></td>
            }
            {

              check_permissions("vehicle.delete_driver") ? <td> <a role='button'  data-bs-toggle="modal"   onClick={()=> handelElement(el)}  data-bs-target={"#ModalD"}><FontAwesomeIcon className='text-danger'  icon={faTrashCan} /></a></td> : <td> <a role='button'  style={{cursor:"not-allowed"}} ><FontAwesomeIcon className='text-secondary'  icon={faTrashCan} /></a></td>

            }

          </tr>
          :
          null

          })}

        </tbody>
      </table>  
      </div>
      }

    {!isLoad && <Confirm header={"حذف"} massage={"هل تريد حذف السائق؟ "} handelDelete={handelDelete} element={element} color={"danger"} icon={faTrashCan} textBtn={"حذف"}  />}



  </div>
  )
}

export default Drivers