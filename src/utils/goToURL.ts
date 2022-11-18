import { navigateTo } from './navigateTo';

export function goToURL(this: HTMLElement) {
  if (this.dataset && this.dataset.url) {
    navigateTo(this.dataset.url);
  } else if (this.hasAttribute('href')) {
    const url = this.getAttribute('href');
    if (url) {
      navigateTo(url);
    }
  }
}
