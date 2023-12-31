import React, { useState } from "react";
import { Switch, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import dbConnect from "lib/dbConnect";
import axios from "axios";
import { getSession } from "next-auth/react";
import { privateLayout } from "components/layout/PrivateLayout";
import { createStaticPage } from "pages/api/v1/staticpages";
import { deleteStaticPage } from "pages/api/v1/staticpages/[id]";
import StaticPage from "lib/models/StaticPage";

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
          // fontSize: "35px",
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

  const res = await axios.get(
    process.env.wordpressUrl + "?parent=" + process.env.wordpressParentId
  );
  const wordpressData = await res.data;
  const wordpressIds = wordpressData.map((page) => page.id);

  //finds wp id that is not in wordpressIds array
  const deletedWordPressIds = await StaticPage.find({
    wordpress_id: { $nin: wordpressIds },
    deleted_at: null,
  });

  //loops through the array and soft deletes the static page by id
  for (const itemToDelete of deletedWordPressIds) {
    deleteStaticPage(itemToDelete._id.toString());
  }
  const data = await combineData(wordpressData);

  return {
    props: {
      parsedData: JSON.parse(JSON.stringify(data)),
    },
  };
}

const combineData = async (wordpressData) => {
  await dbConnect();
  const combinedData = [];
  let mongoObj;

  for (let i = 0; i < wordpressData.length; i++) {
    mongoObj = await StaticPage.findOne({
      wordpress_id: wordpressData[i].id,
    });

    if (mongoObj) {
      combinedData.push(mongoObj);
    } else if (mongoObj === null) {
      mongoObj = await createStaticPage({
        wordpress_id: wordpressData[i].id,
        isShown: false,
        title: wordpressData[i].title.rendered,
        slug: wordpressData[i].slug,
      });
      combinedData.push(mongoObj);
    }
  }
  return combinedData;
};
