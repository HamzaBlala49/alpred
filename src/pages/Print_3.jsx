import axios from "axios";
import { React, useEffect, useState ,useRef} from "react";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { bisUrl } from "../context/biseUrl";
import { faSearch,faPrint, faRefresh, faBusAlt, faHandBackFist, faHand, faHandFist, faHandDots, faHandHoldingHand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logo } from "../assets/image";
import { useReactToPrint } from 'react-to-print';

function Print_3() {
    const [beforeData,setBeforeData] = useState([]);
    const [data,setData] = useState([]);
    const date = new Date();
    let {Id} = useParams();
    let navigate = useNavigate()
    const componentRef = useRef();
    let [transformationList,setTransformationList] = useState([]);
    let [isTransformation,setIsTransformation] = useState(false)


    const authHeader = useAuthHeader()
    const config = {
    headers: { 'Authorization': authHeader() }
    };
    let isauth = useIsAuthenticated();

    useEffect(() => {
        if(isauth()){
            axios.get(`${bisUrl}/office/trips/records?trip=${Id}`,config).then((res)=>{

                setBeforeData(res.data)
              }).catch((e)=>{
                console.log(e)
                alert("حدث خطأ أثناء عملية الأضافة")
              })
        }

    }, []);

    useEffect(()=>{
        if(isauth()){
            axios.get(`${bisUrl}/office/trips/records?trip=${Id}`,config).then((res)=>{
                setBeforeData(res.data)
              }).catch((e)=>{
                console.log(e)
                alert("حدث خطأ أثناء عملية الأضافة")
              })
        }
    },[isTransformation])

    useEffect(() => {
        let beforeList = beforeData;
        beforeList.forEach(el => {
            el.isChecked = false
        })

        setData([...beforeList])
    }, [beforeData])
    


    const handlePrint = useReactToPrint({
        content:()=> componentRef.current,
        documentTitle:`سند أستلام مركبة`,
        pageStyle:`@media print {
            @page {
              direction: rtl;
            }
          }`,
        //   onAfterPrint: ()=> navigate("/expulsion")
    })

    let handelReportBtn = ()=> handlePrint()


    let handelCheck =(e,el)=>{
        let list  = transformationList;
        if(e.target.checked){
            el.isChecked = true;
            list.push(el)
        }else{
            el.isChecked = false;
            let index = list.indexOf(el)
            list.splice(index,1);
        }
    
        setTransformationList([...list])
    }

    let handelCheckAll = (e) =>{
        if(e.target.checked){
            let _data = data;
            _data.forEach(el => {
                el.isChecked = true;
            })
            setData([..._data]);

            setTransformationList(data);
        }else{
            let _data = data;
            _data.forEach(el => {
                el.isChecked = false;
            })
            setData([..._data]);

            setTransformationList([]);
        }

    }

    let handelTransformation = ()=>{
        console.log("sdk")
        if(isauth()){
            axios.post(`${bisUrl}/office/trips/records?trip=${Id}`,{"records":transformationList,"expulsion_status":4},config).then((res)=>{
                setIsTransformation(!isTransformation)
              }).catch((e)=>{
                console.log(e)
                alert("حدث خطأ أثناء عملية الأضافة")
              })
        }
    }


  return (
            <div>
                    <div className="row">
                        <div className="col-2 mt-3">
                            <Link to={'/trip'} className="btn btn-outline-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">رجوع</Link>
                        </div>

                        <div className="col-5">
                            <button className='btn btn-sm my-3 w-100 btn-info' 
                            type='button'
                            style={{fontSize:'14px'}}
                            onClick={()=> handelTransformation()}
                            >  ترحيل تسليم مركبة <FontAwesomeIcon icon={faHandHoldingHand} /> </button>
                        </div>

                        <div className="col-5">
                            <button className='btn btn-sm my-3 w-100 btn-warning' 
                            type='button'
                            style={{fontSize:'14px'}}
                            onClick={()=> handelReportBtn()}
                            > طباعة السند <FontAwesomeIcon icon={faPrint} /> </button>
                        </div>



                    </div>
                    
                    

                    <div className="row" ref={componentRef}>
                        <div className="text-center"><p style={{fontSize:"20px",fontWeight:"bold",textDecoration:"underline"}}>أستلام مركبة</p></div>
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
                            <p className=' m-0' style={{fontSize:"14px"}}><b> تاريخ السند :</b> {`${ date.getDate() }/${date.getMonth() + 1}/${date.getFullYear()}`} </p>
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
                                        <th scope="col">الكل<input class="form-check-input" onChange={(e)=> handelCheckAll(e)} type="checkbox" value="" id=""/></th>
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
                                        <th scope="row"><input class="form-check-input" checked={el.isChecked} onChange={(e)=> handelCheck(e,el)}  type="checkbox" aria-label="Text for screen reader"/></th>
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
  )
}

export default Print_3