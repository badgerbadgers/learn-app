import * as Yup from "yup";
import formModel from "./formModel";
const {
  formField: {
    firstName,
    lastName,
    email,
    gitHub,
    phone,
    physicalZipcode,
    dob,
    genderIdentity,
    genderIdentitySelf,
    raceEthnicity,
    raceEthnicitySelf,
    lowIncome,
    emergencyContact1Name,
    emergencyContact1Relationship,
    emergencyContact1Phone,
    emergencyContact2Name,
    emergencyContact2Relationship,
    emergencyContact2Phone,
    workCommitmentConsent,
    leaveNoticeConsent,
  },
} = formModel;

export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().required(`${lastName.requiredErrorMsg}`),
    [email.name]: Yup.string().email().required(`${email.requiredErrorMsg}`),
    [gitHub.name]: Yup.string().required(`${gitHub.requiredErrorMsg}`),
    [phone.name]: Yup.string()
      .required(`${phone.requiredErrorMsg}`)
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "Must be at least 10 digits"),
  }),

  Yup.object().shape({
    [physicalZipcode.name]: Yup.string().required(
      `${physicalZipcode.requiredErrorMsg}`
    ),
  }),

  Yup.object().shape({
    [dob.name]: Yup.date()
      .nullable()
      .required(`${dob.requiredErrorMsg}`)
      .test("age", "You must be 18 or older", function (birthdate) {
        const cutoff = new Date();
        cutoff.setFullYear(cutoff.getFullYear() - 18);
        return birthdate <= cutoff;
      }),
    [genderIdentity.name]: Yup.array()
      .min(1, `${genderIdentity.requiredErrorMsg}`)
      .nullable(),
    [genderIdentitySelf.name]: Yup.string().when(
      genderIdentity.name,
      (genderIdentity) => {
        return genderIdentity.includes("Other")
          ? Yup.string().required(`${genderIdentitySelf.requiredErrorMsg}`)
          : undefined;
      }
    ),
    [raceEthnicity.name]: Yup.string().required(
      `${raceEthnicity.requiredErrorMsg}`
    ),
    [raceEthnicitySelf.name]: Yup.string().when(raceEthnicity.name, {
      is: "Other",
      then: Yup.string().required(`${raceEthnicitySelf.requiredErrorMsg}`),
    }),
    [lowIncome.name]: Yup.string().required(`${lowIncome.requiredErrorMsg}`),
  }),

  Yup.object().shape({
    [emergencyContact1Name.name]: Yup.string().required(
      `${emergencyContact1Name.requiredErrorMsg}`
    ),
    [emergencyContact1Relationship.name]: Yup.string().required(
      `${emergencyContact1Relationship.requiredErrorMsg}`
    ),
    [emergencyContact1Phone.name]: Yup.string()
      .required(`${emergencyContact1Phone.requiredErrorMsg}`)
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "Must be at least 10 digits"),
    [emergencyContact2Name.name]: Yup.string().required(
      `${emergencyContact2Name.requiredErrorMsg}`
    ),
    [emergencyContact2Relationship.name]: Yup.string().required(
      `${emergencyContact2Relationship.requiredErrorMsg}`
    ),
    [emergencyContact2Phone.name]: Yup.string()
      .required(`${emergencyContact2Phone.requiredErrorMsg}`)
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(10, "Must be at least 10 digits"),
  }),

  Yup.object().shape({
    [workCommitmentConsent.name]: Yup.boolean().oneOf(
      [true],
      `${workCommitmentConsent.requiredErrorMsg}`
    ),
    [leaveNoticeConsent.name]: Yup.boolean().oneOf(
      [true],
      `${leaveNoticeConsent.requiredErrorMsg}`
    ),
  }),
];
