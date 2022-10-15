export const renderPage = (selector: string, contents: string): void => {
  const root: HTMLElement | null = document.querySelector(selector);
  if (!root) {
    throw new Error(`The root element with selector ${selector} was not found`);
  }
  root.innerHTML = contents;
};
