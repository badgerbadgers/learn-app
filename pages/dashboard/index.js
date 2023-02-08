import React from "react";
import { getSession } from "next-auth/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Container } from "@mui/material";
import { privateLayout } from "../../components/layout/PrivateLayout";
import { getAllLinks } from "./components/AdminLinks";
import { getUserLinks } from "./components/UserLinks";
import Link from "next/link";

const Dashboard = ({ data }) => {
  //use a query to adjust mobile view
  const matches = useMediaQuery("(min-width:600px)");

  console.log(data);
  return (
    <Container
      sx={{ textAlign: "center", p: !matches && 1 }}
      className="extra-top-padding"
    >
      <h2>Available links</h2>
      <ul>
        {data.map((link) => (
          <li key={link.id} style={{ listStyle: "none" }}>
            <Link href={link.url} target="_blank">
              <a target="_blank">{link.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};
export default Dashboard;
Dashboard.getLayout = privateLayout;

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
  let data;
  if (user.isAdmin === true) {
    data = await getAllLinks();
  } else {
    data = await getUserLinks();
  }

  return {
    props: {
      user,
      data,
    },
  };
}
