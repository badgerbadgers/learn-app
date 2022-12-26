import React, { useState, useEffect } from "react"
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
    const mongo_id = filteredByIdPage[0].mongo_id
    const title = filteredByIdPage[0].title

    await axios.post(
      "/api/staticpages",
      {
        wp_id: id,
        isShown: deleted,
        _id: mongo_id,
        title: title,
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
            defaultChecked={!!params.row.mongo_id}
          />
        )
      },
    },
  ]

  return (
    <Box sx={{ height: 650, width: "100%" }}>
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
  await dbConnect()

  const session = await getSession(context)
  console.log("session", session)

  const mongoData = await StaticPage.find({}).lean()
  const res = await fetch("https://learn.codethedream.org/wp-json/wp/v2/pages")
  const wordpressData = await res.json()
  const combinedData = combineData(wordpressData, mongoData)
  return {
    props: {
      combinedData,
    },
  }
}

function combineData(wordpressData, mongoData) {
  const combinedData = []
  wordpressData.forEach((wpitem) => {
    const combinedObj = {
      wordpress_id: wpitem.id,
      title: wpitem.title.rendered,
      slug: wpitem.slug,
      mongo_id: null,
    }
    let item = mongoData.find(
      (mongoitem) => wpitem.id === mongoitem.wordpress_id
    )
    if (item) {
      combinedObj.mongo_id = item._id + ""
    }
    combinedData.push(combinedObj)
  })
  return combinedData
}
