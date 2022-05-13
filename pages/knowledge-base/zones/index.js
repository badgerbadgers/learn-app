import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import KnowledgePageLayout from "../../../components/knowledgeBase/KnowledgePageLayout";
import SideNav from "./components/SideNav";
import DisplayZones from "./components/DisplayZones";
import { privateLayout } from "../../../components/PrivateLayout";
import { getZoneData } from "../../../lib/airtable";

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
              description: doc.fields.Description.replace(/^\s+|\s+$/g, ""),
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
              description: doc.fields.Description.replace(/^\s+|\s+$/g, ""),
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

Skillszoning.getLayout = privateLayout;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (session) {
    const data = await getResourceData();
    return {
      props: {
        data,
      },
    };
  }
}
