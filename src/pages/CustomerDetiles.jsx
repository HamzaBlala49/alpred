import React, { useState ,useEffect} from 'react'
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd,faInfoCircle,faUser ,faTrashCan,faClipboard, faPenToSquare,faUsers, faBox, faPrint} from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import { bisUrl } from '../context/biseUrl';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import Confirm from '../components/Confirm';
import { check_permissions } from '../context/permissions';
import { user_avatar } from '../assets/image';

function CustomerDetiles() {
    let navigate = useNavigate()
    let {Id} = useParams()
    let [element,setElement] = useState(null);
    let [searchValue,setSearchValue] = useState("")
    let [selectValue,setSelectValue] = useState("old");
    let [isLoad, setIsLoad] = useState(false);
    const [data,setData]=useState([]);
    const [expulsions,setExpulsions] = useState([]);
    const authHeader = useAuthHeader();
    let isauth = useIsAuthenticated();
    let [note,setNote] = useState("");

    let [offices,setOffices] = useState([]);
    let [office_name,setOffice_name] = useState("");

    let [city,setCity] = useState([]);
    let [city_name,setCity_name] = useState("");

    const config = {
        headers: { 'Authorization': authHeader() }
    };

    useEffect(()=>{
        setIsLoad(true)
        
        if(isauth()){

        axios.get(`${bisUrl}/office/customers/${Id}`,config).then(res=>{
            setData(res.data);
        }).catch(e=>{
            console.log(e)
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
        })

        axios.get(`${bisUrl}/office/expulsions/?customer=${Id}`,config).then(res=>{
            setExpulsions(res.data.reverse());
            setIsLoad(false)
        }).catch(e=>{
            console.log(e)
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
        })

        axios.get(`${bisUrl}/office/office/`,config).then(res=>{
            setOffices(res.data.reverse());
        }).catch(e=>{
            console.log(e)
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
        })

        axios.get(`${bisUrl}/places/city/`,config).then(res=>{
            setCity(res.data.reverse());
        }).catch(e=>{
            console.log(e)
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
        })

        

        }
  
},[]);

let handelChangeSearchValue = (e)=>{
    setSearchValue(e.target.value);
}

let handelChangeSelect = (e)=>{
  setSelectValue(e.target.value)
}
let handelNote = (note)=>{
    setNote(note)
    
}
let handelElement = (el)=>{
    setElement(el)
}

let handelDelete = (el)=>{

    if(isauth()){

      axios.delete(`${bisUrl}/office/expulsions/${el.id}`,config).then(()=>{
        let _data= expulsions;
        const index = _data.indexOf(el);
        _data.splice(index,1);
        setData([..._data]);

      }).catch(e=>{
        console.error(e)
        alert("هناك خطأ حدث أثناء الخذف!!")
      })

    }

}


  return (
    <div className='p-2 mt-3'>
    <h6 className='text-dark'><FontAwesomeIcon icon={faUser} />    تفاصيل العمبل  </h6>
    <div className='mt-5'>
       <ul class="nav nav-tabs" id="myTab" role="tablist">
           <li class="nav-item" role="presentation">
               <button class="nav-link text-dark active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">معلومات شخصية</button>
           </li>
          
           <li class="nav-item" role="presentation">
               <button class="nav-link text-dark" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">الطرود</button>
           </li>
           
   </ul>
   <div class="tab-content m-3" id="myTabContent">

       <div class="tab-pane fade bg-white show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
           <div className='info'>
               <div className='row p-3'>
               <div className='body-info col-12' >

                   <p><b>الأسم: </b>{data.name}</p>
                   <p><b> 1 رقم الهاتف: </b>{data.phone_1}</p>
                   <p><b>2 رقم الهاتف: </b>{data.phone_2}</p>
                   <p><b> نوع الهوية : </b>{data.name_type_doc}</p>
                   <p><b> رقم الهوية : </b>{data.number_doc}</p>
                   <p><b> المدينة: </b>{data.name_place}</p>
               </div>
               <div className='col-12'>

                   {data.doc_url ? <img src={data.doc_url} className='shadow-sm'style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"cover"}} /> : <img src={user_avatar} className='shadow-sm' style={{width:"300px",height:"250px",borderRadius:"4px",display:"block",objectFit:"contain"}} /> }

               </div>
               </div>
           </div>
       </div>

       <div class="tab-pane fade bg-white " id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabindex="0">
       <div className='p-2'>

            <h6 className='text-dark'><FontAwesomeIcon icon={faBox} /> الطرود </h6>

            <div className='row g-1 mt-3'>
                <div className='col-12 col-lg-3 col-md-3 col-sm-12'>
                    
                <input 
                    onChange={(e)=>  handelChangeSearchValue(e)} 
                    type="text" 
                    className="form-control  form-control-sm outline-none"
                    style={{fontSize:'14px'}}
                    placeholder='البحث بأسم المستلم أو الرقم.. '/>
                </div>

                <div className='col-12 col-lg-3 col-md-2 col-sm-12'>
                    <select onChange={(e)=> setOffice_name(e.target.value)} value={office_name} className="form-select form-select-sm"
                    style={{fontSize:'14px'}} 
                    id="floatingSelectGrid">
                        <option value="">كل المكاتب</option>
                        {
                            offices.map((el)=><option value={el.name}>{el.name}</option>)
                        }
                    </select>
                </div>

                <div className='col-12 col-lg-3 col-md-2 col-sm-12'>
                    <select onChange={(e)=> setCity_name(e.target.value)} value={city_name} className="form-select form-select-sm"
                    style={{fontSize:'14px'}} 
                    id="floatingSelectGrid">
                        <option value="">كل المدن</option>
                        {
                            city.map((el)=><option value={el.name}>{el.name}</option>)
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
                        <th scope="col">رقم الطرد</th>
                        <th scope="col">المستلم</th>
                        <th scope="col">رقم المستلم 1</th>
                        <th scope="col">رقم المستلم 2 </th>
                        <th scope="col">من المكتب</th>
                        <th scope="col">الى المكتب</th>
                        <th scope="col">المدينة</th>
                        <th scope="col">السعر</th>
                        <th scope="col">نوع الدفع</th>
                        <th scope="col">نوع العملة</th>
                        <th scope="col">أهمية الطرد</th>
                        <th scope="col">تاربخ الأنشاء</th>
                        <th scope="col" className='text-primary'>المحتوىات</th>
                        {/* <th scope="col" className='text-warning'>السجلات</th> */}
                        <th scope="col" className='text-warning'>طباعة</th>
                        <th scope="col" className='text-success'>تعديل</th>
                        <th scope="col" className='text-danger'>حذف</th>
                    </tr>
                </thead>
                <tbody>
                { expulsions.map((el,index)=>{

                    return (el.recipient_name?.startsWith(searchValue) || el.recipient_phone_1.startsWith(searchValue)) && el.name_to_office.startsWith(office_name) && el.name_to_city.startsWith(city_name) ? <tr key={index}>
                    <th scope="row">{expulsions.length - index}</th>
                    <td>{el.id}</td>
                    <td>{el.recipient_name}</td>
                    <td>{el.recipient_phone_1}</td>
                    <td>{el.recipient_phone_2 || "لايوجد"}</td>
                    <td>{el.name_from_office}</td>
                    <td>{el.name_to_office}</td>
                    <td>{el.name_to_city}</td>
                    <td>{el.price}</td>
                    <td>{el.name_type_price}</td>
                    <td>{el.name_type_currency}</td>
                    <td>{el.precious ? "ثمين" : "غير ثمين"}</td>
                    <td>{el.create_at.slice(0,10)}</td>
                    <td> <a role='button'  data-bs-toggle="modal" onClick={()=> handelNote(`المحتوئ:${el.content} ----- محتوى للنقطة: ${el.content_ponts}`)} data-bs-target={"#Modal"}><FontAwesomeIcon className='text-primary' icon={faInfoCircle}/></a></td>
                    {/* <td> <Link  to={`recordDetiles/${el.id}`} role='button'><FontAwesomeIcon className='text-warning' icon={faClipboard} /></Link></td> */}
                    <td><Link to={`/print_1/${el.id}`} role='button'> <FontAwesomeIcon className='text-warning' icon={faPrint} /></Link></td>
                    
                    {
                      check_permissions("office.change_expulsion")?  <td> <Link  to={`/expulsion/${el.id}`} role='button'><FontAwesomeIcon className='text-success' icon={faPenToSquare} /></Link></td>: <td> <Link  style={{cursor:"not-allowed"}} role='button'><FontAwesomeIcon className='text-secondary' icon={faPenToSquare} /></Link></td>
                    }

                    {

                      check_permissions("office.delete_expulsion") ? <td> <a role='button'  data-bs-toggle="modal"   onClick={()=> handelElement(el)}  data-bs-target={"#ModalD"}><FontAwesomeIcon className='text-danger'  icon={faTrashCan} /></a></td> : <td> <a role='button'  style={{cursor:"not-allowed"}} ><FontAwesomeIcon className='text-secondary'  icon={faTrashCan} /></a></td>
                    }
                    
                </tr>
                :
                null

                })}

                </tbody>
            </table>
            </div>
        }
            </div>
        </div>

   </div>
    </div>

    <Link role='button' to={"/customer"} className="btn btn-dark  ms-2">رجوع</Link>

    {!isLoad &&  <Alert note={note} />}
    {!isLoad && <Confirm header={"حذف"} massage={"هل تريد حذف الطرد؟"} handelDelete={handelDelete} element={element} color={"danger"} icon={faTrashCan} textBtn={"حذف"}  />}


    </div>
  )
}

