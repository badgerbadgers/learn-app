import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/router"
import getData from "../../../lib/getData"
// import staticpages from "../../../lib/models/StaticPages"

const PageInfo = () => {
  const router = useRouter()
  const query = router.query
  const [lesson, setLesson] = useState(null)
  const [pages, setPages] = useState([])

  useEffect(() => {
    // let page = {}
    // const url = "api/staticpages/id" + `${query.id}`
    // const params = { id: query.id }
    const url = "/static-pages/id/2093"
    try {
      ;(async () => {
        const response = await getData(url)
        //       cohort = response.cohort
        //       setLesson(cohort)
        //       setPages(cohort.schedule)
        //       setLoading(false)
      })()
    } catch (error) {
      console.log("UseEffect getData error", url, error)
    }
  }, [])
  return <Fragment>This is static page management</Fragment>
}

export default PageInfo
