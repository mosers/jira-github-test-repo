import { getScope } from "../scope";

export const createShouldSee = (...selectors: string[]) => {
  return async function shouldSee() {
    const {
      context: { currentPage },
    } = await getScope();

    if (!currentPage) {
      throw new Error("Must load a page before invoking shouldSee");
    }

    for (const selector of selectors) {
      if (!(await currentPage.$(selector))) {
        throw new Error(`Selector ${selector} not found`);
      }
    }
  };
};
