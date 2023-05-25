import React, { useState } from "react"
import { Switch, Typography, Box } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import StaticPage from "../../../lib/models/StaticPage"
import dbConnect from "../../../lib/dbConnect"
import axios from "axios"
import { getSession } from "next-auth/react"
import { privateLayout } from "../../../components/layout/PrivateLayout"

const AllStaticPages = ({ combinedData }) => {
  const [staticPages, setStaticPages] = useState(combinedData)
  const [updatedPages, setUpdatedPages] = useState([])
  const [checked, setIsChecked] = useState(combinedData.checked)

  const handleChange = async (event) => {
    const deleted = event.target.checked
    const id = JSON.parse(event.target.id)
    const filteredByIdPage = staticPages.filter((page) => {
      let wp_id = JSON.parse(page.wordpress_id)
      return wp_id === id
    })

    //toggled page will always be array index 0 from filter
    const mongo_id = filteredByIdPage[0].mongo_id;
    const title = filteredByIdPage[0].title;
    const slug = filteredByIdPage[0].slug;

    await axios.post(
      "/api/staticpages",
      {
        wp_id: id,
        isShown: deleted,
        _id: mongo_id,
        title: title,
        slug: slug,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }

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
        const id = params.id
        return (
          <Switch
            title={params.title}
            id={id.toString()}
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            defaultChecked={!!params.row.isShown}
          />
        )
      },
    },
  ]

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px - 2.8rem)", //100% - header - footer
        width: "100%",
        mb: "10rem",
      }}
    >
      <Typography
        variant='h4'
        gutterBottom
        color='primary'
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
  )
}

export default AllStaticPages

AllStaticPages.getLayout = privateLayout

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

  const mongoData = await StaticPage.find({}).lean();
  const res = await axios.get(process.env.wordpressUrl + `/?parent=378`);
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
