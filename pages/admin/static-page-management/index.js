import React, { useState } from "react";
import { Switch, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dbConnect from "../../../lib/dbConnect";
import axios from "axios";
import { getSession } from "next-auth/react";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import { createStaticPage } from "pages/api/v1/staticpages";
import StaticPage from "lib/models/StaticPage";

const AllStaticPages = ({ combinedData }) => {
  const parsedData = JSON.parse(combinedData);
  //refactor sp mgmt
  //front end issue
  //duplicate docs in mongo
  //check the problem
  //disable switch until response from server
  //prevent duplicate not solve issue
  //mongo unique index, mongoose validation does not check for uniqueness(this can be done in mongoose unique: true)
  //create custom validator onSave check db for duplicate element

  // no need to patch/post conditional(patch req everytime)

  const [staticPages, setStaticPages] = useState(parsedData);
  const [updatedPages, setUpdatedPages] = useState([]);
  const [checked, setIsChecked] = useState(parsedData.checked);

  const handleChange = async (event) => {
    const deleted = event.target.checked;
    const id = JSON.parse(event.target.id);
    const filteredByIdPage = staticPages.filter((page) => {
      let wp_id = JSON.parse(page.wordpress_id);
      return wp_id === id;
    });

    //toggled page will always be array index 0 from filter
    const mongo_id = filteredByIdPage[0]._id;
    const title = filteredByIdPage[0].title;
    const slug = filteredByIdPage[0].slug;

    const updatestaticpage = {
      title: title,
      slug: slug,
      _id: mongo_id,
      isShown: deleted,
    };

    const updated = await axios.patch(
      `/api/v1/staticpages/${mongo_id}`,
      updatestaticpage,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 450,
    },
    { field: "wordpress_id", headerName: "ID", width: 150 },
    {
      field: "isShown",
      headerName: "Shown in App",
      width: 150,
      renderCell: (params) => {
        const id = params.id;
        return (
          <Switch
            title={params.title}
            id={id.toString()}
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            defaultChecked={!!params.row.isShown}
          />
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px - 2.8rem)", //100% - header - footer
        width: "100%",
        mb: "10rem",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        color="primary"
        style={{
          fontSize: "35px",
          position: "relative",
          top: "60px",
          left: "80px",
        }}
      >
        WordPress Pages
      </Typography>
      <DataGrid
        sx={{ m: 10 }}
        columns={columns}
        rows={staticPages}
        getRowId={(row) => row.wordpress_id}
      />
    </Box>
  );
};
export default AllStaticPages;

AllStaticPages.getLayout = privateLayout;

export async function getServerSideProps(context) {
  await dbConnect();
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

  const res = await axios.get(process.env.wordpressUrl);
  const wordpressData = await res.data;

  //combinedData can look for mongo data
  //res can be sent as prop
  //front end data will be different
  const data = await combineData(wordpressData);
  const combinedData = JSON.stringify(data);
  return {
    props: { combinedData },
  };
}

const combineData = async (wordpressData) => {
  const combinedData = [];
  let mongoObj = {};
  for (let i = 0; i < wordpressData.length; i++) {
    mongoObj = await StaticPage.findOne({
      wordpress_id: wordpressData[i].id,
    });

    if (mongoObj) {
      combinedData.push(mongoObj);
    } else if (mongoObj === null) {
      await createStaticPage(
        (mongoObj = {
          wordpress_id: wordpressData[i].id,
          isShown: wordpressData[i].deleted,
          title: wordpressData[i].title.rendered,
          slug: wordpressData[i].slug,
        })
      );
    }
  }
  return combinedData;
};
