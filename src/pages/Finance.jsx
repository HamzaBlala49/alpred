import React, { useState ,useEffect} from 'react'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd,faMoneyBill,faSearch,faInfoCircle,faTrashCan, faPenToSquare,faStore ,faBuilding} from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import { bisUrl } from '../context/biseUrl';
import Confirm from '../components/Confirm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import { check_permissions } from '../context/permissions';



function Finance() {

  const [data, setData] = useState([]);
  let [isLoad, setIsLoad] = useState(false);
  let [element,setElement] = useState(null);
  let [searchValue,setSearchValue] = useState("")
  let [offices,setOffices] = useState([]);
  let [officeId,setOfficeId] = useState("");
  let [type_currency,setType_currency] = useState("");
  let [type_account,setType_account] = useState("");
  let [start_date,setStart_date] = useState("");
  let [end_date,setEnd_date] = useState("");
  let [total,setTotal] = useState(null);



  let [note,setNote] = useState("");

  const authHeader = useAuthHeader()
  const config = {
    headers: { 'Authorization': authHeader() }
  };
  let isauth = useIsAuthenticated();

  


  useEffect(() => {
    setIsLoad(true)
    if(isauth()){
      axios.get(`${bisUrl}/office/finamcefunds/`,config).then(res=>{
        setData(res.data.reverse());
        console.log(res.data)
        setIsLoad(false)

      }).catch(e=>{
        console.error(e)

      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })

      axios.get(`${bisUrl}/office/office/`,config).then(res=>{
        setOffices(res.data.reverse());
      }).catch(e=>{
        alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })
    }
  },[])
  

  let handelElement = (el)=>{
    setElement(el)
  }

  let handelDelete = (el)=>{

    if(isauth()){

      axios.delete(`${bisUrl}/office/finamcefunds/${el.id}`,config).then(()=>{
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

  let handelNote = (note)=>{
    setNote(note)
    
  }

  let handelResetting = (el) =>{
    setEnd_date("");
    setStart_date("");
    setType_account("");
    setType_currency("");
    setOfficeId("");
    setTotal(null);

    setIsLoad(true)
    if(isauth()){
      axios.get(`${bisUrl}/office/finamcefunds/`,config).then(res=>{
        setData(res.data.reverse());
        setIsLoad(false)

      }).catch(e=>{
        console.error(e)

      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })
    }
  }

  let handelChangeType_currency=(e)=>{
    setType_currency(e.target.value);
    if(type_currency == ""){
      setTotal(null)
    }

  }

  let handelChangeType_account=(e)=>{
    setType_account(e.target.value);
    if(type_account == ""){
      setTotal(null)
    }

  }

  let handelSearch = ()=>{
    if(isauth){
      setIsLoad(true)
      axios.get(`${bisUrl}/office/finamcefunds/?office=${officeId}&type_currency=${type_currency}&type_account=${type_account}&start_date=${start_date}&end_date=${end_date}`,config).then((res)=>{
        setData(res.data.reverse());
        setTotal(res.data[0].total_price)
        setIsLoad(false)

        }).catch((e)=>{
          alert("حدث خطأ أثناء عملية البحث")
        })
  }
  }

  return (
   <div className='p-2'>

    <h6 className='text-dark'><FontAwesomeIcon icon={faMoneyBill} /> إدارة المالية </h6>

    <div className='row g-3 mt-3'>

      <div className='col-12 col-lg-1 col-md-3 col-sm-12'>
      <Link to={'/office_home'} className="btn btn-outline-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">رجوع</Link>
      </div>

      {
          check_permissions("office.add_finamcefund") ?  <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
          <Link to={'add'} className="btn btn-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">إضافة مالية <FontAwesomeIcon icon={faAdd} /></Link>
          </div> : <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
          <Link className="btn btn-secondary btn-sm w-100" style={{fontSize:'14px',cursor:"not-allowed"}} role="button">إضافة مالية <FontAwesomeIcon icon={faAdd} /></Link>
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
        <select onChange={(e)=> setOfficeId(e.target.value)} value={officeId} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="">كل المكاتب</option>
            {
              offices.map((el)=><option value={el.id}>{el.name}</option>)
            }
            
        </select>
      </div>

      <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> handelChangeType_currency(e)} value={type_currency} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="">كل أنواع العملات</option>
            <option value="1">ريال يمني عملة عدن</option>
            <option value="2">ريال سعودي</option>
            <option value="3">دولار</option>
            <option value="4">ريال يمني عملة صنعاء</option>
            
        </select>
      </div>

      <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> handelChangeType_account(e)} value={type_account} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="">كل انواع الحسابات</option>
            <option value="1">إراد</option>
            <option value="2">مصروفات</option>
            <option value="3">مشتريات</option>
            <option value="4">مبيعات</option>
            <option value="5">رأس مال</option>
            
        </select>
      </div>

      <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
        <div className='d-flex'>
            <label style={{fontSize:"14px"}}>من تاريخ:</label>
            <input type="date" onChange={(e)=> setStart_date(e.target.value)} value={start_date} className='form-control  form-control-sm outline-none' style={{fontSize:"14px",height:"30px"}}/>
        </div>
           
      </div>

      
      <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
        <div className='d-flex'>
            <label style={{fontSize:"14px"}}>الئ تاريخ:</label>
            <input type="date" onChange={(e)=> setEnd_date(e.target.value)} value={end_date} className='form-control  form-control-sm outline-none' style={{fontSize:"14px",height:"30px"}}/>
        </div>
           
      </div>


     

      <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <button className='btn btn-sm btn-secondary w-100' onClick={(e)=> handelResetting()} style={{fontSize:'14px',fontWeight:"bold"}}>إعاده ضبط</button>
      </div>

      {
          officeId != "" || type_account !="" || type_currency  != "" || start_date != "" || end_date != "" ?  <>
          <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <button className='btn btn-sm btn-dark w-100' onClick={(e)=> handelSearch()} style={{fontSize:'14px',fontWeight:"bold"}}><FontAwesomeIcon icon={faSearch} /> بحث</button>
          </div>
          </>
          :
          null
      }

      {
          type_account !="" || type_currency  != ""  && total !=null ?  <>
          <div className='col-12 col-lg-8 col-md-5 col-sm-12'>
            <span style={{fontSize:"14px"}}>المجموع الكلي :<b>{total || "لا يوجد"}</b></span>
            <span className='mx-3' style={{fontSize:"14px"}}>نوع العملة:<b>{data[1]?.name_type_currency || "لا يوجد"}</b></span>
            <span style={{fontSize:"14px"}}>نوع الحساب:<b>{data[1]?.name_type_account || "لا يوجد"}</b></span>
          </div>
          </>
          :
          null
      }

    </div>

    {isLoad ?
    <Loader/>
       : 
      <div className="table-responsive mt-4" style={{fontSize:"16px"}}>
      <table className="table table-striped">
        <thead>
            <tr>
              <th scope="col">الرقم</th>
              <th scope="col">رقم الطرد</th>
              <th scope="col">أسم المكتب</th>
              <th scope="col">نوع الحساب</th>
              <th scope="col">السعر</th>
              <th scope="col">نوع العملة</th>
              <th scope="col">تاريخ الانشاء</th>
              <th scope="col" className='text-primary'>الملاحظة</th>
              <th scope="col" className='text-success'>تعديل</th>
              <th scope="col" className='text-danger'>حذف</th>

            </tr>
        </thead>
        <tbody>
          { data.map((el,index)=>{

            return el.name_office?.startsWith(searchValue) ? <tr key={index}>
            <th scope="row">{data.length - index}</th>
            <td>{el.expulsion || <span className='text-warning'>لايوجد</span>}</td>
            <td>{el.name_office}</td>
            <td>{el.name_type_account}</td>
            <td>{el.price}</td>
            <td>{el.name_type_currency}</td>
            <td>{el.create_at.slice(0,10)}</td>
            <td> <a role='button'  data-bs-toggle="modal" onClick={()=> handelNote(el.nots|| "لاتوجد ملاحظة")} data-bs-target={"#Modal"}><FontAwesomeIcon className='text-primary' icon={faInfoCircle}/></a></td>

            {
                check_permissions("office.change_finamcefund")?  <td> <Link  to={`${el.id}`} role='button'><FontAwesomeIcon className='text-success' icon={faPenToSquare} /></Link></td>: <td> <Link  style={{cursor:"not-allowed"}} role='button'><FontAwesomeIcon className='text-secondary' icon={faPenToSquare} /></Link></td>
            }
            {

              check_permissions("office.delete_finamcefund") ? <td> <a role='button'  data-bs-toggle="modal"   onClick={()=> handelElement(el)}  data-bs-target={"#ModalD"}><FontAwesomeIcon className='text-danger'  icon={faTrashCan} /></a></td> : <td> <a role='button'  style={{cursor:"not-allowed"}} ><FontAwesomeIcon className='text-secondary'  icon={faTrashCan} /></a></td>
            }
          
          </tr>
          :
          null

          })}

        </tbody>
      </table>
      </div>
      }
    {!isLoad &&  <Alert note={note} />}
    {!isLoad && <Confirm header={"حذف"} massage={"هل تريد حذف المالية؟"} handelDelete={handelDelete} element={element} color={"danger"} icon={faTrashCan} textBtn={"حذف"}  />}



  </div>
  )
}

export default Finance