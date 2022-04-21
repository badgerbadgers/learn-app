import PsychologyIcon from "@mui/icons-material/Psychology";
import { Typography } from "@mui/material";

const DashbrdHeader = () => {
  return (
    <Typography variant="h3" gutterBottom color="secondary">
      <PsychologyIcon
        color="secondary"
        style={{
          fontSize: "54px",
          position: "relative",
          top: "8px",
        }}
      />{" "}
      Knowledge Base
    </Typography>
  );
};

export default DashbrdHeader