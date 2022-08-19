import React from "react";
import { getSession } from "next-auth/react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { privateLayout } from "../../components/PrivateLayout";
import Wizard from "./components/Wizard";
import styles from "../../styles/Portfolio.module.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const AcceptanceForm = () => {


    return (
        <Container >
            <Paper elevation={15}>
                <div className={styles.titleForm}>
                    <PersonAddIcon fontSize="large" />
                    <Typography p={2} variant="h4">Join The Class!</Typography>
                    <Typography p={2} variant="h5">
                        Student Offer Acceptance Form
                    </Typography>
                    <Typography p={2} variant="h7" align="justify">
                        We are pleased to offer you a seat in one of our courses!
                        Please complete this form in order to accept that offer and confirm that you will be participating in the class.
                        Input student’s data is only used for internal purposes (grant reporting, data analysis of program participants).
                        Feel free to actualize and modify any pre-populated data. Required fields are marked with asterisk *.
                    </Typography>
                </div>
                <br></br>
                <Wizard />
            </Paper>
        </Container>
    );
};

export default AcceptanceForm;


AcceptanceForm.getLayout = privateLayout;

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const { user } = session;
    if (!user.hasProfile) {
        return {
            redirect: {
                destination: '/signup',
                permanent: false,
            }
        }
    }
    return {
        props: { user },
    }
}
