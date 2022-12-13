import React, { useState, useEffect } from "react"
import { Switch } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import NavBar from "../../../components/layout/NavBar"
import Footer from "../../../components/layout/Footer"
import StaticPage from "../../../lib/models/StaticPage"
// import { PublicLayout2 } from "../../../components/layout/PublicLayout2"
import dbConnect from "../../../lib/dbConnect"

export default function AllStaticPages({ wordpressData, mongoData, data }) {
  let parsedMongoData = JSON.parse(mongoData)
  const [wpPages, setwpPages] = useState(wordpressData)
  let parsedData = JSON.parse(data)
  const [checked, setChecked] = useState(parsedData.deleted_at)
  const [mongoPages, setMongoPages] = useState(parsedMongoData)

  // let parsedData = JSON.parse(data)
  const [updatedPages, setUpdatedPages] = useState(parsedData)
  // const [checked, setChecked] = useState(parsedData.deleted_at)

  // console.log("data", parsedData)
  // console.log("updated", updatedPages)

  function newObj(data) {
    // const newObj = (data) => {
    let combinedObj = {}
    let combinedArr = []
    wordpressData.map((wpitem) => {
      // console.log("wpitem", wpitem)
      let item = parsedMongoData.find((i) => wpitem.id === i.wordpress_id)
      if (item) {
        combinedObj = {
          id: wpitem.id,
          title: item.title,
          slug: item.slug,
          deleted_at: item.deleted_at,
        }
        console.log("combined data object", combinedObj)
        // return combinedObj
      }
      combinedArr.push(combinedObj)
      console.log("combined mongo wordpress array", combinedArr)
    })
  }
  // console.log("newobj", newObj)
  newObj()
  const handleChange = async (event) => {
    let id = event.target.id
    let deleted = event.target.checked
    console.log("deleted", deleted)
    await fetch("/api/staticpages", {
      method: "PATCH",
      // body: id,
      // body: JSON.stringify({ id, deleted }),
      body: JSON.stringify({ id, deleted }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setUpdatedPages(res.data))
  }

  // const columns = [
  //   {
  //     // field: "slug",
  //     field: "title",
  //     headerName: "Title",
  //     width: 450,
  //     valueGetter: (params) => {
  //       return params.row.title.rendered
  //     },
  //   },
  //   { field: "id", headerName: "ID", width: 150 },
  //   {
  //     field: "col3",
  //     headerName: "Shown in Learn App",
  //     width: 150,
  //     renderCell: (params) => {
  //       const id = params.id
  //       // const deleted = params.deleted_at
  //       return (
  //         <Switch
  //           id={id.toString()}
  //           checked={checked}
  //           // checked={deleted}
  //           onChange={handleChange}
  //           inputProps={{ "aria-label": "controlled" }}
  //         />
  //       )
  //     },
  //   },
  // ]

  const columns2 = [
    {
      // field: "slug",
      field: "title",
      headerName: "Title",
      width: 450,
      valueGetter: (params) => {
        return params.row.title
      },
    },
    { field: "wordpress_id", headerName: "ID", width: 150 },
    {
      field: "shown",
      headerName: "Shown in Learn App",
      width: 150,
      renderCell: (params) => {
        // const id = params.id
        return (
          <Switch
            // id={id.toString()}
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
          rows={updatedPages}
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

  // let combinedObj = {}
  // let combinedData = []
  function combinedData(data) {
    wordpressData.map((wpitem) => {
      // console.log("wpitem", wpitem)
      let combinedObj = {}
      let combinedData = []
      let item = mongoData.find(
        (mongoitem) => wpitem.id === mongoitem.wordpress_id
      )
      if (item) {
        combinedObj = {
          wordpress_id: wpitem.id,
          title: item.title,
          slug: item.slug,
          deleted_at: item.deleted_at,
        }
        // console.log("combo", combinedObj)
        // return combinedObj
        // emptyArr.push(combinedObj)
      }
      combinedData.push(combinedObj)
      console.log("ssprops combined data", combinedData)
    })
  }
  combinedData()

  console.log("combined data after function call", combinedData)

  return {
    props: {
      wordpressData,
      mongoData: JSON.stringify(mongoData),
      data: JSON.stringify(mongoData),
      // combinedData,
    },
  }
}

// StaticPage.getLayout = PublicLayout2
// StaticPage.getLayout = function getLayout(pages) {
//   return (
//     <>
//       <PublicLayout2>{pages}</PublicLayout2>
//     </>
//   )
// }
