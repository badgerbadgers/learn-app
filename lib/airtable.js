import { getSession } from "next-auth/react";


const Airtable = require("airtable");
const airtable = new Airtable({ apiKey: process.env.NEXT_PUBLIC_AT_KEY })
const projectBase = airtable.base(process.env.AIRTABLE_BASE_PROJECT_ID);
const knowledgeBase = airtable.base(process.env.AIRTABLE_BASE_ID);

const getData = async (tableName, user) => {
 
  try {
    let records;
    // Create the records constant to select all base resources from the items table
    if (tableName === "Projects") {
     
      const currentUserID = ((user.gh).toLowerCase());
// filter developersData to get the current user data based on their githubId which is same as the currentUserID from session.
      const devRecords = await projectBase("People").select({view: "All developers", filterByFormula: `github="${currentUserID}"`}).firstPage();
      const devData = JSON.parse(JSON.stringify(devRecords))
//got the ActiveProjects Array.
      const ActiveProjArr = devData[0].fields["Active Projects"]
    
      const createAString = (ActiveProjArr) => {
        let prjIDs = ''
        ActiveProjArr.forEach(project => {
          prjIDs += `RECORD_ID()='${project}',`       
        });
        const n=prjIDs.lastIndexOf(",");
        const string=prjIDs.substring(0,n) 
        return string;

      }
      const stringOfRec = createAString(ActiveProjArr);

//filter projectsData to get projects where the records match the Active Projects for the current user.
     records = await projectBase("Projects").select({ view: "Active", filterByFormula: `OR(${stringOfRec})`}).all()
     }
     else if (tableName === "People") {
      records = await projectBase("People").select({view: "All developers"}).all();
     }
    else { 
      records = await knowledgeBase(tableName).select().all();
    }
    // Then saved the records as data that is send as json file
    const data = JSON.parse(JSON.stringify(records));// cloning the response
    
    const minifyData = data.map((record) => {
      return {
      id: record.id,
      fields: record.fields,
    }})
    return (minifyData);
  } catch (error) {
    console.log(`Something went wrong :confused:!!  Error with ${tableName} data fetch`, error.message);
  }
};
export const getZoneData = () => getData("Zones");
export const getResourceData = () => getData("resources");
export const getProjectsData = (user) => getData("Projects", user);
export const getDevelopersData = () => getData("People");


export async function getServerSideProps(context) {
  const session = await getSession(context);

  try {
    if (session) {
      //if session exists returnsession,
     
      const { user } = session;
      return {
        props: {
          user
        },
      };
    } // if session doesnt exist.
    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {
        err: "Something went wrong",
      },
    };
  }
}






















