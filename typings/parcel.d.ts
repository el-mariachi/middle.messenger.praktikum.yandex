declare module '*.hbs' {
  interface CompiledTemplate {
    value: import('handlebars').TemplateDelegate;
  }
  export default value;
}
