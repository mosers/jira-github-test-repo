const { danger, warn } = require("danger");

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn("Please include a description of your PR changes.");
}

const jiraIssue = require("danger-plugin-jira-issue").default;

jiraIssue({
  key: "TJG",
  url: "https://mosers.atlassian.net/browse",
  emoji: ":paperclip:",
  location: "title", // Optional location, either 'title' or 'branch'
});

const path = require("path");
const tslint = require("danger-plugin-tslint").default;

// Handle TSLint results in `reports/lint-results.json` and leave a Danger comment on the PR
tslint({
  lintResultsJsonPath: path.resolve(__dirname, "reports", "lint-results.json"),
});
