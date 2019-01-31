import { When, Then } from "cucumber";
import { visitHomepage, createShouldSee } from "./actions";

When("I open the dock application", visitHomepage);
Then(
  "I should see a login form",
  createShouldSee("input[type=text]", "input[type=password]"),
);
