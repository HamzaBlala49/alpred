import axios from "axios";
import { React, useEffect, useState ,useRef} from "react";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { bisUrl } from "../context/biseUrl";
import { faSearch,faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { logo } from "../assets/image";
import { useReactToPrint } from 'react-to-print';


function Print__2() {
    const [data,setData] = useState([]);
    const [trips,setTrips] = useState([]);
    const [stores,setStores] = useState([]);
    const [expulsions,setExpulsions] = useState([]);
    const date = new Date()
    const [selectValue,setSelectValue] = useState("");
    const [selectValue2,setSelectValue2] = useState("");
    const [selectValue3,setSelectValue3] = useState("");
    const [selectValue4,setSelectValue4] = useState("");
    const [create_at,setCreate_at] = useState("");
    const componentRef1 = useRef();


    const authHeader = useAuthHeader()
    const config = {
    headers: { 'Authorization': authHeader() }
    };
    let isauth = useIsAuthenticated();

    useEffect(() => {
        if(isauth()){
            axios.get(`${bisUrl}/office/stores/`,config).then(res=>{
            setStores(res.data);
            }).catch(e=>{
                console.error(e)
                alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
            })

            axios.get(`${bisUrl}/office/trips/`,config).then(res=>{
                setTrips(res.data);
                }).catch(e=>{
                    console.error(e)
                    alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
                })


                axios.get(`${bisUrl}/office/expulsions/`,config).then(res=>{

                    setExpulsions(res.data);
                    
                    }).catch(e=>{
                        console.error(e)
                        alert("حث خطأ اثناء جلب البيانات تأكد من اتصالك بالشبكة")
                    })
        }

    }, [])
    

    const handelSearch = ()=>{
        if(isauth){
            axios.get(`${bisUrl}/office/records/?trip=${selectValue4}&store=${selectValue3}&expulsion_status=${selectValue}&expulsion=${selectValue2}`,config).then((res)=>{

                setData(res.data)
    
              }).catch((e)=>{
                console.log(e)
                alert("حدث خطأ أثناء عملية الأضافة")
              })
        }
        console.log(data)
    }

    const handlePrint1 = useReactToPrint({
        content:()=> componentRef1.current,
        documentTitle:`سند أستلام مركبة`,
        pageStyle:`@media print {
            @page {
              direction: rtl;
            }
          }`,
          onAfterPrint: ()=> navigate("/expulsion")
    })

    let handelReportBtn1 = ()=> handlePrint1()
    


  return (
    <div className='p-2'>
    <div className='row g-2 mt-3'>
        {/* <div className='col-12 col-lg-3 col-md-3 col-sm-12'>  
            <input 
            onChange={(e)=>  handelChangeSearchValue(e)} 
            type="text" 
            className="form-control  form-control-sm outline-none"
            style={{fontSize:'14px'}}
            placeholder='بحث.. '/>
        </div> */}
        <div className='col-12 col-lg-1 col-md-3 col-sm-12'>
            <Link to={'/records'} className="btn btn-outline-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">رجوع</Link>
        </div>
        <div className="col-lg-2  col-md-2 col-sm-12">
            <button 
                onClick={(e)=>handelSearch()}
                className="btn w-100 btn-sm btn-dark"
                style={{fontSize:"14px"}}
            >   بحث 
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>

        <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <select onChange={(e)=> setSelectValue(e.target.value)} value={selectValue} className="form-select form-select-sm"
            style={{fontSize:'14px'}} 
            id="floatingSelectGrid">
                <option value="">الكل</option>
                <option value="0">أستلام مكتب</option>
                <option value="1">أستلام مخزني</option>
                <option value="2">تسليم مخزني</option>
                <option value="3">أستلام مركبة </option>
                <option value="4">تسليم مركبة </option>
                <option value="5">أستلام المستلم</option>
            </select>
        </div>

        <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <select onChange={(e)=> setSelectValue2(e.target.value)} value={selectValue2} className="form-select form-select-sm"
            style={{fontSize:'14px'}} 
            id="floatingSelectGrid">
                <option value="">أختر الطرد</option>
                {expulsions.map(el =>{
                    return <option value={el.id}>{el.id}</option>
                })}
            </select>
        </div>

        <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <select onChange={(e)=> setSelectValue3(e.target.value) } value={selectValue3} className="form-select form-select-sm"
            style={{fontSize:'14px'}} 
            id="floatingSelectGrid">
                <option value="">أختر المخزن</option>
                {stores.map(el =>{
                    return <option value={el.id}>{el.name}</option>
                })}
            </select>
        </div>


        <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
            <select onChange={(e)=> setSelectValue4(e.target.value)} value={selectValue4} className="form-select form-select-sm"
            style={{fontSize:'14px'}} 
            id="floatingSelectGrid">
                <option value="">أختر الرحلة</option>
                {trips.map(el =>{
                    return <option value={el.id}>{el.name}</option>
                })}
            </select>
        </div>

        {/* <div className='col-12 col-lg-2 col-md-2 col-sm-12'>
           <input 
            className="form-control" 
            type="date" 
            name="" 
            id=""
            style={{fontSize:'14px'}}
            onChange={(e)=>setCreate_at(e.target.value)}
            value={create_at} 
           />
        </div> */}
    </div>
        <div className="print-container mt-4">
            {
                selectValue == 3 && <div>
                    
                    <button className='btn btn-sm my-3 w-100 btn-warning' 
                        type='button'
                        style={{fontSize:'14px'}}
                        onClick={()=> handelReportBtn1()}
                    > طباعة السند <FontAwesomeIcon icon={faPrint} /> </button>

                    <div className="row"  ref={componentRef1}>
                        <div className="text-center"><p style={{fontSize:"20px",fontWeight:"bold",textDecoration:"underline"}}>أستلام مركبة</p></div>
                        <div className="col-5">
                            <div className='mb-2'>
                                <h3 style={{fontWeight:"bolder",fontSize:"20px",color:"#EF9523"}}>العتيقة في عالم النقل</h3>
                                <p className='m-0 p-0' style={{fontWeight:"bold", fontSize:"14px"}}>Antique in the world of transportation</p>
                                <h3 style={{fontWeight:"bolder",fontSize:"20px",color:"#EF9523"}}>والشحن السريع</h3>
                                <p className='m-0 p-0' style={{fontWeight:"bold", fontSize:"14px"}}>and express shipping</p>
                            </div>
                            <span className='' style={{fontSize:"16px"}}><b>من:</b> {data[0]?.name_from_office} </span>
                            <span className='mx-3' style={{fontSize:"16px"}}><b>الى:</b> {data[0]?.name_to_office} </span>

                        </div>
                        
                        <div className="col-2">
                            <img src={logo} className='img-fluid' width={"200px"} height={"200px"} alt="" />
                        </div>

                        <div className="col-5">
                        <div className='mt-2 p-2' style={{border:"solid 1px black",borderRadius:"15px"}}>
                            <p className=' m-0' style={{fontSize:"14px"}}><b> تاريخ السند :</b> {`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} </p>
                            <p className=' m-0' style={{fontSize:"14px"}}><b> رقم الرحلة :</b> {data[0]?.trip} </p>
                            <p className=' m-0' style={{fontSize:"14px"}}><b> الحالة :</b> {data[0]?.name_expulsion_status} </p>
                            <p className=' m-0' style={{fontSize:"14px"}}><b> أسم السائق :</b> {data[0]?.name_drive} </p>
                            
                        </div>
                        </div>

                        <div className="col-12">
                            <div className="table-responsive mt-4" style={{fontSize:"14px"}}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th scope="col">الرقم</th>
                                        <th scope="col">رقم الطرد</th>
                                        <th scope="col">المرسل</th>
                                        <th scope="col">رقم المرسل</th>
                                        <th scope="col">المستلم</th>
                                        <th scope="col">رقم المستلم</th>
                                        <th scope="col">المحتويات</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    { data.map((el,index)=>{

                                        return  <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{el.expulsion}</td>
                                        <td>{el.name_customer}</td>
                                        <td>{el.name_customer_phone_1}</td>
                                        <td>{el.name_recipient_name}</td>
                                        <td>{el.name_recipient_phone_1}</td>
                                        <td>{el.name_content}</td>
                                    </tr>
                                l

                                    })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-12">
                            <ul>
                                <li style={{fontSize:"17px"}}>انا السائق <b>{data[0]?.name_name_drive}</b> أستلمت من مكتب البريد المختص هذه البضائع،أتعهد أن أوصلها الى الجهه المحدده كاملة.</li>
                            </ul>
                        </div>
                        <div className="col-6 mt-3">
                            <p className=' m-0' style={{fontSize:"17px"}}><b> توقيع أمين المخزن :</b></p>

                        </div>
                        <div className="col-6 mt-3">
                            <p className=' m-0' style={{fontSize:"17px"}}><b> توقيع السائق :</b> </p>

                        </div>
                        <div className="col-12 mt-5">
                        <div className='p-2'  style={{border:"solid 1px black",borderRadius:"10px"}} >
                            <span className=' mx-1' style={{fontSize:"14px"}}><b>الإدارة العامة: </b>05491111 - 775311185 - 730444357</span>
                            <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب صنعاء: </b>775311162 - 730444369</span>
                            <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب المكلا: </b>775311139 - 730444325</span>
                            <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب سيئون: </b>775311132 - 730444320</span>
                        </div>

                        </div>

                    </div>
                </div>
            }

{
                selectValue == 4 && <div >
                    
                    <button className='btn btn-sm my-3 w-100 btn-warning' 
                        type='button'
                        style={{fontSize:'14px'}}
                        onClick={()=> handelReportBtn1()}
                    > طباعة السند <FontAwesomeIcon icon={faPrint} /> </button>

                    <div className="row" ref={componentRef1}>
                        <div className="text-center"><p style={{fontSize:"20px",fontWeight:"bold",textDecoration:"underline"}}>تسليم مركبة</p></div>
                        <div className="col-5">
                            <div className='mb-2'>
                                <h3 style={{fontWeight:"bolder",fontSize:"20px"}}>البريد المختص في عالم النقل</h3>
                                <p className='m-0 p-0' style={{fontWeight:"bold", fontSize:"14px"}}>AlMUKHTAS FOR TRANSPORT WORLD</p>
                                <p className='m-0 p-0' style={{fontWeight:"bold", fontSize:"14px"}}>لخدمات الشحن و النقل السريع </p>
                            </div>
                            <span className='' style={{fontSize:"16px"}}><b>من:</b> {data[0]?.name_from_office} </span>
                            <span className='mx-3' style={{fontSize:"16px"}}><b>الى:</b> {data[0]?.name_to_office} </span>

                        </div>
                        
                        <div className="col-2">
                            <img src={logo} className='img-fluid' width={"200px"} height={"200px"} alt="" />
                        </div>

                        <div className="col-5">
                        <div className='mt-2 p-2' style={{border:"solid 1px black",borderRadius:"15px"}}>
                            <p className=' m-0' style={{fontSize:"14px"}}><b> تاريخ السند :</b> {`${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`} </p>
                            <p className=' m-0' style={{fontSize:"14px"}}><b> رقم الرحلة :</b> {data[0]?.trip} </p>
                            <p className=' m-0' style={{fontSize:"14px"}}><b> الحالة :</b> {data[0]?.name_expulsion_status} </p>
                            <p className=' m-0' style={{fontSize:"14px"}}><b> أسم السائق :</b> {data[0]?.name_name_drive} </p>
                            
                        </div>
                        </div>

                        <div className="col-12">
                            <div className="table-responsive mt-4" style={{fontSize:"14px"}}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                        <th scope="col">الرقم</th>
                                        <th scope="col">رقم الطرد</th>
                                        <th scope="col">المرسل</th>
                                        <th scope="col">رقم المرسل</th>
                                        <th scope="col">المستلم</th>
                                        <th scope="col">رقم المستلم</th>
                                        <th scope="col">المحتويات</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                    { data.map((el,index)=>{

                                        return  <tr key={index}>
                                       <th scope="row">{index+1}</th>
                                        <td>{el.expulsion}</td>
                                        <td>{el.name_customer}</td>
                                        <td>{el.name_customer_phone_1}</td>
                                        <td>{el.name_recipient_name}</td>
                                        <td>{el.name_recipient_phone_1}</td>
                                        <td>{el.name_content}</td>
                                    </tr>
                                l

                                    })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-12">
                            <ul>
                                <li style={{fontSize:"17px"}}>انا السائق <b>{data[0]?.name_name_drive}</b> أستلمت من مكتب البريد المختص هذه البضائع،أتعهد أن أوصلها الى الجهه المحدده كاملة.</li>
                            </ul>
                        </div>
                        <div className="col-6 mt-3">
                            <p className=' m-0' style={{fontSize:"17px"}}><b> توقيع أمين المخزن :</b></p>

                        </div>
                        <div className="col-6 mt-3">
                            <p className=' m-0' style={{fontSize:"17px"}}><b> توقيع السائق :</b> </p>

                        </div>
                        <div className="col-12 mt-5">
                        <div className='p-2'  style={{border:"solid 1px black",borderRadius:"10px"}} >
                            <span className=' mx-1' style={{fontSize:"14px"}}><b>الإدارة العامة: </b>05491111 - 775311185 - 730444357</span>
                            <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب صنعاء: </b>775311162 - 730444369</span>
                            <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب المكلا: </b>775311139 - 730444325</span>
                            <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب سيئون: </b>775311132 - 730444320</span>
                        </div>

                        </div>

                    </div>
                </div>
            }
            
            
        </div>
    </div>
  )
}

export default Print__2