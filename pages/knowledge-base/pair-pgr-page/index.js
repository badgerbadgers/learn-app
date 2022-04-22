import React, {useState} from "react";
import PairPrgBody from "./components/PairPrgBody";
import KnowledgePageLayout from "../../../components/knowledgeBase/KnowledgePageLayout";
import PairPrgNav from "./components/PairPrgNav";
import PairPrgTitle from "./components/PairPrgTitle";
import { pairProgrammingInfo } from "../../../lib/pairPrgInfo";

const PairProgrammingPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  //function to set an active tab
  const handleActiveTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    
      <KnowledgePageLayout
        title={<PairPrgTitle />}
        index={
          <PairPrgNav
            value={activeTab}
            handleActiveTab={handleActiveTab}
            pairProgrammingInfo={pairProgrammingInfo}
          />
        }
        body={
          <PairPrgBody
            pairProgrammingInfo={pairProgrammingInfo}
            value={activeTab}
          />
        }
      ></KnowledgePageLayout>
   
  );
};

export default PairProgrammingPage;
