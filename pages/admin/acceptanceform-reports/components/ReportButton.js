import React from "react";
import Button from "@mui/material/Button";
import axios from "axios";

const ReportButton = () => {
  const handleExportButtonClick = async () => {
    try {
      const response = await axios.get("/api/acceptanceformReports", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "acceptanceform.csv";
      a.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button color="primary" onClick={handleExportButtonClick}>
      Download report in CSV file
    </Button>
  );
};

export default ReportButton;
