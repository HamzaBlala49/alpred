import React, { useState ,useEffect} from 'react'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd,faInfoCircle,faTrashCan, faPenToSquare,faUsers, faClipboard, faL, faPrint, faSearch} from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import { bisUrl } from '../context/biseUrl';
import Confirm from '../components/Confirm';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import { check_permissions } from '../context/permissions';
import BtnLoader from '../components/BtnLoader';

function Records() {
  const [data, setData] = useState([]);
  let [isLoad, setIsLoad] = useState(false);
  let [element,setElement] = useState(null);
  let [searchValue,setSearchValue] = useState("")

  let [status_1_Id,setStatus_1_Id] = useState("");
  let [status_2_Id,setStatus_2_Id] = useState("0");
  
  let [transformationList,setTransformationList] = useState([]);
  let [isTransformation,setIsTransformation] = useState(false)

  const [trips,setTrips] = useState([]);
  let [trip_Id_1,setTrip_Id_1] = useState("");
  let [trip_Id_2,setTrip_Id_2] = useState("");
  
  const [stores,setStores] = useState([]);
  let [store_Id_1,setStore_Id_1] = useState("");
  let [store_Id_2,setStore_Id_2] = useState("");

  const [city ,setCity] = useState([]);
  const [city_name ,setCity_name] = useState("");

  let [isSearch,setIsSearch] = useState(false);

  let [isCheckAll, setIsCheckAll] = useState(false);

  let [isSend, setIsSend] = useState(false);

  const authHeader = useAuthHeader()
  const config = {
    headers: { 'Authorization': authHeader() }
  };
  let isauth = useIsAuthenticated();

  useEffect(() => {
    setIsLoad(true)
    setIsCheckAll(false)

    if(isauth()){
      axios.get(`${bisUrl}/office/records/`,config).then(res=>{
        setData(res.data.reverse());
        setIsLoad(false)

      }).catch(e=>{
        console.error(e)
      alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
      })

      axios.get(`${bisUrl}/office/trips/`,config).then(res=>{
        setTrips(res.data.reverse());
        }).catch(e=>{
            console.error(e)
            alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
        })


        axios.get(`${bisUrl}/office/stores/`,config).then(res=>{

            setStores(res.data.reverse());
            
            }).catch(e=>{
                console.error(e)
                alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
            })

        axios.get(`${bisUrl}/places/city/`,config).then(res=>{

              setCity(res.data.reverse());
              
              }).catch(e=>{
                  console.error(e)
                  alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
          })


    }

  },[isTransformation])

  // useEffect(() => {

  //   setIsLoad(true)

  //   if(isauth()){
  //     console.log("dddd")
  //     axios.get(`${bisUrl}/office/records/`,config).then(res=>{
  //       setData(res.data.reverse());
  //       setIsLoad(false)

  //     }).catch(e=>{
  //       console.error(e)
  //     alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
  //     })

  //     axios.get(`${bisUrl}/office/trips/`,config).then(res=>{
  //       setTrips(res.data);
  //       }).catch(e=>{
  //           console.error(e)
  //           alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
  //       })


  //       axios.get(`${bisUrl}/office/stores/`,config).then(res=>{

  //           setStores(res.data);
            
  //           }).catch(e=>{
  //               console.error(e)
  //               alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
  //       })


  //   }
  
    
  // },[])
  

  let handelElement = (el)=>{
    setElement(el)
  }

  let handelDelete = (el)=>{

    if(isauth()){

      axios.delete(`${bisUrl}/office/records/${el.id}`,config).then(()=>{
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

  let handelResetting = (el) =>{
    setIsTransformation(!isTransformation);
    setStore_Id_1("");
    setStatus_1_Id("")
    setTrip_Id_1("");
    setIsSearch(false)
  }




  let handelChangeSelectStatus_1 = (e)=>{
    // setTransformationList([]);
    setStatus_1_Id(e.target.value)
    if(e.target.value == ""){
      setStatus_2_Id("");
      setTrip_Id_2("");
      setStore_Id_2("");
    }
  }

  let handelChangeSelect3 = (e)=>{
    setStatus_2_Id(e.target.value)
    if(e.target.value == "1"){
      setTrip_Id_2("");
    }else if(e.target.value == "3"){
      setStore_Id_2("");
    }else{
      setTrip_Id_2("");
      setStore_Id_2("");
    }
  }

  let handelCheck =(e,el)=>{
    let list  = transformationList;
    if(e.target.checked){
      el.isCheck = true;
      list.push(el)
    }else{
      el.isCheck = false;
      let index = list.indexOf(el)
      list.splice(index,1);
    }

    setTransformationList([...list])

    if(transformationList.length == 0){
      setIsCheckAll(false)
    }
  }

  let handelCheckAll = (e)=>{
    setIsCheckAll(!isCheckAll);
      if(e.target.checked){
        if(city_name !=""){
            let _data = data;
            let newData = []
          _data.forEach(el => {
              if(el.name_city == city_name){
                el.isCheck = true;
                newData.push(el)
              }
          })

          setData([..._data]);
          setTransformationList(newData);

          
        }else{
          let _data = data;
          _data.forEach(el => {
              el.isCheck = true;
          })
          setData([..._data]);
          setTransformationList(data);
        }
        
      }else{
        let _data = data;
        _data.forEach(el => {
            el.isCheck = false;
        })
        setData([..._data]);

        setTransformationList([]);
      }
  }

  let handelSubmit = ()=> {
    if(isauth){
      setIsSend(true);

        if(transformationList){
          axios.post(`${bisUrl}/office/records/`,{"records":transformationList,"expulsion_status":+status_2_Id,"trip":trip_Id_2 ||null ,"store" : store_Id_2 || null},config).then(()=>{
            setStatus_2_Id("")
            setStore_Id_2("")
            setTrip_Id_2("")
            setTransformationList([]);
            handelResetting();
            setIsSearch(false);
            setIsSend(false);

          }).catch((e)=>{
            console.log(e)
            setIsSend(true);
            alert("حدث خطأ أثناء عملية الأضافة")
          })

        }
    }
  }

  let handelSearch = ()=>{
    if(isauth){
      setTransformationList([]);
      setIsCheckAll(false)
      axios.get(`${bisUrl}/office/records/?trip=${trip_Id_1}&store=${store_Id_1}&expulsion_status=${status_1_Id}`,config).then((res)=>{
        let datalist =  res.data.reverse()
        datalist.forEach(el =>{
          el.isCheck = false;
        })
          setData(datalist);
          setIsSearch(true)
        }).catch((e)=>{
          console.log(e)
          alert("حدث خطأ أثناء عملية الأضافة")
        })
  }
  }

  let handelCityName = (e)=>{
    setCity_name(e.target.value);
    setIsCheckAll(false);
    let _data = data;
    _data.forEach(el => {
        el.isCheck = false;
    })
    setData([..._data]);
    setTransformationList([]);
  }



  return (
    <div className='p-2'>

    <h6 className='text-dark'><FontAwesomeIcon icon={faClipboard} /> إدارة السجلات </h6>

    <div className='row g-3 mt-3'>

      <div className='col-12 col-lg-1 col-md-3 col-sm-12'>
        <Link to={'/office_home'} className="btn btn-outline-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">رجوع</Link>
      </div>

      <div className='col-12 col-lg-3 col-md-2 col-sm-12'>
        
      <input 
        onChange={(e)=> setSearchValue(e.target.value)} 
        type="text" 
        className="form-control  form-control-sm outline-none"
        style={{fontSize:'14px'}}
        placeholder='يحث برقم الطرد...'/>
      </div>



      <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
        <select onChange={(e)=> handelChangeSelectStatus_1(e)} value={status_1_Id} className="form-select form-select-sm"
        style={{fontSize:'14px'}} 
        id="floatingSelectGrid">
            <option value="">كل الحالات</option>
            <option value="0">أستلام مكتب</option>
            <option value="1">أستلام مخزني</option>
            <option value="2">تسليم مخزني</option>
            <option value="3">أستلام مركبة </option>
            <option value="4">تسليم مركبة </option>
            <option value="5">أستلام المستلم</option>
        </select>
      </div>

      <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <select onChange={(e)=> setStore_Id_1(e.target.value) } value={store_Id_1} className="form-select form-select-sm"
            style={{fontSize:'14px'}} 
            id="floatingSelectGrid">
                <option value="">أختر المخزن</option>
                {stores.map(el =>{
                    return <option value={el.id}>{el.name}</option>
                })}
            </select>
        </div>


        <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <select onChange={(e)=> setTrip_Id_1(e.target.value)} value={trip_Id_1} className="form-select form-select-sm"
            style={{fontSize:'14px'}} 
            id="floatingSelectGrid">
                <option value="">أختر الرحلة</option>
                {trips.map(el =>{
                    return <option value={el.id}>{el.id}</option>
                })}
            </select>
        </div>

        <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <select onChange={(e)=> handelCityName(e)} value={city_name} className="form-select form-select-sm"
            style={{fontSize:'14px'}} 
            id="floatingSelectGrid">
                <option value="">أختر مدينة</option>
                {city.map(el =>{
                    return <option value={el.name}>{el.name}</option>
                })}
            </select>
        </div>


        {
          status_1_Id !="" || store_Id_1!="" || trip_Id_1!=""? <>
          <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <button className='btn btn-sm btn-dark w-100' onClick={(e)=> handelSearch()} style={{fontSize:'14px',fontWeight:"bold"}}><FontAwesomeIcon icon={faSearch} /> بحث</button>
          </div>
          </>
          :
          null
        }

        <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <button className='btn btn-sm btn-secondary w-100' onClick={(e)=> handelResetting()} style={{fontSize:'14px',fontWeight:"bold"}}>إعاده ضبط</button>
        </div>

      {
        check_permissions("office.view_motionrecording") ? <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
         <Link role='button' to={"/print__2"} className='btn btn-sm btn-warning w-100'  style={{fontSize:'14px',fontWeight:"bold"}} > <FontAwesomeIcon icon={faPrint} /> طباعة السجلات</Link>
      </div>:null
      }

        


      </div>


     {
      isSearch &&  <div className='row g-3 mt-3'>
      <span><b>ترحيل الئ</b></span>
    {
      check_permissions("office.add_motionrecording")?<div className='col-12 col-lg-2 col-md-2 col-sm-12'>
      <select onChange={(e)=> handelChangeSelect3(e)} value={status_2_Id} className="form-select form-select-sm"
      style={{fontSize:'14px'}} 
      id="floatingSelectGrid">
          <option value="0">أستلام مكتب</option>
          <option value="1">أستلام مخزني</option>
          <option value="2">تسليم مخزني</option>
          <option value="3">أستلام مركبة </option>
          <option value="4">تسليم مركبة </option>
          <option value="5">أستلام المستلم</option>
      </select>
    </div>: null
    }

    {
      status_2_Id == "1" && check_permissions("office.add_motionrecording")?<div className='col-12 col-lg-2 col-md-2 col-sm-12'>
      <select onChange={(e)=> setStore_Id_2(e.target.value)} value={store_Id_2} className="form-select form-select-sm"
      style={{fontSize:'14px'}} 
      id="floatingSelectGrid">
          <option value="">أختر المخزن</option>
          {stores.map(el=>{
            return <option value={el.id}>{el.name}</option>
          })}
      </select>
    </div>: null
    }

    {
      status_2_Id == "3" && check_permissions("office.add_motionrecording")?<div className='col-12 col-lg-2 col-md-2 col-sm-12'>
      <select onChange={(e)=> setTrip_Id_2(e.target.value)} value={trip_Id_2} className="form-select form-select-sm"
      style={{fontSize:'14px'}} 
      id="floatingSelectGrid">
          <option value="">أختر الرحلة</option>
          {trips.map(el => {
            return <option value={el.id}>{el.name}</option>
          })}
      </select>
    </div>: null
    }

    {
       (((status_2_Id && (trip_Id_2 || store_Id_2)) || (status_2_Id !="1" && status_2_Id != "3") ) && transformationList.length !=0) &&  check_permissions("office.add_motionrecording")? <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
          <button className='btn btn-sm btn-info w-100' disabled={isSend} onClick={(e)=> handelSubmit()} style={{fontSize:'14px',fontWeight:"bold"}} >
            {
              isSend ? <BtnLoader/> : "ترحيل"
            }
          </button>
    </div>:null
    }

  

    </div>
     }



      


    {isLoad ?
    <Loader/>
       : 
      <div className="table-responsive mt-4" style={{fontSize:"16px"}}>
      <table className="table table-striped">
        <thead>
            <tr>
              <th scope='col'> {isSearch &&<><input class="form-check-input" checked={isCheckAll} onChange={(e)=> handelCheckAll(e)}  type="checkbox" aria-label="Text for screen reader"/> الكل</>}</th>
              <th scope="col">الرقم</th>
              <th scope="col">رقم الطرد</th>
              <th scope="col">حالة الطرد</th>
              <th scope="col">المخزن</th>
              <th scope="col">الرحلة</th>
              <th scope="col">وجهة الطرد</th>
              <th scope="col">السعر</th>
              <th scope="col">نوع العملة</th>
              <th scope="col"> نوع الدفع</th>
              <th scope="col">السائق</th>

              <th scope="col">تاريخ الانشاء</th>
              <th scope="col" className='text-success'>تعديل</th>
              <th scope="col" className='text-danger'>حذف</th>
            </tr>
        </thead>
        <tbody>
          { data.map((el,index)=>{

            return el.expulsion.toString().startsWith(searchValue) && el.name_city.startsWith(city_name) ? <tr key={index}>
            <th scope="row">{isSearch && <input class="form-check-input" checked={el.isCheck}  onChange={(e)=> handelCheck(e,el)}  type="checkbox" aria-label="Text for screen reader"/> }</th>
            <th scope="row">{data.length - index}</th>
            <td>{el.expulsion}</td>
            <td>{el.name_expulsion_status}</td>
            <td>{el.name_store || "لايوجد"}</td>
            <td>{el.trip || "لايوجد"}</td>
            <td>{el.name_city || "لايوجد"}</td>
            <td>{el.name_price || "لايوجد"}</td>
            <td>{el.name_type_currency || "لايوجد"}</td>
            <td>{el.name_type_price || "لايوجد"}</td>
            <td>{el.name_drive || "لايوجد"}</td>
            <td>{el.create_at.slice(0,10)}</td>
            {
                check_permissions("office.change_motionrecording")?  <td> <Link  to={`${el.id}`} role='button'><FontAwesomeIcon className='text-success' icon={faPenToSquare} /></Link></td>: <td> <Link  style={{cursor:"not-allowed"}} role='button'><FontAwesomeIcon className='text-secondary' icon={faPenToSquare} /></Link></td>
            }

            {
              check_permissions("office.delete_motionrecording") ? <td> <a role='button'  data-bs-toggle="modal"   onClick={()=> handelElement(el)}  data-bs-target={"#ModalD"}><FontAwesomeIcon className='text-danger'  icon={faTrashCan} /></a></td> : <td> <a role='button'  style={{cursor:"not-allowed"}} ><FontAwesomeIcon className='text-secondary'  icon={faTrashCan} /></a></td>
            }
          </tr>
          :
          null

          })}

        </tbody>
      </table>
      </div>
      }
      
    {!isLoad && <Confirm header={"حذف"} massage={"هل تريد حذف العميل؟"} handelDelete={handelDelete} element={element} color={"danger"} icon={faTrashCan} textBtn={"حذف"}  />}


  </div>
  )
}

export default Records