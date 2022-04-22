import React, { useState, useEffect, memo } from "react";
import KnowledgePageLayout from "../../../components/knowledgeBase/KnowledgePageLayout";
import SideNav from "./components/SideNav";
import DisplayZones from "./components/DisplayZones";
import Airtable from "airtable";
import Loading from "../../../components/Loading";

function Skillszoning({ data }) {
  const [zoningData, setZoningData] = useState([]);
  const [skillID, setSkillID] = useState("recAbypHkbRlSb5Ha");

  useEffect(() => {
    setZoningData(data);
  }, [data]);

  // retrieving only the Technical skills index and putting it in an array

  const techIndex =
    zoningData &&
    zoningData.flatMap((doc) =>
      doc.fields["Single Select"] == "Tech Skills"
        ? [
            {
              id: doc.id,
              Name: doc.fields.Name,
              description: doc.fields.Description.replace(/^\s+|\s+$/g, "")
            },
          ]
        : []
    );

  const personIndex =
    zoningData &&
    zoningData.flatMap((doc) =>
      doc.fields["Single Select"] == "Soft Skills"
        ? [
            {
              id: doc.id,
              Name: doc.fields.Name,
              description: doc.fields.Description.replace(/^\s+|\s+$/g, "")
            },
          ]
        : []
    );

  // Filtering the zoningdata based on the zonesID received from the sideNav.

  const skillData = zoningData.filter((doc) => {
    if (doc.id == skillID) {
      return [doc.fields];
    }
  });

  return (
    <KnowledgePageLayout
      title="Skills Zoning"
      index={
        <SideNav
          techIndex={techIndex}
          personIndex={personIndex}
          skillID={skillID}
          setSkillID={setSkillID}
        />
      }
      body={<DisplayZones skillData={skillData} />}
    />
  );
}

export default Skillszoning;

export async function getStaticProps() {
  const base = new Airtable({ apiKey: process.env.AT_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
  try {
    const records = await base("Zones").select().all();
    const data = JSON.parse(JSON.stringify(records));

    return {
      props: {
        data,     },
    };
  } catch (e) {
    console.log("ERROR with ZONES FETCH", e.message);
  }
}

// Skillszoning.auth = true;

Skillszoning.auth = {
  role: "admin",
  loading: <Loading />,
  unauthorized: "/", // redirect to this url
}
