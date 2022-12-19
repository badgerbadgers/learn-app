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
  // const [isLoading, setIsloading] = useState(true)
  //filter or find static pages look for id then have obj and add to post call
  const [staticPages, setStaticPages] = useState(combinedData)
  const [updatedPages, setUpdatedPages] = useState([])
  const [checked, setIsChecked] = useState(combinedData.checked)

  // useEffect(() => {
  //   setTimeout(() => {
  //     // console.log("Delayed for 1 second.")
  //     setIsloading(false)
  //   }, "2000")
  // }, [])

  // const handleChange = async (event) => {
  //   console.log("event", event)
  //   // let title = event.target.title
  //   const id = event.target.id
  //   //next steps
  //   //call function or look id in static pages and grab property for post req
  //   // console.log("id", id)
  //   const deleted = event.target.checked
  //   console.log("deleted", deleted)
  //   //todo:
  //   // change to axios
  //   await fetch("/api/staticpages", {
  //     method: "PATCH",
  //     // method: "POST",
  //     body: JSON.stringify({ id, deleted }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => res.json())
  //   // .then((res) => console.log("res", res.data))
  //   // .then((res) => setStaticPages(res.data))
  // }

  const handleMongoId = async (event) => {
    //take id look at static pages and match the ids
    //maybe use filter method or search
    //then send title and slug etc
    //switch does not need to know title
    const deleted = event.target.checked
    // console.log("deleted", deleted)
    const id = JSON.parse(event.target.id)
    const filteredByIdPage = staticPages.filter((page) => {
      let wp_id = JSON.parse(page.wordpress_id)
      return wp_id === id
    })
    console.log("filtered by matching id", filteredByIdPage)
    //toggled page will always be array index 0 from filter
    //mappedId[0].title
    const mongo_id = filteredByIdPage[0].mongo_id
    const title = filteredByIdPage[0].title
    await axios.post(
      "/api/staticpages",
      //send one object with params(payload/data)
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
    // .then((res) => res.json())
    // .then((res) => console.log("handleMongo", res))
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
        // console.log("title", params.row.title)
        // const status = params.isShown
        const id = params.id
        return (
          <Switch
            title={params.title}
            id={id.toString()}
            checked={checked}
            // onChange={handleChange}
            onChange={handleMongoId}
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
        {/* {isLoading ? (
         "loading"
       ) : ( */}
        <DataGrid
          // {...combinedData}
          // initialState={{
          //   ...combinedData.initialState,
          //   checked: combinedData.isShown,
          // }}
          // {...combinedData, {checked: parsedMongoData.deleted_at}}
          columns={columns}
          rows={staticPages}
          getRowId={(row) => row.wordpress_id}
        />
        {/* )} */}
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
    // console.log("item", item)
    if (item) {
      //adds mongo_id empty string, if mongoDB id does not exist
      combinedObj.mongo_id = item._id + ""
      // combinedObj.isShown = item.isShown
    }
    combinedData.push(combinedObj)
  })
  // console.log("combined data", combinedData)
  return combinedData
}
