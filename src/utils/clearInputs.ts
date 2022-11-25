export default function clearInputs(this: HTMLFormElement | null, evt: Event) {
  evt.preventDefault();
  const messageInput = this?.querySelector('#message') as HTMLInputElement;
  if (messageInput) {
    messageInput.value = '';
  }
}
