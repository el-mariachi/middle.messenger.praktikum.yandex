import { navigateTo } from './navigateTo';

export function cancelForm(this: HTMLButtonElement, event: Event) {
  if (this.dataset && this.dataset.url) {
    navigateTo(this.dataset.url);
  }
}
