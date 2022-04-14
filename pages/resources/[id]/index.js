import React from "react";
import { Grid } from "@mui/material";
import ResourceCards from "./componentes/ResourceCards";
import styles from "../../../styles/Resources.module.css";

function Resources() {
  return (
    <Grid container className="main-card-wrapper">
      <Grid item display="flex" xs={12}>
        {/* <div className={styles.resourcesGrid}>
          <div className={styles.resourcesItem}>
            <div className={styles.innerCard}> */}
              <ResourceCards />
              <ResourceCards />
              <ResourceCards />
              <ResourceCards />
              <ResourceCards />
              <ResourceCards />
            {/* </div>
          </div>
        </div> */}
      </Grid>
    </Grid>
  );
}

export default Resources;
