import { Button, Stack, Typography } from "@mui/material";
import { add, format } from "date-fns";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Unstable_Grid2'
import IconButton from '@mui/material/IconButton';
import { useTheme } from "@emotion/react";

export default function CohortHeader({ title, course, setOpen, startDate, scheduleLen, prevCohort, nextCohort }) {
  const endDate = add(new Date(startDate), { weeks: scheduleLen })
  const theme = useTheme();

  return <Grid container spacing={0} >
    <Grid container
      xs={12}>
      <Grid xs={12} md={6} >
        <Button
          size="small"
          color="secondary"
          href="/admin/cohort-management"
          startIcon={<ArrowBackIcon />}
          sx={{
            fontSize: "12px",
            lineHeight: "12px",
            alignContent: "center",
            verticalAlign: "center",
            "& .MuiButton-startIcon": {
              mr: "4px",
              mb: "2px", //the icon vertically aligned in the btn
            }
          }}
        > Back to cohorts
        </Button>
      </Grid>



      <Grid xs={12} md={6}
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          justifyContent: "end",


        }}>
        {!!startDate ? <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          justifyContent="flex-end"
        >
          {prevCohort && (<IconButton size="small" aria-label="Previous Cohort"
            href={`${prevCohort}`}>
            <ArrowBackIosIcon />
          </IconButton>)}
          <Typography
            sx={{
              maxWidth: "250px",
              minWidth: "183px",
              fontSize: "0.95em",
              lineHeight: "12px",
              overflow: "hidden",
              textOverflow: "ellipsis",

            }}> {`${format(new Date(startDate), "MMM dd, yyyy")} - ${format(endDate, "MMM dd, yyyy")}`}  </Typography>


          {nextCohort && (<IconButton aria-label="Next Cohort"
            href={`${nextCohort}`}>
            <ArrowForwardIosIcon />
          </IconButton>)}
        </Stack> :
          <Typography sx={{
            justifySelf: "end",
            mr: "35px",
          }}> The start date has not been set yet</Typography>
        }

        <Button
          size="small"
          onClick={() => setOpen(true)}
          sx={{
            mr: "35px",
            maxWidth: "260px",
            justifySelf: "end",
          }}
        >Change Schedule
        </Button>

      </Grid>

    </Grid>

    <Grid xs={12} md={8}
      sx={{
        display: "inline-flex",
        justifyContent: "right",
        alignItems: "center",
      }}>
      <Typography align="center" gutterBottom
        pr={2}
        mr={1}
        sx={{
          font: theme.typography.root.fontFamilySecondary,
          fontSize: "4rem",
          fontWeight: "100",
          display: "inline-flex",
          borderRight: "1px solid",
          borderRightColor: "#FF5C35",

        }}>
        {title.toUpperCase()}
      </Typography>
      <Typography
        href="#"
        sx={{
          display: "inline-flex",
          fontSize: "1rem",
          color: "#FF5C35",
          "&:hover": {
            cursor: "pointer",
          },
        }}>{course.course_name}</Typography>
    </Grid>
  </Grid>
}