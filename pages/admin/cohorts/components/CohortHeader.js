import { Box, Button, Stack, Typography } from "@mui/material";
import { add, format } from "date-fns";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Container } from "@mui/system";
import Grid from '@mui/material/Unstable_Grid2'
import IconButton from '@mui/material/IconButton';
import { useTheme } from "@emotion/react";

export default function CohortHeader({ title, course, setOpen, startDate, scheduleLen, prev, next }) {
    const endDate = add(new Date(startDate), { weeks: scheduleLen })
    const theme = useTheme();

    return <Grid container spacing={2}>
        <Grid xs={12}>
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
                        mb: "2px", //vertical align icon in btn
                    }
                }}
            > Back to cohorts
            </Button>
        </Grid>

        <Grid xs={12} md={8}
            sx={{
                // marginX: "auto",
                display: "inline-flex",
                justifyContent: "right",
                alignItems: "center",
            }}>
            <Typography variant="h2" align="center" gutterBottom
                pr={2}
                mr={1}
                sx={{
                    fontSize: "4rem",
                    fontWeight: "light",
                    display: "inline-flex",
                    borderRight: "1px solid",
                    borderRightColor: "#FF5C35",

                }}>
                {title}
            </Typography>
            <Typography
                sx={{
                    display: "inline-flex",
                    fontSize: "1rem",
                    color: "#FF5C35",
                    "&:hover": {
                        cursor: "pointer",
                      },
                    

                }}>{course.course_name}</Typography>



        </Grid>

        <Grid xs={12} md={4}>
            {!!startDate ? <Box
                direction="row"
                spacing={0}
                alignItems="center"
                justifyContent="center"
                sx={{
                    // backgroundColor: "green",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {prev && (<IconButton size="small" aria-label="Previous Cohort"
                    href={`${prev.slug}`}
                    sx={{
                        display: "inline"
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>)}
                <Typography> {`${format(new Date(startDate), "MMMMMM dd, yyyy")} - ${format(endDate, "MMMMMM dd, yyyy")}`}  </Typography>


                {next && (<IconButton aria-label="Next Cohort"
                    href={`${next.slug}`}
                    sx={{
                        display: "inline"
                    }}>
                    <ArrowForwardIosIcon />
                </IconButton>)}
            </Box> :
                <Typography sx={{
                    display: "inline"
                }}> The start date has not been set yet</Typography>


            }

            <Button align="center" onClick={() => setOpen(true)}>Change Schedule</Button>

        </Grid>
    </Grid>

}