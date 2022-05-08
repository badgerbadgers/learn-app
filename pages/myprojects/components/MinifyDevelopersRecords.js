// clean up the data and only get an object with id and fields value as key:Value pair..
export const MinifyDevelopersRecords = (records) => {
  const dataObject = {};
  records.forEach((record) => (dataObject[record.id] = record.fields));
  return dataObject;
};