export default CustomerDetiles


// السجلات

// <h6 className='text-dark'><FontAwesomeIcon icon={faClipboard} /> السجلات الشخصية </h6>
//                <div className='mt-3 row g-3'>
                   
//                    <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
//                        <select  onChange={(e)=> handelChangeSelect2(e)} value={selectValue2}  className="form-select  form-select-sm"
//                            style={{fontSize:'14px' }} 
//                            id="floatingSelectGrid">
//                                <option key={0} value="">كل القوائم</option>
//                                {lists.map(el =>{
//                                    return <option key={el.id} value={el.name}>{el.name}</option>
//                                })}
//                    </select>

//                    </div>

//                    <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
//                        <select onChange={(e)=> handelChangeSelect3(e)} value={selectValue3} className="form-select form-select-sm"
//                        style={{fontSize:'14px'}} 
//                        id="floatingSelectGrid">
//                            <option key={0} value="">كل النقاط</option>
//                            {points.map(el =>{
//                                return el.state == "Active" ? <option key={el.id} value={el.name}>{el.name}</option> : null
//                            })}
//                    </select>
//                    </div>


//                    <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
//                        <select onChange={(e)=> handelChangeSelect4(e)} value={selectValue4} className="form-select form-select-sm"
//                            style={{fontSize:'14px' }} 
//                            id="floatingSelectGrid">
//                                <option key={0} value="">كل الحزم</option>
//                                {packages.map(el =>{
//                                    return <option key={el.id} value={el.name}>{el.name}</option>
//                                })}
//                        </select>
//                    </div>


