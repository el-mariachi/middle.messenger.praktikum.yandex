export function logForm(this: HTMLFormElement | null, evt: Event): void {
  evt.preventDefault();
  const formData: { [k: string]: FormDataEntryValue } = {};
  if (!(this instanceof HTMLFormElement)) {
    /* eslint-disable-next-line no-console */
    console.log('Form not valid');
    return;
  }
  const myFormData = new FormData(this);
  for (const [key, value] of myFormData.entries()) {
    formData[key] = value;
  }
  /* eslint-disable-next-line no-console */
  console.log(formData);
}
