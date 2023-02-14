import React from "react";
import { getSession } from "next-auth/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container } from "@mui/material";
import { privateLayout } from "../../components/layout/PrivateLayout";
import { getAdminLinks } from "./components/AdminLinks";
import { getUserLinks } from "./components/UserLinks";
import Link from "next/link";

const Dashboard = ({ data, isAdmin }) => {
  //use a query to adjust mobile view
  const matches = useMediaQuery("(min-width:600px)");

  return (
    <Container
      sx={{ textAlign: "center", p: !matches && 1 }}
      className="extra-top-padding"
    >
      <div>
        <h2>User Data</h2>
        <ul>
          {data[0].map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        {isAdmin ? (
          <div>
            <h2>Admin Data</h2>
            <ul>
              {data[1].map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </Container>
  );
};
export default Dashboard;
Dashboard.getLayout = privateLayout;
function checkIfUserIsAdmin(user) {
  return user.is_admin === true;
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const { user } = session;

  const isAdmin = checkIfUserIsAdmin(user);
  let data;
  if (isAdmin) {
    data = await Promise.all([getUserLinks(), getAdminLinks()]);
  } else {
    data = await [getUserLinks()];
  }

  return {
    props: {
      user,
      isAdmin,
      data,
    },
  };
}
