import * as Yup from "yup";
import formModel from "./formModel";
const {
  formField: {
    first_name,
    last_name,
    email,
    github,
    phone,
    physical_zipcode,
    mailing_zipcode,
    dob,
    gender_identity,
    gender_identity_self,
    race_ethnicity,
    race_ethnicity_self,
    low_income,
    emergency_contact_1_name,
    emergency_contact_1_relationship,
    emergency_contact_1_phone,
    emergency_contact_2_name,
    emergency_contact_2_relationship,
    emergency_contact_2_phone,
    work_commitment_consent,
    leave_notice_consent,
  },
} = formModel;

export default [
  Yup.object().shape({
    [first_name.name]: Yup.string().required(`${first_name.requiredErrorMsg}`),
    [last_name.name]: Yup.string().required(`${last_name.requiredErrorMsg}`),
    [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
    [github.name]: Yup.string().required(`${github.requiredErrorMsg}`),
    [phone.name]: Yup.string()
      .required(`${phone.requiredErrorMsg}`)
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "Must be at least 10 digits"),
  }),
  Yup.object().shape({
    [physical_zipcode.name]: Yup.string()
      .required(`${physical_zipcode.requiredErrorMsg}`)
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(5, "Must be exactly 5 digits")
      .max(5, "Must be exactly 5 digits"),
  }),
  Yup.object().shape({
    [dob.name]: Yup.string()
      .nullable()
      .required(`${dob.requiredErrorMsg}`)
      .max(
        new Date(Date.now() - 567648000000),
        "You must be at least 18 years"
      ),
    [gender_identity.name]: Yup.array()
      .min(1, `${gender_identity.requiredErrorMsg}`)
      .nullable(),
    [race_ethnicity.name]: Yup.string().required(
      `${race_ethnicity.requiredErrorMsg}`
    ),
    [low_income.name]: Yup.string().required(`${low_income.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [emergency_contact_1_name.name]: Yup.string().required(
      `${emergency_contact_1_name.requiredErrorMsg}`
    ),
    [emergency_contact_1_relationship.name]: Yup.string().required(
      `${emergency_contact_1_relationship.requiredErrorMsg}`
    ),
    [emergency_contact_1_phone.name]: Yup.string()
      .required(`${emergency_contact_1_phone.requiredErrorMsg}`)
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "Must be at least 10 digits"),
    [emergency_contact_2_name.name]: Yup.string().required(
      `${emergency_contact_2_name.requiredErrorMsg}`
    ),
    [emergency_contact_2_relationship.name]: Yup.string().required(
      `${emergency_contact_2_relationship.requiredErrorMsg}`
    ),
    [emergency_contact_2_phone.name]: Yup.string()
      .required(`${emergency_contact_2_phone.requiredErrorMsg}`)
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "Must be at least 10 digits"),
  }),
  Yup.object().shape({
    [work_commitment_consent.name]: Yup.boolean().oneOf(
      [true],
      `${work_commitment_consent.requiredErrorMsg}`
    ),
    [leave_notice_consent.name]: Yup.boolean().oneOf(
      [true],
      `${leave_notice_consent.requiredErrorMsg}`
    ),
  }),
];
