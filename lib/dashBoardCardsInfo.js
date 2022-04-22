import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";

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
    title: "Skills Zones",
    text: "CTD Labs skills and zones rubric used for apprentice evaluations.",
    icon: <TrackChangesIcon color="primary" style={iconStyle} />,
    href: "/knowledge-base/zones",
  },
  {
    title: "Pair Programming",
    text: "Information and process about how CTD Labs implements pair programming.",
    icon: <ConnectWithoutContactIcon color="primary" style={iconStyle} />,
    href: "/knowledge-base/pair-pgr-page",
  },
  {
    title: "Resources",
    text: "Student Resources.",
    icon: <CastForEducationIcon color="primary" style={iconStyle} />,
    href: "/knowledge-base/resources",
  },
];
export { dashBoardInfo, cardStyles };