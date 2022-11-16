import { Block, IProps } from '../../classes/Block';

export class Page extends Block {
  setPageTitle(pageTitle: string): void {
    pageTitle = `Messenger ${pageTitle}`;
    const title = document.querySelector('title');
    if (title) {
      title.textContent = pageTitle;
    }
  }
}
export { IProps };
