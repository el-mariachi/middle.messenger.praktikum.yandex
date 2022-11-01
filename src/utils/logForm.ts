export function logForm(form: HTMLFormElement): void {
  const formData: { [k: string]: FormDataEntryValue } = {};
  if (!(form instanceof HTMLFormElement)) {
    /* eslint-disable-next-line no-console */
    console.log('Form not valid');
    return;
  }
  const myFormData = new FormData(form);
  for (const [key, value] of myFormData.entries()) {
    formData[key] = value;
  }
  /* eslint-disable-next-line no-console */
  console.log(formData);
}
