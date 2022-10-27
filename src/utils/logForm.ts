export function logForm(this: HTMLFormElement, evt: Event): void {
  evt.preventDefault();
  const formData: { [k: string]: FormDataEntryValue } = {};
  const myFormData = new FormData(this);
  for (const [key, value] of myFormData.entries()) {
    formData[key] = value;
  }
  /* eslint-disable-next-line no-console */
  console.log(formData);
}
