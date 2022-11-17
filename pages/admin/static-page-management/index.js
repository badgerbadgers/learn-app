import React, { useEffect, useState } from "react"
import { Switch, FormControlLabel } from "@mui/material"
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid"

export default function StaticPage({ posts }) {
  const [pages, setPages] = useState([])
  const [hidden, setIsHidden] = useState(false)

  function toggleHidden() {
    setIsHidden(!hidden)
    console.log("hidden", hidden)
  }
  // const GridRowsProp = [
  //   {
  //     getRowId: 1,
  //     col1: "Hello",
  //     col2: "World",
  //     col3: <Switch onClick={toggleHidden} />,
  //   },
  //   {
  //     getRowId: 2,
  //     col1: "DataGridPro",
  //     col2: "is Awesome",
  //     col3: <Switch onClick={toggleHidden} />,
  //   },
  //   {
  //     id: 3,
  //     col1: "MUI",
  //     col2: "is Amazing",
  //     col3: <Switch onClick={toggleHidden} />,
  //   },
  // ]

  // const GridColDef = [
  //   { field: "col1", headerName: "Page ID", width: 150 },
  //   { field: "col2", headerName: "Title", width: 150 },
  //   { field: "col3", headerName: "Shown On Learn App", width: 150 },
  // ]

  useEffect(() => {
    setPages(posts)
  }, [])
  // console.log("posts", posts)
  return (
    <div style={{ height: 350, width: "100%" }}>
      <h2>WordPress pages</h2>
      <DataGrid
        rows={[
          {
            id: 1,
            col1: "Hello",
            col2: "World",
            // col3: <Switch onClick={toggleHidden} />,
          },
          {
            id: 2,
            col1: "DataGridPro",
            col2: "is Awesome",
            col3: <Switch onClick={toggleHidden} />,
          },
          {
            id: 3,
            col1: "MUI",
            col2: "is Amazing",
            col3: <Switch onClick={toggleHidden} />,
          },
        ]}
        columns={[
          { field: "col1", headerName: "Page ID", width: 150 },
          { field: "col2", headerName: "Title", width: 150 },
          { field: "col3", headerName: "Shown On Learn App", width: 150 },
        ]}
        getRowId={(row) => row.id}
      />
    </div>
  )
}

export async function getStaticProps() {
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
