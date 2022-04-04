import { useEffect, useState, memo } from "react";
import CodeOffOutlinedIcon from "@mui/icons-material/CodeOffOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default memo(function SideNav({
  techIndex,
  persnIndex,
  setSkillID,
  skillID,
}) {
  const [liValue, setLiValue] = useState("");
  const [expanded, setExpanded] = useState(false);
  const isDesktop = useMediaQuery("(min-width:900px)");

  // isDesktop checks if the screen width is more than 600px and if true expanded is false.

  const handleChange = (panel) => (isExpanded) => {
    if (isDesktop) {
      return;
    }
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setLiValue(skillID);
  }, [persnIndex, techIndex]);

  //created an array of object with respective skills index data so we iterate over the data to form accordion panel for each skill type.

  const sideIndex = [
    {
      id: "panel1",
      icon: (
        <CodeOffOutlinedIcon
          sx={{ width: "25%", flexShrink: 0, fontSize: "1.8rem" }}
        />
      ),
      heading: "Technical Skills",
      details: techIndex,
      ulLabel: "tech sskill index ul",
      liLabel: "technical skills index li",
      bgColor: "#FF5C35",
    },
    {
      id: "panel2",
      icon: (
        <PsychologyOutlinedIcon
          sx={{ width: "25%", flexShrink: 0, fontSize: "2rem" }}
        />
      ),
      heading: "Personal Skills",
      details: persnIndex,
      ulLabel: "personal skills index ul",
      liLabel: "personal skills index li",
      bgColor: "#12284C",
    },
  ];

  return (
    <div style={{ padding: "16px" }}>
      {sideIndex.map((accordion) => {
        const { id, icon, heading, details, ulLabel, liLabel, bgColor } =
          accordion;
        return (
          <Accordion
            role={heading}
            expanded={expanded === id || isDesktop}
            onChange={handleChange(id)}
          >
            <AccordionSummary
              expandIcon={
                isDesktop ? "" : <ExpandMoreIcon sx={{ color: "#fff" }} />
              }
              aria-controls="{id}-content"
              id="{id}-header"
              sx={{
                backgroundColor: bgColor,
                color: "#fff",
                alignItems: "center",
              }}
            >
              {icon}
              <Typography variant="h5">{heading}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ width: "100%" }} aria-label={ulLabel}>
                {details.map((doc) => (
                  <ListItem disablePadding key={doc.id} aria-label={liLabel}>
                    <ListItemButton
                      onClick={() => {
                        setSkillID(doc.id);
                        setLiValue(doc.id);
                      }}
                    >
                      <ListItemText
                        sx={{
                          padding: "0px",
                        }}
                        inset
                        primary={
                          <Typography
                            sx={{
                              fontWeight:
                                liValue === doc.id ? "fontWeightBold" : "",
                            }}
                          >
                            {doc.Name}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
});
