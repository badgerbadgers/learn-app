export default {
  formId: "acceptanceForm",
  formField: {
    firstName: {
      name: "personal_first_name",
      label: "First name*",
      requiredErrorMsg: "First name is required",
    },
    lastName: {
      name: "personal_last_name",
      label: "Last name*",
      requiredErrorMsg: "Last name is required",
    },
    email: {
      name: "personal_email",
      label: "Email*",
      requiredErrorMsg: "Email is required",
    },
    gitHub: {
      name: "personal_github",
      label: "GitHub username*",
      requiredErrorMsg: "GitHub username is required",
    },
    phone: {
      name: "personal_phone",
      label: "Phone*",
      requiredErrorMsg: "Phone is required",
    },
    USResident: {
      name: "address_USResident",
      label: "US/US territory resident",
    },
    physicalZipcode: {
      name: "address_physical_zipcode",
      label: "ZIP code*",
      requiredErrorMsg: "ZIP code is required",
    },
    physicalAddress1: {
      name: "address_physical_street1",
      label: "Street address",
    },
    physicalAddress2: {
      name: "address_physical_street2",
      label: "Apt/Unit/Suite #",
    },
    physicalCity: {
      name: "address_physical_city",
      label: "City",
    },
    physicalState: {
      name: "address_physical_state",
      label: "State/Province",
    },
    physicalCountry: {
      name: "address_physical_country",
      label: "Country",
    },
    mailingSame: {
      name: "address_mailing_same",
      label: "Same as physical address",
    },
    mailingZipcode: {
      name: "address_mailing_zipcode",
      label: "ZIP code",
      requiredErrorMsg: "ZIP code is required",
    },
    mailingAddress1: {
      name: "address_mailing_street1",
      label: "Street address",
    },
    mailingAddress2: {
      name: "address_mailing_street2",
      label: "Apt/Unit/Suite #",
    },
    mailingCity: {
      name: "address_mailing_city",
      label: "City",
    },
    mailingState: {
      name: "address_mailing_state",
      label: "State/Province",
    },
    mailingCountry: {
      name: "address_mailing_country",
      label: "Country",
    },
    dob: {
      name: "demographics_dob",
      label: "Date of birth*",
      requiredErrorMsg: "Date of birth is required",
    },
    pronouns: {
      name: "demographics_pronouns",
      label: "Pronouns",
    },
    genderIdentity: {
      name: "demographics_gender_identity",
      label: "Gender identity*",
      requiredErrorMsg: "Gender identity is required",
    },
    genderIdentitySelf: {
      name: "demographics_gender_identity_self",
      label: "Gender identity (self described)",
      requiredErrorMsg: "Gender identity is required",
    },
    raceEthnicity: {
      name: "demographics_race_ethnicity",
      label: "Race/Ethnicity*",
      requiredErrorMsg: "Race/Ethnicity is required",
    },
    raceEthnicitySelf: {
      name: "demographics_race_ethnicity_self",
      label: "Race/Ethnicity (self described)",
      requiredErrorMsg: "Race/Ethnicity is required",
    },
    education: {
      name: "demographics_education",
      label: "Education",
    },
    spokenLanguages: {
      name: "demographics_spoken_languages",
      label: "Spoken languages",
    },
    employed: {
      name: "demographics_employed",
      label: "Employed",
    },
    inSchool: {
      name: "demographics_in_school",
      label: "In school",
    },
    lowIncome: {
      name: "demographics_low_income",
      label: "Low income",
      requiredErrorMsg: "Please select the answer",
    },
    emergencyContact1Name: {
      name: "emergency_contact1_name",
      label: "Full name*",
      requiredErrorMsg: "Full name is required",
    },
    emergencyContact1Relationship: {
      name: "emergency_contact1_relationship",
      label: "Relationship*",
      requiredErrorMsg: "Relationship is required",
    },
    emergencyContact1Phone: {
      name: "emergency_contact1_phone",
      label: "Phone*",
      requiredErrorMsg: "Phone is required",
    },
    emergencyContact2Name: {
      name: "emergency_contact2_name",
      label: "Full name*",
      requiredErrorMsg: "Full name is required",
    },
    emergencyContact2Relationship: {
      name: "emergency_contact2_relationship",
      label: "Relationship*",
      requiredErrorMsg: "Relationship is required",
    },
    emergencyContact2Phone: {
      name: "emergency_contact2_phone",
      label: "Phone*",
      requiredErrorMsg: "Phone is required",
    },
    learningStyle: {
      name: "background_learning_style",
      label: "Learning style",
    },
    priorCodingEducation: {
      name: "background_prior_coding_education",
      label: "Prior coding education",
    },
    priorCodingLanguages: {
      name: "background_prior_coding_languages",
      label: "Prior coding languages",
    },
    workCommitmentConsent: {
      name: "consent_work_commitment",
      label:
        "I agree that I am accepting my seat in a class I was offered and understand that the work commitment for each class is expected to be about 15-20 hours per week.",
      requiredErrorMsg: "You must accept the terms and conditions",
    },
    leaveNoticeConsent: {
      name: "consent_leave_notice",
      label:
        "I commit to trying my best throughout the course and agree to contact Code the Dream if I can no longer participate in this class so I can be made aware of future opportunities available.",
      requiredErrorMsg: "You must accept the terms and conditions",
    },
  },
};
