import * as yup from "yup";

const officeSchema = yup.object().shape({
    name:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").max(200,"يجب أن يكون أقل من 25 حرفاً").required("هذا الحقل مطلوب"),
    phone:yup.string().matches(/^[0-9]+$/,"يجب أن يكون رقماً").test("len" ," يجب أن يكون 9 ارقام أو 8 ارقام اذا كان رقم هاتف ادخل مفتاح المحافظة ", val => val.toString().length === 9 || val.toString().length === 8  ).required("هذا الحقل مطلوب"),
})

const storeSchema = yup.object().shape({
    name:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").max(200,"يجب أن يكون أقل من 25 حرفاً").required("هذا الحقل مطلوب"),
    number:yup.number().positive("رقم المخزن يجب ان يكون  أكبر من 0").required("هذا الحقل مطلوب"),
})

const financeSchema = yup.object().shape({
    price:yup.number().positive("السعر يجب أن يكون موجباً").required("هذا الحقل مطلوب"),
    nots:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").max(200,"يجب أن يكون أقل من 200 حرفاً"),
    type_accoun:yup.string(),
    type_currency:yup.string(),
})

// مشكلة
const customerSchema = yup.object().shape({

    name:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").max(200,"يجب أن يكون أقل من 25 حرفاً").required("هذا الحقل مطلوب"),
    phone_1:yup.string().matches(/^[0-9]+$/,"يجب أن يكون رقماً").test("len" ," يجب أن يكون 9 ارقام أو 8 ارقام اذا كان رقم هاتف ادخل مفتاح المحافظة ", val => val.toString().length === 9 || val.toString().length === 8  ).required("هذا الحقل مطلوب"),
    number_doc:yup.number().typeError("يجب أن يكون رقماً").required("هذا الحقل مطلوب"),
    phone_2:yup.string().matches(/^[0-9]+$/,"يجب أن يكون رقماً").test("len" ," يجب أن يكون 9 ارقام أو 8 ارقام اذا كان رقم هاتف ادخل مفتاح المحافظة ", val => val.toString().length === 9 || val.toString().length === 8  ).required("هذا الحقل مطلوب"),


})


const expulsionSchema = yup.object().shape({
    content_ponts:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").required("هذا الحقل مطلوب"),
    content:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").required("هذا الحقل مطلوب"),
    recipient_phone_1:yup.string().matches(/^[0-9]+$/,"يجب أن يكون رقماً").test("len" ," يجب أن يكون 9 ارقام أو 8 ارقام اذا كان رقم هاتف ادخل مفتاح المحافظة ", val => val.toString().length === 9 || val.toString().length === 8  ).required("هذا الحقل مطلوب"),
    recipient_phone_2:yup.string().matches(/^[0-9]+$/,"يجب أن يكون رقماً").test("len" ," يجب أن يكون 9 ارقام أو 8 ارقام اذا كان رقم هاتف ادخل مفتاح المحافظة ", val => val.toString().length === 9 || val.toString().length === 8  ).required("هذا الحقل مطلوب"),
    recipient_name:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").max(200,"يجب أن يكون أقل من 25 حرفاً").required("هذا الحقل مطلوب"),
    price:yup.string().matches(/^[0-9]+$/,"يجب أن يكون رقماً").required("هذا الحقل مطلوب"),
})


const tripSchema = yup.object().shape({
    name:yup.string().min(3,"يجب أن يكون الأدخال أكثر من 3 حروف").required("هذا الحقل مطلوب"),
})

const typeVehicleSchema = yup.object().shape({
    name:yup.string().required("هذا الحقل مطلوب"),
})

const driverSchema = yup.object().shape({
    name:yup.string().required("هذا الحقل مطلوب"),
    ind:yup.string().required("هذا الحقل مطلوب"),
})

const vehicleSchema = yup.object().shape({
    name:yup.string().required("هذا الحقل مطلوب"),
    color:yup.string().required("هذا الحقل مطلوب"),
    car_number:yup.string().required("هذا الحقل مطلوب"),
})

const provinecSchema = yup.object().shape({
    name:yup.string().required("هذا الحقل مطلوب"),
    numder:yup.number().positive("الرقم المدخل يجب أن يكون موجب").required("هذا الحقل مطلوب"),
   
})

const directorateSchema = yup.object().shape({
    name:yup.string().required("هذا الحقل مطلوب"),
})





const loginSchema = yup.object().shape({
    username:yup.string().required("أسم المستخدم مطلوب"),
    password:yup.string().required("كلمة المرور مطلوبة"),
})

const passwordRegex =/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

const changePasswordSchema = yup.object().shape({
    // old_password:yup.string().required("الحقل مطلوب"),
    new_password1:yup.string().min(8,"كلمة السر قصيره").matches(passwordRegex," لا يمكن أن تكون كلمة المرور الخاصة بك رقمية بالكامل أو نصية").required("الحقل مطلوب"),
    new_password2: yup.string().oneOf([yup.ref('new_password1',"")],"يجب أن تتطابق مع كلمة السر الجديدة").required("الحقل مطلوب")
})



export {
    officeSchema,
    storeSchema,
    financeSchema,
    loginSchema,
    customerSchema,
    expulsionSchema,
    tripSchema,
    typeVehicleSchema,
    driverSchema,
    vehicleSchema,
    provinecSchema,
    directorateSchema,
    changePasswordSchema
}