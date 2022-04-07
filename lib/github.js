const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
async function getGitHub() {
  const result = await octokit.request("GET /orgs/{org}/members?per_page=100", {
    headers: {
      accept: 'application/vnd.github.v3+json',
    },
    org: "CodeTheDream",
  });
  console.log(result.data, "github");
  return result.data;
}

export default getGitHub;
