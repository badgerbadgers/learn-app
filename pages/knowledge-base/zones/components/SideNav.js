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
  personIndex,
  setSkillID,
  skillID,
}) {
  const [liValue, setLiValue] = useState("");
  const [expanded, setExpanded] = useState({});
  const isDesktop = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    setLiValue(skillID);
  }, [personIndex, techIndex]);

  //isDesktop checks if the screen width is more than 900px and if true expanded is false.

  const handleChange = (accordion) => (event, isExpanded) => {
    //console.log(isExpanded, "******value of panel");
    //console.log(panel, "**** panel value");
    console.log("****isDesktop: " + isDesktop);
    if (isDesktop) {
      return;
    }

    const updatedExpanded = expanded;
    updatedExpanded[accordion] = !updatedExpanded[accordion];
    setExpanded(updatedExpanded);
    console.log(
      "************updatedExpanded: " + JSON.stringify(updatedExpanded)
    );
  };

  console.log(expanded);

  //created an array of object with respective skills index data so we iterate over the data to form accordion panel for each skill type.

  const sideIndex = [
    {
      id: "panel1bh",
      icon: (
        <CodeOffOutlinedIcon
          sx={{ width: "25%", flexShrink: 0, fontSize: "1.8rem" }}
        />
      ),
      heading: "Technical Skills",
      details: techIndex,
      ulLabel: "tech skill index ul",
      liLabel: "technical skills index li",
      bgColor: "#FF5C35",
    },
    {
      id: "panel2bh",
      icon: (
        <PsychologyOutlinedIcon
          sx={{ width: "25%", flexShrink: 0, fontSize: "2rem" }}
        />
      ),
      heading: "Personal Skills",
      details: personIndex,
      ulLabel: "personal skills index ul",
      liLabel: "personal skills index li",
      bgColor: "#12284C",
    },
  ];
  //
  return (
    <div style={{ padding: "16px" }}>
      {sideIndex.map((accordion) => {
        const { id, icon, heading, details, ulLabel, liLabel, bgColor } =
          accordion;
        return (
          <Accordion
            key={id}
            expanded={expanded[id] || isDesktop}
            onChange={handleChange(id)}
          >
            <AccordionSummary
              expandIcon={
                isDesktop ? "" : <ExpandMoreIcon sx={{ color: "#fff" }} />
              }
              aria-controls={`${id}-content`}
              id={`${id}-header`}
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
