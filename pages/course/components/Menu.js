import { React, useEffect } from "react";
import MenuHeader from "./MenuHeader";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { useRouter } from "next/router";

//Don't forget to delete all the comments bellow from the other Menu copied
export default function Menu({
  courseName,
  cohortName,
  lessonData,
  setSelectedLabel,
}) {
  const router = useRouter();

  // const hijackLink = (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  // };
  // useEffect(() => {
  //   //changing query params after the first render
  //   router.push(`/?lesson=${lessonData.lesson_label}`, undefined, {
  //     shallow: true,
  //   });
  // }, []);

  // useEffect(() => {
  //   // the counter changed!
  // }, [router.query.lesson]);

  // }

  // const componentDidUpdate = (prevProps) => {
  //   const { query } = this.props.router;
  //   console.log("query:", query.lesson);
  //   // verify props have changed to avoid an infinite loop
  //   if (query.lesson !== prevProps.router.query.lesson) {
  //     // fetch data based on the new query------------------
  //     setSelectedLabel(lessons.lesson_label);
  //   }
  // };
console.log(courseName, cohortName)
  return (
    <Grid item md={3} sx={{ maxWidth: "100%" }}>
      <Paper
        variant="outlined"
        square
        sx={{
          height: "100%",
          backgroundColor: "#F4F5F7",
        }}
      >
        <MenuList dense>
          <MenuHeader />
          {/* ^^ component */}
          <Divider sx={{ mb: "5px" }} />

          <MenuItem>
            <Typography variant="h6">Lessons</Typography>
          </MenuItem>

          {lessonData.map((lessons) => {
            return (
              <Stack key={lessons.lesson_label}>
                <Link
                  href={{
                    pathname: "/course/[course_name]/[cohort_name]/",
                    //remember to change the file names
                    query: { course_name: courseName, cohort_name: cohortName, lesson: lessons.lesson_label },
                    //lesson_name={lessons.lesson_label}
                    // in querry whatever you put with ?= will be dynamic params
                  }}
                  passHref
                  shallow={true}
                >
                  <MenuItem
                    key={lessons.lesson_label}
                    // Do we still need onClick if we use link?
                    //onClick={hijackLink}
                  >
                    <Typography variant="body1" noWrap={true}>
                      {lessons.lesson_label}
                    </Typography>
                  </MenuItem>
                </Link>
                <Divider />
              </Stack>
            );
          })}
        </MenuList>
      </Paper>
    </Grid>
  );
}

// import React from "react";
// import MenuHeader from "./MenuHeader";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import MenuList from "@mui/material/MenuList";
// import MenuItem from "@mui/material/MenuItem";
// import Divider from "@mui/material/Divider";
// import Paper from "@mui/material/Paper";
// import Stack from "@mui/material/Stack";

// export default function Menu({ lessonData, setSelectedLabel }) {
//   return (
//     <Grid item md={3} sx={{ maxWidth: "100%" }}>
//       <Paper
//         variant="outlined"
//         square
//         sx={{
//           height: "100%",
//           backgroundColor: "#F4F5F7",
//         }}
//       >
//         <MenuList dense>
//           <MenuHeader />
//           {/* ^^ component */}
//           <Divider sx={{ mb: "5px" }} />

//           <MenuItem>
//             <Typography variant="h6">Lessons</Typography>
//           </MenuItem>

//           {lessonData.map((lessons) => {
//             return (
//               <Stack key={lessons.order}>
//                 <MenuItem
//                 key={lessons.order}
//                   onClick={() => {
//                     console.log(lessons.lesson_label);
//                     {
//                       setSelectedLabel(lessons.lesson_label);
//                     }
//                   }}
//                 >
//                   <Typography variant="body1" noWrap={true}>
//                     {lessons.lesson_label}
//                   </Typography>
//                 </MenuItem>
//                 <Divider />
//               </Stack>
//             );
//           })}
//         </MenuList>
//       </Paper>
//     </Grid>
//   );
// }
