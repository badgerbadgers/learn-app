import { CastForEducation } from "@mui/icons-material";
import { LibraryAddCheck } from "@mui/icons-material";

//css styles for small icons inside the cards
const iconStyle = {
  fontSize: "38px",
  position: "relative",
  top: "8px",
};
//css styles for cards inside knowledgebase section
const cardStyles = {
  minWidth: 280,
  padding: "16px",
  minHeight: 275,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

//all info about cards to be rendered on dashboard page inside one object
//to add a new card follow the same pattern (add an object with title, text, icon and href)
const dashBoardInfo = [
  {
    title: "CTD Internal Links and resources",
    text: "Find a checklist that every new Apprentice should go through and important links at one place.",
    icon: <LibraryAddCheck color="primary" style={iconStyle} />,
    href: "/checklistandlinks",
  },
  {
    title: "Resources",
    text: "Student Resources.",
    icon: <CastForEducation color="primary" style={iconStyle} />,
    href: "/knowledge-base/resources",
  }
];
export { dashBoardInfo, cardStyles };
