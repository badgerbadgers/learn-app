import React, { useState, useEffect } from "react"
import { Switch } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import NavBar from "../../../components/layout/NavBar"
import Footer from "../../../components/layout/Footer"
import StaticPage from "../../../lib/models/StaticPage"
// import { PublicLayout2 } from "../../../components/layout/PublicLayout2"
import dbConnect from "../../../lib/dbConnect"

export default function AllStaticPages({ combinedData }) {
  // console.log("combined data props", combinedData)
  const [checked, setChecked] = useState(combinedData.deleted_at)
  const [staticPages, setStaticPages] = useState(combinedData)
  const [updatedPages, setUpdatedPages] = useState([])

  const handleChange = async (event) => {
    // console.log("event", event)
    let id = event.target.id
    // console.log("id", id)
    let deleted = event.target.checked
    // console.log("deleted", deleted)
    await fetch("/api/staticpages", {
      method: "PATCH",
      body: JSON.stringify({ id, deleted }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json())
    // .then((res) => console.log("res", res.data))
    // .then((res) => setStaticPages(res.data))
  }

  const columns2 = [
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
        const id = params.id
        return (
          <Switch
            id={id.toString()}
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
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
        {/* <DataGrid columns={columns} rows={wpPages} /> */}
        <DataGrid
          // {...parsedMongoData}
          //           {...parsedMongoData, checked: parsedMongoData.deleted_at}
          columns={columns2}
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
  /*
  [x]new func combine data
  map if isshown keep mongo _id
  [x]take needed properties from wp data
  [x] const newObj =  {}
  */
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
    }
    combinedData.push(combinedObj)
  })
  console.log("combined data", combinedData)
  return combinedData
}
