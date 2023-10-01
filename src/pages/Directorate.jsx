
import React, { useState ,useEffect} from 'react'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd ,faTrashCan, faPenToSquare,faStore ,faBuilding, faCarSide, faMapLocation} from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import { bisUrl } from '../context/biseUrl';
import Confirm from '../components/Confirm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { check_permissions } from '../context/permissions';

function Directorate() {
    const [data, setData] = useState([]);
    let [isLoad, setIsLoad] = useState(false);
    let [element,setElement] = useState(null);
    let [searchValue,setSearchValue] = useState("")
    let [provinec,setProvinec] = useState([]);
    let [provinec_name,setProvinec_name] = useState("");

    const authHeader = useAuthHeader()
    const config = {
        headers: { 'Authorization': authHeader() }
    };
    let isauth = useIsAuthenticated();

  


  useEffect(() => {
    setIsLoad(true)
    if(isauth()){
      axios.get(`${bisUrl}/places/directorate/`,config).then(res=>{
        setData(res.data.reverse());
        setIsLoad(false)

      }).catch(e=>{
        console.error(e)

      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })

      axios.get(`${bisUrl}/places/provinec/`,config).then(res=>{
        setProvinec(res.data.reverse());
        setIsLoad(false)

      }).catch(e=>{
        console.error(e)

      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })

    }

  },[])
  

  let handelElement = (el)=>{
    setElement(el)
  }

  let handelDelete = (el)=>{

    if(isauth()){

      axios.delete(`${bisUrl}/places/directorate/${el.id}`,config).then(()=>{
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

    <h6 className='text-dark'><FontAwesomeIcon icon={faMapLocation} /> إدارة المديريات  </h6>

    <div className='row g-1 mt-3'>

      <div className='col-12 col-lg-1 col-md-3 col-sm-12'>
      <Link to={'/location_home'} className="btn btn-outline-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">رجوع</Link>
      </div>

      {
          check_permissions("places.add_directorate") ?  <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
          <Link to={'add'} className="btn btn-dark btn-sm w-100" style={{fontSize:'14px'}} role="button" >إضافة مديرية<FontAwesomeIcon icon={faAdd} /></Link>
          </div> : <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
          <Link className="btn btn-secondary btn-sm w-100" style={{fontSize:'14px',cursor:"not-allowed"}} role="button">إضافة مديرية <FontAwesomeIcon icon={faAdd} /></Link>
          </div>
      }

      <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
        
      <input 
        onChange={(e)=>  handelChangeSearchValue(e)} 
        type="text" 
        className="form-control  form-control-sm outline-none"
        style={{fontSize:'14px'}}
        placeholder='بحث.. '/>
      </div>

      <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> setProvinec_name(e.target.value)} value={provinec_name} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="">كل المحافظات</option>
            {
              provinec.map((el)=><option value={el.name}>{el.name}</option>)
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
              <th scope="col">المحافظة</th>
              <th scope="col">تاريخ الانشاء</th>
              <th scope="col" className='text-success'>تعديل</th>
              <th scope="col" className='text-danger'>حذف</th>

            </tr>
        </thead>
        <tbody>
          { data.map((el,index)=>{

            return el.name.startsWith(searchValue) && el.name_provinec.startsWith(provinec_name) ? <tr key={index}>
            <th scope="row">{data.length - index}</th>
            <td>{el.name}</td>
            <td>{el.name_provinec}</td>
            <td>{el.create_at.slice(0,10)}</td>

            {
                check_permissions("places.change_directorate")?  <td> <Link  to={`${el.id}`} role='button'><FontAwesomeIcon className='text-success' icon={faPenToSquare} /></Link></td>: <td> <Link  style={{cursor:"not-allowed"}} role='button'><FontAwesomeIcon className='text-secondary' icon={faPenToSquare} /></Link></td>
            }
            {

                check_permissions("places.delete_directorate") ? <td> <a role='button'  data-bs-toggle="modal"   onClick={()=> handelElement(el)}  data-bs-target={"#ModalD"}><FontAwesomeIcon className='text-danger'  icon={faTrashCan} /></a></td> : <td> <a role='button'  style={{cursor:"not-allowed"}} ><FontAwesomeIcon className='text-secondary'  icon={faTrashCan} /></a></td>

            }
          
            
           
          </tr>
          :
          null

          })}

        </tbody>
      </table>
      </div>
      }

    {!isLoad && <Confirm header={"حذف"} massage={"هل تريد حذف نوع المديرية؟ "} handelDelete={handelDelete} element={element} color={"danger"} icon={faTrashCan} textBtn={"حذف"}  />}



  </div>
  )
}

export default Directorate