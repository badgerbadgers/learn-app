const { Octokit } = require("@octokit/core");
const octokit = new Octokit({ auth: process.env.GITHUB_PERSONAL_ACCESS_TOKEN });

// Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
const getGitHubMembers = async () => {
  const result = await octokit.request("GET /orgs/{org}/members?per_page=100", {
    headers: {
      accept: "application/vnd.github.v3+json",
    },
    org: "CodeTheDream",
  });
  console.log(result.data, "github members array");
  return result.data;
};

const getGitHubRepos = async () => {
  const result = await octokit.request("GET /orgs/{org}/repos?per_page=100", {
    headers: {
      accept: "application/vnd.github.v3+json",
    },
    org: "CodeTheDream",
  });
  console.log(result.data, "github repos");
  return result.data;
};


export { getGitHubMembers, getGitHubRepos};
