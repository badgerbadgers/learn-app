import React, { useState, useEffect } from "react";
import KnowledgePageLayout from "../../../components/knowledgeBase/KnowledgePageLayout";
import axios from "axios";
import SideNav from "./components/SideNav";
import DisplayZones from "./components/DisplayZones";

const getData = async () => {
  try {
    let res = await axios.get("/api/airtable", { params: { isZones: true } });
    let data = await res.data;
    return data;
  } catch (e) {
    console.log("ERROR with ZONES FETCH", e.message);
  }
};

function Skillszoning() {
  const [zoningData, setZoningData] = useState([]);
  const [skillID, setSkillID] = useState("");

  // Consuming local JSON data using fetch API from api/airtable.js

  useEffect(() => {
    (async () => {
      const zonesData = await getData();
      setZoningData(zonesData);
      setSkillID(zonesData[0].id);
    })();
  }, []);

  // retrieving only the Technical skills index and puting it in an array

  const techIndex = zoningData.flatMap((doc) =>
    doc.fields["Single Select"] == "Tech Skills"
      ? [
          {
            id: doc.id,
            Name: doc.fields.Name,
          },
        ]
      : []
  );

  const personIndex = zoningData.flatMap((doc) =>
    doc.fields["Single Select"] == "Soft Skills"
      ? [
          {
            id: doc.id,
            Name: doc.fields.Name,
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
