import React, { createContext, useReducer } from "react";

const initialState = {
  userInfoData: {
    last_name: "",
    first_name: "",
    email: "",
    gitHub: "",
    phone: "",
    US_resident: "",
    physical_zipcode: "",
    physical_address_1: "",
    physical_address_2: "",
    physical_city: "",
    physical_state: "",
    physical_country: "",
    mailing_same: false,
    mailing_zipcode: "",
    mailing_address_1: "",
    mailing_address_2: "",
    mailing_city: "",
    mailing_state: "",
    mailing_country: "",
    dob: "",
    pronouns: "",
    gender_identity: [],
    gender_identity_self: "",
    race_ethnicity: "",
    race_ethnicity_self: "",
    education: "",
    spoken_languages: "",
    employed: "",
    in_school: "",
    low_income: "",
    emergency_contact_1_name: "",
    emergency_contact_1_relationship: "",
    emergency_contact_1_phone: "",
    emergency_contact_2_name: "",
    emergency_contact_2_relationship: "",
    emergency_contact_2_phone: "",
    learning_style: [],
    prior_coding_education: "",
    prior_coding_languages: [],
  },
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "UPDATE_PERSONAL_DETAILS":
        return { ...state, userInfoData: action.payload };
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
