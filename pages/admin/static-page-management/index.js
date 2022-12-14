import React, { useState, useEffect } from "react"
import { Switch } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import NavBar from "../../../components/layout/NavBar"
import Footer from "../../../components/layout/Footer"
import StaticPage from "../../../lib/models/StaticPage"
// import { PublicLayout2 } from "../../../components/layout/PublicLayout2"
import dbConnect from "../../../lib/dbConnect"
import axios from "axios"

export default function AllStaticPages({ combinedData }) {
  console.log("combined data props", combinedData)
  //filter or find static pages look for id then have obj and add to post call
  const [staticPages, setStaticPages] = useState(combinedData)
  const [updatedPages, setUpdatedPages] = useState([])
  const [checked, setIsChecked] = useState(combinedData.checked)

  const handleChange = async (event) => {
    console.log("event", event)
    // let title = event.target.title
    const id = event.target.id
    //next steps
    //call function or look id in static pages and grab property for post req
    // console.log("id", id)
    const deleted = event.target.checked
    console.log("deleted", deleted)
    //todo:
    // change to axios
    await fetch("/api/staticpages", {
      method: "PATCH",
      // method: "POST",
      body: JSON.stringify({ id, deleted }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
    // .then((res) => console.log("res", res.data))
    // .then((res) => setStaticPages(res.data))
  }

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 450,
    },
    { field: "wordpress_id", headerName: "ID", width: 150 },
    {
      field: "deleted_at",
      headerName: "Shown in Learn App",
      width: 150,
      renderCell: (params) => {
        // const title = params.title
        // const status = params.isShown
        const id = params.id
        return (
          <Switch
            // title={params.title}
            id={id.toString()}
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            //this sets the intial state this attribute checks if there is a mongodb id and automatically
            //sets the switch (boolean flag) to true
            defaultChecked={!!params.row.mongo_id}
          />
        )
      },
    },
  ]

  return (
    <>
      <NavBar />
      <div style={{ height: 800, width: "100%" }}>
        <h2>WordPress pages</h2>
        <DataGrid
          columns={columns}
          rows={staticPages}
          getRowId={(row) => row.wordpress_id}
        />
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  await dbConnect()
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

//moved function outside of serversideprops for easier testing
function combineData(wordpressData, mongoData) {
  const combinedData = []
  wordpressData.forEach((wpitem) => {
    const combinedObj = {
      wordpress_id: wpitem.id,
      title: wpitem.title.rendered,
      slug: wpitem.slug,
      mongo_id: null,
    }
    //find method needs to handle deleted pages? future question.
    let item = mongoData.find(
      (mongoitem) => wpitem.id === mongoitem.wordpress_id
    )
    if (item) {
      //adds mongo_id empty string, if mongoDB id does not exist
      combinedObj.mongo_id = item._id + ""
      // combinedObj.isShown = item.isShown
    }
    combinedData.push(combinedObj)
  })
  console.log("combined data", combinedData)
  return combinedData
}
