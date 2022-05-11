import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Checkbox,
  FormControlLabel,
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import DOMPurify from "isomorphic-dompurify";
import { useState, useEffect } from "react";

const checkItemsInfo = [
  {
    label:
      "Track your hours every day: <a href='https://clockify.me/' target=_blank >Clockify</a>",
    name: "Clockify",
    checked: false,
  },
  {
    label:
      "Request time off using <a href='https://www.hrvey.com/requests/new' target=_blank>Hrvey</a>",
    name: "Hrvey",
    checked: false,
  },
  {
    label:
      "Calendars - Make sure you are subscribed to the Google Calendars for your team",
    name: "Calendars",
    checked: false,
  },
  {
    label:
      "Tech Stipend: <a href='https://docs.google.com/document/d/1IBj-5i_p7uEGZoe-BBUfwyGsggEok39VGik_uunWHro/edit' target=_blank> Tech Stipend Policy</a> // <a href='https://docs.google.com/forms/d/e/1FAIpQLSeEJOAWCmqQy2syuUw4RHphSX01KgtNmrGHbVvn7DIquOyFeg/viewform' target=_blank>Tech Stipend Request Form</a>",
    name: "Tech Stipend",
    checked: false,
  },
  {
    label:
      "Buying a new computer? <a href='https://docs.google.com/document/d/1ZMXFrzyrIDTTQOvR4rMK7t9NUnQwa7VKANhFqSCtMVc/edit' target=_blank>Here are the specs you should look for</a>.",
    name: "Computer",
    checked: false,
  },
];

const CheckListCard = () => {
  const [checkListItems, setCheckListItems] = useState(checkItemsInfo);
  const sanitize = DOMPurify.sanitize;

  useEffect(() => {
    const checklistfromstorage = localStorage.getItem("checklist"); //retrive data from local storage if exists

    if (checklistfromstorage) {
      setCheckListItems(JSON.parse(checklistfromstorage));
    } else {
      setCheckListItems(checkItemsInfo); //if no data in localstorage initiate the state with initial value
      localStorage.setItem("checklist", JSON.stringify(checkListItems)); //and save to local storage
    }
  }, []);

  const handleCheckboxChange = (e) => {
    let updatedCheckList = checkListItems.map((item) => {
      if (item.name === e.target.name) {
        item.checked = !item.checked;
      }
      return item;
    });

    setCheckListItems(updatedCheckList);
    localStorage.setItem("checklist", JSON.stringify(updatedCheckList));
  };

  return (
    <Grid item xs={12} md={6} pb={1} mt={-1}>
      <Card
        sx={{
          height: "100%",
          width: "100%",
          position: "relative",
          margin: "0 auto",
          backgroundColor: "background.ctdcard",
        }}
      >
        <CardHeader
          action={<CheckCircleOutlineIcon />}
          title="Check list for new Apprentices"
          sx={{
            minHeight: "80px",
            backgroundColor: "secondary.main",
            opacity: 0.9,
            color: "primary.contrastText",
          }}
        ></CardHeader>
        <CardContent sx={{ px: 0 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              ml: 3,
              textAlign: "left",
            }}
          >
            {checkListItems &&
              checkListItems.map((item) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={item.name}
                      checked={item.checked}
                      onChange={(e) => handleCheckboxChange(e)}
                    />
                  }
                  key={item.name}
                  label={
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitize(item.label),
                      }}
                    ></div>
                  }
                />
              ))}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CheckListCard;
