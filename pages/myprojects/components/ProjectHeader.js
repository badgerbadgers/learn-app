import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';
import { Typography } from "@mui/material";

const ProjectHeader = () => {
  return (
    <Typography variant="h3" gutterBottom color="secondary">
      <FolderSharedRoundedIcon
        color="secondary"
        style={{
          fontSize: "54px",
          position: "relative",
          top: "8px",
        }}
      />{" "}
      My Projects
    </Typography>
  );
};

export default ProjectHeader;