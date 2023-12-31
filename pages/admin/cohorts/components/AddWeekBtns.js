import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

import { useTheme } from "@emotion/react";

export default function AddWeekBtns({ idx, handleShowForm }) {
  //const [loading, setLoading] = useState(true);
  const theme = useTheme();

  // useEffect(() => {
  //   setLoading(false);
  // }, []);

  return (
    <Box
      mt={2} // !loading && <Box mt={2}
      sx={{
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          borderBottom: "0.5px solid #D9D9D9",
          position: "absolute",
        }}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "234px",
          height: "50%",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={() => handleShowForm(idx, "break")}
          sx={{
            borderRadius: "20px",
            height: "30px",
            lineHeight: "30px",
            textTransform: "capitalize",
            fontSize: "18px",
            fontFamily: "Montserrat",
            border: "1px solid #D9D9D9",
            backgroundColor: theme.palette.background.ctdcard,
            "&:hover": {
              backgroundColor: theme.palette.background.ctdcard,
              fontWeight: "normal",
              borderColor: theme.palette.primary,
            },
          }}
        >
          {" "}
          + Break{" "}
        </Button>

        <Button
          size="small"
          variant="outlined"
          onClick={() => handleShowForm(idx, "review")}
          sx={{
            borderRadius: "20px",
            height: "30px",
            lineHeight: "30px",
            textTransform: "capitalize",
            fontSize: "18px",
            fontFamily: "Montserrat",
            border: "1px solid #D9D9D9",
            backgroundColor: theme.palette.background.ctdcard,
            "&:hover": {
              backgroundColor: theme.palette.background.ctdcard,
              fontWeight: "normal",
              borderColor: theme.palette.primary,
            },
          }}
        >
          {" "}
          + Review{" "}
        </Button>
      </Box>
    </Box>
  );
}
