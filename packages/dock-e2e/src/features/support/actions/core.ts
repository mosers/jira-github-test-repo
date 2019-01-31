import { getScope } from "../scope";
import { HOME } from "../pages";

export const visitHomepage = async () => {
  const scope = await getScope();

  if (!scope.browser) {
    scope.browser = await scope.driver.launch({ headless: true, slowMo: 0 });
  }

  scope.context.currentPage = await scope.browser.newPage();
  scope.context.currentPage.setViewport({ width: 1280, height: 1024 });

  const url = `${scope.host}/${HOME}`.replace(/\/$/, "");
  const visit = await scope.context.currentPage.goto(url, {
    waitUntil: "networkidle2",
  });

  return visit;
};