//                    <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
//                        <select onChange={(e)=> handelChangeSelect5(e)} value={selectValue5} className="form-select form-select-sm"
//                        style={{fontSize:'14px'}} 
//                        id="floatingSelectGrid">
//                            <option id='0' key={0} value="">كل الموزعين</option>
//                            {users.map(el =>{
//                                return el.userType == "0" ? <option key={el.id} value={el.name}>{el.name}</option> : null
//                            })}
//                        </select>
//                    </div>

//                    <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
//                        <select onChange={(e)=> handelChangeSelect6(e)} value={selectValue6} className="form-select form-select-sm"
//                        style={{fontSize:'14px'}} 
//                        id="floatingSelectGrid">
//                            <option value="">الكل</option>
//                            <option value="Not">لم تسلم</option>
//                            <option value="deleverd">سلمت</option>
//                        </select>
//                    </div>

//                    <div className='col-12 col-lg-2 col-md-3 col-sm-12'>
//                        <input onChange={(e)=>  handelDate(e)} type="month" className="form-control form-control-sm outline-none"
//                            style={{fontSize:'14px'}}
//                            value={date}
//                        />
//                    </div>

//                    <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
//                        <button className='btn btn-sm  w-100 btn-secondary' 
//                        type='button'
//                        style={{fontSize:'14px'}}
//                        onClick={()=> handelReset()}
//                        >  إعادة ضبط المدخلات </button>
//                    </div>
           

//                    <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
//                        <button className='btn btn-sm  w-100 btn-warning' 
//                        type='button'
//                        style={{fontSize:'14px'}}
//                        onClick={()=> handelReportBtn()}
//                        > طباعة تقرير <FontAwesomeIcon icon={faPrint} /> </button>
//                    </div>

//                </div>
//                <div className="table-responsive mt-4" style={{fontSize:"16px"}}>
//                    <table className="table table-striped" ref={reportRef}>
//                        <thead>
//                            <tr>
//                            <th scope="col">الرقم</th>
//                            <th scope="col">أسم القائمة</th>
//                            <th scope="col"> نقطة التوزيع </th>
//                            <th scope="col">الموزع</th>
//                            <th scope="col">تاريخ الأستلام</th>
//                            <th scope="col">الحالة</th>
//                            <th scope="col">أسم الحزمة</th>
//                            </tr>
//                        </thead>
//                        <tbody>
//                        { records.reverse()?.map((el,index)=>{
//                            return el.listName.startsWith(selectValue2)   && el.distriputionPointName.startsWith(selectValue3) && el.package?.name.startsWith(selectValue4) && el.distriputerName.startsWith(selectValue5) && el.state.startsWith(selectValue6) && el.recrptionDate.slice(0,7).startsWith(date)  ? <tr key={index}>
//                            <th scope="row">{index+1}</th>
//                            {/* <td>{el.recipientName}</td> */}
//                            <td>{el.listName}</td>
//                            <td>{el.distriputionPointName}</td>
//                            <td>{el.distriputerName}</td>
//                            <td>{el.recrptionDate == "0000-00-00" ? "لا يوجد" : el.recrptionDate}</td>
//                            <td>{el.state == "Not" ? "لم تسلم" : "سلمت"}</td>
//                            <td>{el.package?.name}</td>
//                          </tr>
//                          :
//                          null
//                        })}
//                        </tbody>
//                    </table>
//                 </div>