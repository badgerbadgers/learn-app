import React, { useState, useEffect } from "react";
import { Switch, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dbConnect from "../../../lib/dbConnect";
import axios from "axios";
import { getSession } from "next-auth/react";
import { privateLayout } from "../../../components/layout/PrivateLayout";
import { createStaticPage } from "pages/api/v1/staticpages";
import { updateStaticPage } from "pages/api/v1/staticpages/[id]";
import StaticPage from "lib/models/StaticPage";
const { ObjectId } = require("mongodb");

const AllStaticPages = ({ parsedData }) => {
  const [staticPages, setStaticPages] = useState(parsedData);
  const [checked, setIsChecked] = useState(parsedData.checked);

  const handleChange = async (event) => {
    const deleted = event.target.checked;
    const id = JSON.parse(event.target.id);
    const filteredByIdPage = staticPages.filter((page) => {
      let wp_id = page.wordpress_id;
      return wp_id === id;
    });

    //toggled page will always be array index 0 from filter
    const mongo_id = filteredByIdPage[0]._id;
    const title = filteredByIdPage[0].title;
    const slug = filteredByIdPage[0].slug;

    const updatestaticpage = {
      isShown: deleted,
    };

    await axios.patch(`/api/v1/staticpages/${mongo_id}`, updatestaticpage, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
  // const mongoData = await StaticPage.find({}).lean();
  const res = await axios.get(
    process.env.wordpressUrl + "?parent=" + process.env.wordpressParentId
  );
  const wordpressData = await res.data;
  const data = await combineData(wordpressData);

  return {
    props: {
      parsedData: JSON.parse(JSON.stringify(data)),
    },
  };
}

const combineData = async (wordpressData) => {
  const combinedData = [];
  let mongoObj = {};

  for (let i = 0; i < wordpressData.length; i++) {
    mongoObj = await StaticPage.findOne({
      wordpress_id: wordpressData[i].id,
    });

    //if wp id does not match mongo doc boolean is false
    if (wordpressData[i].id !== mongoObj.wordpress_id) {
      await updateStaticPage(
        ObjectId(mongoObj._id),
        (mongoObj = {
          isShown: false,
        })
      );
    }
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
