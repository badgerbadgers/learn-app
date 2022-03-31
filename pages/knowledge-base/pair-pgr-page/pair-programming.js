import React from "react";
import PairPrgBody from "./components/PairPrgBody";
import KnowledgePageLayout from "../../../components/knowledgeBase/KnowledgePageLayout";
import PairPrgNav from "./components/PairPrgNav";
import PairPrgTitle from "./components/PairPrgTitle";
import { pairProgrammingInfo } from "../../../lib/pairPrgInfo";

import { CssBaseline } from "@mui/material";

const PairProgrammingPage = () => {
  const [value, setValue] = React.useState(0);

  //function to set an active tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <CssBaseline />
      <KnowledgePageLayout
        title={<PairPrgTitle />}
        index={
          <PairPrgNav
            value={value}
            handleChange={handleChange}
            pairProgrammingInfo={pairProgrammingInfo}
          />
        }
        body={
          <PairPrgBody
            pairProgrammingInfo={pairProgrammingInfo}
            value={value}
          />
        }
      ></KnowledgePageLayout>
    </>
  );
};

export default PairProgrammingPage;
