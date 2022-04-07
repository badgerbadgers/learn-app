const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });


async function getGitHub() {
    let result = await octokit.request("GET /orgs/{org}/repos", {
        org: "CodeTheDream",
        type: "private",
      })
    return result.data; 
}

export default getGitHub;



// const result = await request("GET /orgs/{org}/repos", {
//     headers: {
//       authorization: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
//     },
//     org: "CodeTheDream",
//     type: "private",
//   });
  
//   console.log(`${result.data.length} repos found.`);