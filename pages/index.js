import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogIn from "../components/Login";
import {
  Typography,
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";

let theme = createTheme();
theme = responsiveFontSizes(theme);

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontFamily: "Gotham Rounded B",
            fontSize: "42px",
          }}
        >
          Code the Dream Apprentice Landing Page
        </Typography>
        <LogIn />
      </ThemeProvider>
    </>
  );
}

