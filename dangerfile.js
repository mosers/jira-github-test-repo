const {danger, warn} = require('danger')

  
// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn('Please include a description of your PR changes.');
}

import jiraIssue from "danger-plugin-jira-issue";

jiraIssue({
  key: "TJG",
  url: "https://mosers.atlassian.net/browse",
  emoji: ":paperclip:",
  format(emoji, jiraUrls) {
    // Optional Formatter
    return "Some Custom Message";
  },
  location: "title" // Optional location, either 'title' or 'branch'
});