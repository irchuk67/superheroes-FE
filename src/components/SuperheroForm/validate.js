import * as Yup from "yup";

const validationSchema = Yup.object({
    nickname: Yup.string().required('Required'),
    real_name: Yup.string().required('Required'),
    origin_description: Yup.string().required('Required'),
    superpowers: Yup.array().min(1, "At least 1").required('Required'),
    catch_phrase: Yup.string().required('Required'),
    images: Yup.array().min(1, "At least 1").required('Required')
})

export default validationSchema;