import { Block, IProps } from '../../classes/Block';

type PageProps = IProps & {
  currentPath: string;
};
export class Page extends Block {
  setPageTitle(pageTitle: string): void {
    pageTitle = `Messenger ${pageTitle}`;
    const title = document.querySelector('title');
    if (title) {
      title.textContent = pageTitle;
    }
  }
}
export { PageProps, IProps };
