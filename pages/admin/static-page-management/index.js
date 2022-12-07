import React, { useState, useEffect } from "react"
import { Switch } from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import NavBar from "../../../components/layout/NavBar"
import Footer from "../../../components/layout/Footer"
// import { PublicLayout2 } from "../../../components/layout/PublicLayout2"
// import wordpressdata from "../../../lib/wordpressdata"

export default function StaticPage({ posts }) {
  const [pages, setPages] = useState(posts)
  const [checked, setChecked] = useState(true)
  const [staticPages, setStaticPages] = useState([])

  const handleChange = async (event) => {
    setChecked(!checked)
    //type string
    let id = event.target.id
    let deleted = event.target.checked
    await fetch("/api/staticpages", {
      method: "PATCH",
      // body: id,
      // body: JSON.stringify({ id, deleted }),
      body: JSON.stringify({ id, deleted }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // await fetch("/api/staticpages", { method: "PATCH" })
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => setStaticPages(res.data))
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
// StaticPage.getLayout = function getLayout(pages) {
//   return (
//     <>
//       <PublicLayout2>{pages}</PublicLayout2>
//     </>
//   )
// }
