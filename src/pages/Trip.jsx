import React, { useState ,useEffect} from 'react'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd ,faTrashCan, faPenToSquare,faStore ,faBuilding, faBus, faPrint} from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import { bisUrl } from '../context/biseUrl';
import Confirm from '../components/Confirm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { check_permissions } from '../context/permissions';

function Trip() {
  const [data, setData] = useState([]);
  let [isLoad, setIsLoad] = useState(false);
  let [element,setElement] = useState(null);
  let [searchValue,setSearchValue] = useState("");
  let [drivers,setDrivers] = useState([]);
  let [driver_name,setDriver_name] = useState("");

  let [offices,setOffices]=useState([]);
  let [office_name,setOffice_name]=useState("");

  const authHeader = useAuthHeader()
  const config = {
    headers: { 'Authorization': authHeader() }
  };
  let isauth = useIsAuthenticated();

  useEffect(() => {
    setIsLoad(true)
    if(isauth()){
      axios.get(`${bisUrl}/office/trips/`,config).then(res=>{
        setData(res.data.reverse());
        setIsLoad(false)

      }).catch(e=>{
        console.error(e)

      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })

      axios.get(`${bisUrl}/office/office/`,config).then(res=>{
        setOffices(res.data.reverse())

      }).catch(e=>{
        console.error(e)

      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })

      axios.get(`${bisUrl}/vehicle/driver/`,config).then(res=>{
        setDrivers(res.data.reverse());

      }).catch(e=>{
        console.error(e)

      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })

    }

  },[]);


  let handelElement = (el)=>{
    setElement(el)
  }


  let handelDelete = (el)=>{

    if(isauth()){

      axios.delete(`${bisUrl}/office/trips/${el.id}`,config).then(()=>{
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

  let handelChangeSelect = (e)=>{
    setSelectValue(e.target.value)
  }




  return (
    <div className='p-2'>

    <h6 className='text-dark'><FontAwesomeIcon icon={faBus} /> إدارة الرحلات </h6>

    <div className='row g-1 mt-3'>

      <div className='col-12 col-lg-1 col-md-3 col-sm-12'>
      <Link to={'/office_home'} className="btn btn-outline-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">رجوع</Link>
      </div>

      {
          check_permissions("office.add_trip") ?  <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
          <Link to={'add'} className="btn btn-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">إضافة رحلة <FontAwesomeIcon icon={faAdd} /></Link>
          </div> : <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
          <Link className="btn btn-secondary btn-sm w-100" style={{fontSize:'14px',cursor:"not-allowed"}} role="button">إضافة رحلة <FontAwesomeIcon icon={faAdd} /></Link>
          </div>
      }

      <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
        
      <input 
        onChange={(e)=>  handelChangeSearchValue(e)} 
        type="text" 
        className="form-control  form-control-sm outline-none"
        style={{fontSize:'14px'}}
        placeholder='بحث بأسم الرحلة'/>
      </div>


      
      <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> setOffice_name(e.target.value)} value={office_name} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="">كل الى مكتب</option>
            {
              offices.map((el)=><option value={el.name}>{el.name}</option>)
            }
        </select>
      </div>

      <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> setDriver_name(e.target.value)} value={driver_name} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="">كل السائقين</option>
            {
              drivers.map((el)=><option value={el.name}>{el.name}</option>)
            }
        </select>
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
              <th scope="col">أسم السائق</th>
              <th scope="col">رقم السائق 1</th>
              <th scope="col">رقم السائق 2</th>
              <th scope="col">من مكتب</th>
              <th scope="col">الئ مكتب</th>
              <th scope="col">المركبة</th>
              <th scope="col">تاريخ الانشاء</th>
              <th scope="col" className='text-warning'>طباعة و ترحيل</th>
              <th scope="col" className='text-success'>تعديل</th>
              <th scope="col" className='text-danger'>حذف</th>

            </tr>
        </thead>
        <tbody>
          { data.map((el,index)=>{

            return el.name.startsWith(searchValue) && el.name_to_office.startsWith(office_name) && el.name_drive.startsWith(driver_name) ? <tr key={index}>
            <th scope="row">{data.length - index}</th>
            <td>{el.name}</td>
            <td>{el.name_drive}</td>
            <td>{el.phone_dirve_1 || "لايوجد"}</td>
            <td>{el.phone_dirve_2 || "لايوجد"}</td>
            <td>{el.name_from_office || "لايوجد"}</td>
            <td>{el.name_to_office || "لايوجد"}</td>
            <td>{el.name_vehicle}</td>
            <td>{el.create_at.slice(0,10)}</td>
            <td> <Link  to={`print/${el.id}`} role='button'><FontAwesomeIcon className='text-warning' icon={faPrint} /></Link></td>

            {
                check_permissions("office.change_trip")?  <td> <Link  to={`${el.id}`} role='button'><FontAwesomeIcon className='text-success' icon={faPenToSquare} /></Link></td>: <td> <Link  style={{cursor:"not-allowed"}} role='button'><FontAwesomeIcon className='text-secondary' icon={faPenToSquare} /></Link></td>
             }
             {

              check_permissions("office.delete_trip") ? <td> <a role='button'  data-bs-toggle="modal"   onClick={()=> handelElement(el)}  data-bs-target={"#ModalD"}><FontAwesomeIcon className='text-danger'  icon={faTrashCan} /></a></td> : <td> <a role='button'  style={{cursor:"not-allowed"}} ><FontAwesomeIcon className='text-secondary'  icon={faTrashCan} /></a></td>

             }
          
            
           
          </tr>
          :
          null

          })}

        </tbody>
      </table>
      </div>
      }

    {!isLoad && <Confirm header={"حذف"} massage={"هل تريد حذف الرحلة؟ "} handelDelete={handelDelete} element={element} color={"danger"} icon={faTrashCan} textBtn={"حذف"}  />}



  </div>
  )
}

export default Trip