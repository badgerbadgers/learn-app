import axios from "axios";
 
 const getData = async (params, url) => {
    try {
      let res = await axios.get(url, params);
      let data = await res.data;
      return data;
    } catch (error) {
      console.log(error, `error - getData in ${url} route`);
    }
  };

  export default getData;
