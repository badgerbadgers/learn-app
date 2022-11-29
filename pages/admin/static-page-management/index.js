import React, { useState, useEffect } from "react"
import { Switch } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import NavBar from "../../../components/layout/NavBar"
import Footer from "../../../components/layout/Footer"
// import { PublicLayout2 } from "../../../components/layout/PublicLayout2"
// import wordpressdata from "../../../lib/wordpressdata"
import axios from "axios"

export default function StaticPage({ posts }) {
  const [pages, setPages] = useState(posts)
  const [deleted, setIsDeleted] = useState(false)
  const [staticPages, setStaticPages] = useState([])

  // function toggleDeleted() {
  //   setIsDeleted(deleted)
  //   console.log("deleted", deleted)
  // }

  const handleSwitch = async (event) => {
    //type string
    let id = event.target.id
    console.log(typeof id)
    await fetch("/api/staticpages")
      .then((res) => res.json())
      .then((res) => setStaticPages(res.data))
      .then((mapData) => console.log("static pages", staticPages))
    setIsDeleted(!deleted)
  }
  const columns = [
    {
      // field: "slug",
      field: "title",
      headerName: "Title",
      width: 450,
      valueGetter: (params) => {
        return params.row.title.rendered
      },
    },
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "col3",
      headerName: "Shown in Learn App",
      width: 150,
      renderCell: (params) => {
        const id = params.id
        return <Switch onClick={handleSwitch} id={id} />
      },
    },
  ]

  // useEffect(() => {
  //   // const url = `api/staticpage/getstaticpages`
  //   // try {
  //   //   async
  //   // }
  //       const url = "/api/staticpage/getstaticpages"
  //       // const params = { slug: query.slug }
  //       // console.log("params", params)
  //       try {
  //         ;(async () => {
  //           const response = await getData(url)
  //           cohort = response.cohort
  //         })()
  //       } catch (error) {
  //         console.log("An error from getData in", url, error)
  //       }
  // })
  // console.log("pages", pages)
  return (
    <>
      <NavBar />
      <div style={{ height: 800, width: "100%" }}>
        <h2>WordPress pages</h2>
        <DataGrid columns={columns} rows={pages} />
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("https://learn.codethedream.org/wp-json/wp/v2/pages")
  const posts = await res.json()
  // const whatever = await wordpressdata()
  // console.log("whatever", whatever)

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
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
