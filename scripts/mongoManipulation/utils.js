
exports.getConfigParam = async (key) => { // prevent exposing keys
    let param;
   const fs = require("fs");
    try {
        const data = await fs.promises.readFile("../../.env.local", "utf8");
        param = data.match(key)[1]; //TODO: handle possible index error
    } catch (err) {
        console.error(err);
    }
    return param;
} 
