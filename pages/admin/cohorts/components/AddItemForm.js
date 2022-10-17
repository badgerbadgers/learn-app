import { Box, Typography } from "@mui/material";

import AddWeekBtns from "./AddWeekBtns";
import { useEffect } from "react";

export default function AddItemForm({ }) {

        useEffect(()=> {
            console.log("FORM ALERT")
        }, []
        )
    

    return         
    
    //  <Box
    //     sx={{
    //         height: "112px",
    //         width: "100%",
    //         margin: "10px",
    //         display:'block',
    //     }}
    // >

    //     <Box sx={{
    //         fontSize: "14px",
    //         display: "inline-block",
    //         color: "#bababa",
    //         width: "110px",


    //     }}> {"sectionId"}
    //     </Box>
   
    //     <Box sx={{
    //         px: 2,
    //         display: "inline-block",
    //         width: "calc(100% - 110px)",
    //         height: "63px",
    //         lineHeight: "63px",
    //         backgroundColor: "#f5f5f5",
    //     }}>
    //         <Typography mr={2}
    //         variant="overline"
    //         sx={{
    //             display: "inline-block",
    //             minWidth: "30%",
    //             color: "#12284C",
    //             fontFamily:"Montserrat"
    //         }}>
    //         {"sectionId"}
    //         </Typography>
            
    //         <Typography
    //         sx={{
    //             display: "inline-block",
    //             // fontSize: "18px",
                
    //         }}>
    //         {sectionId}
    //         </Typography>
            
              
    //     </Box>
        {/* {
            showBreakBtns &&
            <AddWeekBtns
            insertItem={insertItem}
            sectionId={sectionId}
            idx={idx}
            mt={2}
             sx={{
                display: "flex",
                
                width: "calc(100% - 110px)",
                backgroundColor: "green",
            }}></AddWeekBtns>
        } */}

    // </Box>
}