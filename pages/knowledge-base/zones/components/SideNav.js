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
  Tooltip,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";

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
  }, [personIndex, techIndex, skillID]);

  //isDesktop checks if the screen width is more than 900px and if true expanded is false.

  const handleChange = (accordion) => (event, isExpanded) => {
    console.log(isExpanded);
    if (isDesktop) {
      return;
    }

    const updatedExpanded = expanded;
    updatedExpanded[accordion] = !updatedExpanded[accordion];
    setExpanded({ ...updatedExpanded });
  };

  //created an array of object with respective skills index data so we iterate over the data to form accordion panel for each skill type.

  let sideIndex;

  {
    if (techIndex && personIndex) {
      sideIndex = [
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
          bgColor: "primary.main",
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
          bgColor: "secondary.main",
        },
      ];
    }
  }

  return (
    <>
      {sideIndex && (
        <div style={{ width: "100%"}}>
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
                    color: "primary.contrastText",
                    alignItems: "center",
                    padding: "0",
                  }}
                >
                  {icon}
                  <Typography variant="h5" m={1} ml={0}>
                    {heading}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <List
                    sx={{ width: "100%", padding: "0" }}
                    aria-label={ulLabel}
                  >
                    {details.map((doc) => (
                      <ListItem
                        disablePadding
                        key={doc.id}
                        aria-label={liLabel}
                      >
                        <ListItemButton
                          sx={{
                            padding: "0",
                          }}
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
                                variant="body1"
                                sx={{
                                  fontWeight:
                                    liValue === doc.id ? "fontWeightBold" : "",
                                  textTransform: "uppercase",
                                  fontSize: "14px !important",
                                  // borderBottom: '1px solid black',
                                  // "&:last-child": {
                                  //   borderBottom: 'none'
                                  // }
                                }}
                              >
                                {doc.Name}
                              </Typography>
                            }
                          />
                        </ListItemButton>
                            <Tooltip key={doc.Name} title={doc.description}>
                              <IconButton>
                                <InfoIcon sx={{color: bgColor, alignSelf: "center"}} />
                              </IconButton>
                            </Tooltip>
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      )}
    </>
  );
});
