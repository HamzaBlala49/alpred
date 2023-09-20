import { faPrint } from '@fortawesome/free-solid-svg-icons'
import  {useState,useEffect ,useRef} from 'react'
import { useNavigate, useParams } from 'react-router';
import { useReactToPrint } from 'react-to-print';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logo } from '../assets/image';
import axios from 'axios';
import { bisUrl } from '../context/biseUrl';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';
function Print_1() {
    let navigate = useNavigate()
    let {id} = useParams()
    const [element,setElement]=useState([]);
    const componentRef = useRef();
    const date = new Date();


    const authHeader = useAuthHeader()
    const config = {
      headers: { 'Authorization': authHeader() }
    };
    let isauth = useIsAuthenticated();

    useEffect(()=>{

        if(isauth()){
    
          axios.get(`${bisUrl}/office/expulsions/${id}/`,config).then(res=>{
            setElement(res.data);
          }).catch(e=>{
            alert("حصل مشكلة في تحميل البيانات تأكد من الاتصال بالشبكة")
          })
        }
      
    },[]);


    const handlePrint = useReactToPrint({
        content:()=> componentRef.current,
        documentTitle:`سند أستلام مكتب (${element.id})`,
        pageStyle:`@media print {
            @page {
              direction: rtl;
            }
          }`,
          onAfterPrint: ()=> history.back()
    })

    let handelReportBtn = ()=> handlePrint()


  return (
    <div>
        <div className='row my-3'>
        <div className='col-12 col-lg-1 col-md-3 col-sm-12'>
            <Link onClick={()=> history.back()} className="btn btn-outline-dark btn-sm w-100" style={{fontSize:'14px'}} role="button">رجوع</Link>
        </div>

        <div className='col-12 col-lg-4 col-md-2 col-sm-12'>
          <button className='btn btn-sm  w-100 btn-warning' 
          type='button'
          style={{fontSize:'14px'}}
          onClick={()=> handelReportBtn()}
          > طباعة السند <FontAwesomeIcon icon={faPrint} /> </button>
        </div>

        </div>
        <div className='print'   ref={componentRef}>
        <div className='row g-1' >
        <div className='col-8'>
          <div className='row'>
            <div className='col-7'>
              <div className='mb-2'>
                <h3 style={{fontWeight:"bolder",fontSize:"20px"}}>البريد المختص في عالم النقل</h3>
                <p className='m-0 p-0' style={{fontWeight:"bold", fontSize:"14px"}}>AlMUKHTAS FOR TRANSPORT WORLD</p>
                <p className='m-0 p-0' style={{fontWeight:"bold", fontSize:"14px"}}>لخدمات الشحن و النقل السريع </p>
              </div>
              <span className='' style={{fontSize:"16px"}}><b>من:</b> {element.name_from_office} </span>
              <span className='mx-3' style={{fontSize:"16px"}}><b>الى:</b> {element.name_to_office} </span>

            </div>
            <div className='col-5 m-0 p-0'>
              <img src={logo} className='img-fluid' width={"180px"} height={"180px"} alt="" />
            </div>
            <div className='col-12'>
              <div className='mt-2 p-2' style={{border:"solid 1px black",borderRadius:"15px"}}>
              <p className=' m-0' style={{fontSize:"14px"}}><b>أسم المرسل :</b> {element.name_customer} </p>
              <p className='m-0' style={{fontSize:"14px"}}><b>أسم المستلم :</b> {element.recipient_name} </p>
              <p className='m-0' style={{fontSize:"14px"}}><b>العنوان :</b> {element.name_to_city} </p>
              <p className='m-0' style={{fontSize:"14px"}}><b>التلفون 1:</b> {element.recipient_phone_1} </p>
              <p className='m-0' style={{fontSize:"14px"}}><b>التلفون 2:</b> {element.recipient_phone_2 || "لايوجد"} </p>

              </div>
              <div className='mt-1'>
                <ul>
                  <li style={{fontSize:"14px"}}>نحن غير مسؤولين عن الإجراءات الأمنية الخارجة عن إرادتنا.</li>
                  <li style={{fontSize:"14px"}}>نحن غير مسؤولين عن الأغراض الثمينة الممنوع إرسالها في الطرود.</li>
                  <li style={{fontSize:"14px"}}>نحن غير مسؤولين عن بقاء الطرود لأكثر من شهر.</li>
                </ul>
              </div>
              </div>
          </div>

        </div>
        <div className='col-4' style={{border:"solid 1px black",borderRadius:"10px"}}>
            <div  className='p-2'>
            <p className='' style={{fontSize:"14px"}}><b>المستخدم: </b>{element.name_user}</p>
            <p className='' style={{fontSize:"14px"}}><b>رقم السند :</b>{element.id}</p>
            <p className='' style={{fontSize:"14px"}}><b>التاربخ:</b> {`${ date.getDate() }/${date.getMonth() + 1}/${date.getFullYear()}`}  </p>
            <p className='' style={{fontSize:"14px"}}><b>أجرة النقل:</b> {element.price}  </p>
            <p className='' style={{fontSize:"14px"}}><b>نوع العملة :</b>{element.name_type_currency}</p>
            <p className='' style={{fontSize:"14px"}}><b>نوع الدفع :</b>{element.name_type_price}</p>
            <p className='' style={{fontSize:"14px"}}><b>الأهمية :</b> {element.precious ? "ثمين" : "غير ثمين"} </p>
            <p className='' style={{fontSize:"14px"}}><b>المحتويات:</b>{element.content}</p>

            </div>

        </div>

          <div className='col-12 text-center'>
            <div className='p-2'  style={{border:"solid 1px black",borderRadius:"10px"}} >
              <span className=' mx-1' style={{fontSize:"14px"}}><b>الإدارة العامة: </b>05491111 - 775311185 - 730444357</span>
              <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب صنعاء: </b>775311162 - 730444369</span>
              <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب المكلا: </b>775311139 - 730444325</span>
              <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب سيئون: </b>775311132 - 730444320</span>

            </div>
          </div>
        </div>

        <div className='row g-1 mt-5' >
        <div className='col-8'>
          <div className='row'>
            <div className='col-7'>
              <div className='mb-2'>
                <h3 style={{fontWeight:"bolder",fontSize:"20px"}}>البريد المختص في عالم النقل</h3>
                <p className='m-0 p-0' style={{fontWeight:"bold", fontSize:"14px"}}>AlMUKHTAS FOR TRANSPORT WORLD</p>
                <p className='m-0 p-0' style={{fontWeight:"bold", fontSize:"14px"}}>لخدمات الشحن و النقل السريع </p>
              </div>
              <span className='' style={{fontSize:"16px"}}><b>من:</b> {element.name_from_office} </span>
              <span className='mx-3' style={{fontSize:"16px"}}><b>الى:</b> {element.name_to_office} </span>

            </div>
            <div className='col-5 m-0 p-0'>
              <img src={logo} className='img-fluid' width={"180px"} height={"180px"} alt="" />
            </div>
            <div className='col-12'>
              <div className='mt-2 p-2' style={{border:"solid 1px black",borderRadius:"15px"}}>
              <p className=' m-0' style={{fontSize:"14px"}}><b>أسم المرسل :</b> {element.name_customer} </p>
              <p className='m-0' style={{fontSize:"14px"}}><b>أسم المستلم :</b> {element.recipient_name} </p>
              <p className='m-0' style={{fontSize:"14px"}}><b>العنوان :</b> {element.name_to_city} </p>
              <p className='m-0' style={{fontSize:"14px"}}><b>التلفون 1:</b> {element.recipient_phone_1} </p>
              <p className='m-0' style={{fontSize:"14px"}}><b>التلفون 2:</b> {element.recipient_phone_2 || "لايوجد"} </p>

              </div>
              <div className='mt-1'>
                <ul>
                  <li style={{fontSize:"14px"}}>نحن غير مسؤولين عن الإجراءات الأمنية الخارجة عن إرادتنا.</li>
                  <li style={{fontSize:"14px"}}>نحن غير مسؤولين عن الأغراض الثمينة الممنوع إرسالها في الطرود.</li>
                  <li style={{fontSize:"14px"}}>نحن غير مسؤولين عن بقاء الطرود لأكثر من شهر.</li>
                </ul>
              </div>
              </div>
          </div>

        </div>
        <div className='col-4' style={{border:"solid 1px black",borderRadius:"10px"}}>
            <div  className='p-2'>
            <p className='' style={{fontSize:"14px"}}><b>المستخدم: </b>{element.name_user}</p>
            <p className='' style={{fontSize:"14px"}}><b>رقم السند :</b>{element.id}</p>
            <p className='' style={{fontSize:"14px"}}><b>التاربخ:</b> {`${ date.getDate() }/${date.getMonth() + 1}/${date.getFullYear()}`}  </p>
            <p className='' style={{fontSize:"14px"}}><b>نوع العملة :</b>{element.name_type_currency}</p>
            <p className='' style={{fontSize:"14px"}}><b>نوع الدفع :</b>{element.name_type_price}</p>
            <p className='' style={{fontSize:"14px"}}><b>الأهمية :</b> {element.precious ? "ثمين" : "غير ثمين"} </p>
            <p className='' style={{fontSize:"14px"}}><b>المحتويات:</b>{element.content}</p>

            </div>

        </div>

          <div className='col-12 text-center'>
            <div className='p-2'  style={{border:"solid 1px black",borderRadius:"10px"}} >
              <span className=' mx-1' style={{fontSize:"14px"}}><b>الإدارة العامة: </b>05491111 - 775311185 - 730444357</span>
              <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب صنعاء: </b>775311162 - 730444369</span>
              <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب المكلا: </b>775311139 - 730444325</span>
              <span className=' mx-1' style={{fontSize:"14px"}}><b>مكتب سيئون: </b>775311132 - 730444320</span>

            </div>
          </div>
        </div>

          

        </div>
      

    </div>
  )
}

export default Print_1