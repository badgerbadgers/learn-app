import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";

export default function AddWeekBtns({ idx, handleShowForm }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    !loading && <Box mt={2}
      ml={"110px"}
      sx={{
        width: "calc(100% - 110px)",
        position: "relative",
        display: "flex",
        justifyContent: "space-around",
      }}>
      <Box
        sx={{
          width: "100%",
          height: "50%",
          display: "flex",
          borderBottom: "0.5px solid #D9D9D9",
          position: "absolute"
        }}
      />
      <Box display="flex" justifyContent="center" alignItems="center"
        sx={{
          width: "234px",
          height: "50%",
          display: "flex",
          justifyContent: 'space-around',
        }}>
        <Button size="small" variant="outlined"
          onClick={() => handleShowForm(idx, "break")}
          sx={{
            borderRadius: "20px",
            height: "30px",
            lineHeight: "30px",
            textTransform: "capitalize",
            fontSize: "18px",
            fontWeight: "lighter",
            fontFamily: "Montserrat",
            border: "1px solid #D9D9D9",
            color: "#FF5C34 !important",
            backgroundColor: "white",
            '&:hover': {
              backgroundColor: 'white',
            },
          }}> + Break </Button>


        <Button size="small" variant="outlined"
          onClick={() => handleShowForm(idx, "review")}
          sx={{
            borderRadius: "20px",
            height: "30px",
            lineHeight: "30px",
            textTransform: "capitalize",
            fontSize: "18px",
            fontWeight: "lighter",
            fontFamily: "Montserrat",
            border: "1px solid #D9D9D9",
            backgroundColor: "white",
            '&:hover': {
              backgroundColor: 'white',
            },
          }}> + Review </Button>
      </Box>
    </Box>
  );
}
