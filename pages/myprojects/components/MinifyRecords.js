// clean up the data and only get the id and fields value.
export const MinifyRecords = (records) => {
  //console.log(records, "*****MinifyRecords")
      return records.map(record => getMinifiedData(record))
  }
  
      //   return records.map(record => {
    //     if(record._table.name === "People") {
    //     getMinifiedData(record)
    //   }else {
    //   getProjectMinifiedData(record)
    //   }
    // })}
  const getMinifiedData = (record) => {
    return {
      id: record.id,
      fields: record.fields,
    }
  }

  // const getProjectMinifiedData = (record) => {
  //   return {
  //     id: record.id,
  //     fields: record.fields,
  //     developerName: [],
  //   }
  // }

