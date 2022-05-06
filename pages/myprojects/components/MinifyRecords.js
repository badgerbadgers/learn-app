// clean up the data and only get the id and fields value.
export const MinifyRecords = (records) => {
    return records.map(record => getMinifiedData(record))
  }
  
  const getMinifiedData = (record) => {
    return {
      id: record.id,
      fields: record.fields,
    }
  }

