// clean up the data and only get an object with id and fields value as key:Value pair..
export const MinifyProjectRecords = (records) => {
  records.map((record) => getMinifyData(record))
}


const getMinifyData = (record => {
    return {
      id: record.id,
      fields: record.fields,
    };
  });
