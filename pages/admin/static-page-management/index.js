import React, { useState } from "react"
import { Switch, Typography, Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid";
import dbConnect from "../../../lib/dbConnect"
import axios from "axios"
import { getSession } from "next-auth/react"
import { privateLayout } from "../../../components/layout/PrivateLayout"
import { getStaticPages } from "pages/api/v1/staticpages";

const AllStaticPages = ({ combinedData }) => {
  const [staticPages, setStaticPages] = useState(combinedData);
  const [updatedPages, setUpdatedPages] = useState([]);
  const [checked, setIsChecked] = useState(combinedData.checked);

  const handleChange = async (event) => {
    const deleted = event.target.checked;
    const id = JSON.parse(event.target.id);
    const filteredByIdPage = staticPages.filter((page) => {
      let wp_id = JSON.parse(page.wordpress_id);
      return wp_id === id;
    });
    console.log("filtered page", filteredByIdPage.mongo_id);

    //toggled page will always be array index 0 from filter
    const mongo_id = filteredByIdPage[0].mongo_id;
    const title = filteredByIdPage[0].title;
    const slug = filteredByIdPage[0].slug;

    //check whether this static page already has a mongo id or not.
    //if it doesn't have a mongo id, we should use POST, as we do now, to create a new record in the db.
    // If it does have a mongo id (which means it has a db record), we should use patch to update the record, and we need to pick which fields we will want to update. isShown definitely should be updated. perhaps title and slug as well, in case they changed in wordpress?
    const staticpage = {
      wordpress_id: id,
      isShown: deleted,
      _id: mongo_id,
      title: title,
      slug: slug,
    };

    const test = filteredByIdPage;
    console.log("test", test);
    //conditional
    if (filteredByIdPage.mongo_id === undefined) {
      await axios.post("/api/v1/staticpages", staticpage, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      await axios.patch(`/api/v1/staticpages/${id}`, staticpage, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    // await axios.post("/api/v1/staticpages", staticpage, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
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
      headerName: "Shown in Learn App",
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

  const dbData = await getStaticPages();
  const mongoData = await dbData;

  const res = await axios.get(process.env.wordpressUrl);
  const wordpressData = await res.data;
  const combinedData = combineData(wordpressData, mongoData);

  return {
    props: {
      combinedData,
      user,
    },
  };
}

//helper function combines wordPress data with mongoDB data, called in getServerSideProps
function combineData(wordpressData, mongoData) {
  const combinedData = []
  const mongoObj = {}
  wordpressData.forEach((wpitem) => {
    const mongoObj = {
      isShown: false,
      wordpress_id: wpitem.id,
      title: wpitem.title.rendered,
      slug: wpitem.slug,
      mongo_id: null,
    }
    mongoData.forEach((item) => {
      if (wpitem.id === item.wordpress_id) {
        mongoObj.isShown = item.isShown
        mongoObj.mongo_id = item._id + ""
        return
      }
    })
    combinedData.push(mongoObj)
  })
  return combinedData
}
