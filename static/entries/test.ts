import Button from './test_button';
import { renderDOM } from '../../src/utils/renderDOM';

const button = new Button({
  className: 'my-class',
  child: 'Clickkkk',
});

renderDOM('#app', button);

setTimeout(() => {
  button.setProps({
    className: 'my-class',
    child: 'Click me Please!',
    newStringProp: 'asdf',
    newObjectProp: {
      name: 'Vasya',
    },
    newFunctionProp: () => 'blah',
  });
}, 1000);
