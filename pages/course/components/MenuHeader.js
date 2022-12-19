import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useMediaQuery } from "@mui/material";
import slackLogo from "../../../public/img/slack-icon.svg";
import zoomLogo from "../../../public/img/zoom-icon.svg";
import Image from "next/image";

export default function MenuHeader({ zoomLink }) {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const logoStyle = {
    marginRight: "50px",
  };
  return (
    <Box component="div" sx={{ p: "1em" }}>
      {!isSmallScreen && (
        <Stack>
          <Typography variant="h6">Mentor Sessions</Typography>
          <Typography variant="body1">
            During this course you will sign up for a minimum of one mentor
            session a week
          </Typography>
          <Stack sx={{ display: "flex", alignItems: "start", mt: "1em" }}>
            <Button
              target="_blank"
              href={zoomLink}
              aria-label="zoom link"
              variant="text"
              sx={{
                color: "#338AAF",
                p: "0",
                my: ".2em",
              }}
            >
              <Image
                style={logoStyle}
                src={zoomLogo}
                alt="slack"
                width="30"
                height="30"
              />
              <Typography sx={{ ml: "10px", textTransform:"capitalize" }}>Zoom link</Typography>
            </Button>

            <Button
              href="" //To Do: link comes from Mary Alice
              aria-label="slack announcements"
              variant="text"
              sx={{
                color: "#338AAF",
                whiteSpace: "no-wrap",
                p: "0",
                my: ".5em",
              }}
            >
              <Image src={slackLogo} alt="slack" width="25px" height="25px" />
              <Typography sx={{ ml: "10px", textTransform:"capitalize" }}>Slack announcements</Typography>
            </Button>
          </Stack>
        </Stack>
      )}

      {isSmallScreen && (
        <Stack sx={{ textAlign: "left" }}>
          <Typography variant="h6">Mentor Sessions</Typography>
          <Typography variant="body1" sx={{ maxWidth: "240px" }}>
            During this course you will sign up for a minimum of one mentor
            session a week
          </Typography>

          <Stack
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              mt: "1em", 
             
            }}
          >
            <Button
              target="_blank"
              href={zoomLink}
              aria-label="zoom link"
              sx={{ p: "0px" }}
            >
              <Image src={zoomLogo} alt="slack" width="40px" height="40px" />
            </Button>

            <Button
              href="" //To Do: link comes from Mary Alice
              aria-label="slack announcements"
              target="_blank"
              sx={{ m: "0px" }}
            >
              <Image src={slackLogo} alt="slack" width="30px" height="30px" />
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
