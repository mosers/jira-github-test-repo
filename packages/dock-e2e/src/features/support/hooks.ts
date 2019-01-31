// Dependencies
import { After, Before, AfterAll } from "cucumber";
import { getScope } from "./scope";

Before(async function() {
  // Cleanup
});

After(async function() {
  const scope = await getScope();

  if (scope.browser && scope.context.currentPage) {
    const cookies = await scope.context.currentPage.cookies();

    if (cookies && cookies.length > 0) {
      await scope.context.currentPage.deleteCookie(...cookies);
    }

    await scope.context.currentPage.close();

    scope.context.currentPage = null;
  }
});

AfterAll(async function() {
  const scope = await getScope();

  if (scope.browser) {
    await scope.browser.close();
  }

  console.log("\n");
  scope.dock.shutdown(() => console.log("Shut down Lineage Dock"));
  scope.dockAPI.shutdown(() => console.log("Shut down Lineage Dock API"));
});
