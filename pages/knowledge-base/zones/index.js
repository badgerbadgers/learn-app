import React, { useState, useEffect, memo } from "react";
import KnowledgePageLayout from "../../../components/knowledgeBase/KnowledgePageLayout";
import axios from "axios";
import SideNav from "./components/SideNav";
import DisplayZones from "./components/DisplayZones";
import getData from "../../../lib/getData";

const url = "/api/airtable";
const params = { params: { isZones: true } };

function Skillszoning() {
  const [zoningData, setZoningData] = useState([]);
  const [skillID, setSkillID] = useState("");

  // Consuming local JSON data using fetch API from api/airtable.js using the getData function from lib.

  useEffect(() => {
    (async () => {
      const zonesData = await getData(params, url);
      setZoningData(zonesData);
      setSkillID(zonesData[0].id);
    })();
  }, []);

  // retrieving only the Technical skills index and puting it in an array

  const techIndex =
    zoningData &&
    zoningData.flatMap((doc) =>
      doc.fields["Single Select"] == "Tech Skills"
        ? [
            {
              id: doc.id,
              Name: doc.fields.Name,
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
