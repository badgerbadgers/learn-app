import React, { useState } from "react"
import { Switch } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import NavBar from "../../../components/layout/NavBar"
import Footer from "../../../components/layout/Footer"
// import { PublicLayout2 } from "../../../components/layout/PublicLayout2"
// import styles from "../../../styles"

export default function StaticPage({ posts }) {
  const [pages, setPages] = useState(posts)
  const [hidden, setIsHidden] = useState(false)

  function toggleHidden() {
    setIsHidden(!hidden)
    console.log("hidden", hidden)
  }

  const columns = [
    {
      field: "rendered",
      headerName: "Title",
      width: 450,
      // valueGetter: getNestedObject,
      // renderCell: (params) => (
      //   <ul className='flex'>
      //     {params.value.map((title, index) => (
      //       <li key={index}>{title.rendered}</li>
      //     ))}
      //   </ul>
      // ),
    },
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "col3",
      headerName: "Shown in Learn App",
      width: 150,
      renderCell: (params) => {
        return <Switch onClick={toggleHidden} />
      },
    },
  ]

  console.log("pages", pages)
  return (
    <>
      <NavBar />
      <div style={{ height: 700, width: "100%" }}>
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

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

// StaticPage.getLayout = PublicLayout2
// import * as React from "react"
// import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"

// const rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
//   { id: 3, col1: "MUI", col2: "is Amazing" },
// ]

// const columns = [
//   { field: "col1", headerName: "Column 1", width: 150 },
//   { field: "col2", headerName: "Column 2", width: 150 },
// ]

// export default function App() {
//   return (
//     <div style={{ height: 300, width: "100%" }}>
//       <DataGrid rows={rows} columns={columns} />
//     </div>
//   )
// }
