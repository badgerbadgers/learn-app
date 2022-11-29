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
  return (
    <Box component="div" sx={{ p: "1em" }}>
      {!isSmallScreen && (
        <Stack>
          <Typography variant="h6">Mentor Sessions</Typography>
          <Typography variant="body1">
            During this course you will sign up for a minimum of one mentor
            session a week
          </Typography>
          <Stack sx={{ display: "flex", alignItems: "start" }}>
            <Button
              target="_blank"
              href={zoomLink}
              aria-label="zoom link"
              variant="text"
              sx={{ color: "#338AAF", textTransform: "lowercase" }}
            >
              <Image src={zoomLogo} alt="slack" width="50px" height="30px" />
              zoom link
            </Button>

            <Button
              href="" //To Do: link comes from Mary Alice
              aria-label="slack announcements"
              variant="text"
              sx={{
                color: "#338AAF",
                textTransform: "lowercase",
                whiteSpace: "no-wrap",
              }}
            >
              <Image src={slackLogo} alt="slack" width="50px" height="50px" />
              slack announcements
            </Button>
          </Stack>{" "}
        </Stack>
      )}
      {/* TODO:fix mobile layout styling when team comes to concensus */}
      {isSmallScreen && (
        <Stack sx={{ textAlign: "center" }}>
          <Typography variant="h6">Mentor Sessions</Typography>
          <Typography variant="body1">
            During this course you will sign up for a minimum of one mentor
            session a week
          </Typography>

          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Button target="_blank" href={zoomLink} aria-label="zoom link">
              <Image src={zoomLogo} alt="slack" width="60px" height="40px" />
            </Button>

            <Button
              href="" //To Do: link comes from Mary Alice
              aria-label="slack announcements"
              target="_blank"
            >
              <Image src={slackLogo} alt="slack" width="60px" height="60px" />
            </Button>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
