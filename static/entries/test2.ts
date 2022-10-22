import Page from './test_page';
import Button from './test_button';
import { renderDOM } from '../../src/utils/renderDOM';

const button = new Button({
  className: 'my-class',
  title: 'Clickkkk',
  settings: {
    hasEmail: false,
  },
});

const button2 = new Button({
  className: 'new-class',
  title: 'Button 2',
  settings: {
    hasID: true,
  },
});

const profilePage = new Page({
  userName: 'Vasili Pupkin',
  button,
  buttonTitle: 'Inner Butt',
});

renderDOM('#app', profilePage);

setTimeout(() => {
  button.setProps({
    className: 'my-class',
    title: 'Click me Please!',
    newStringProp: 'asdf',
    newObjectProp: {
      name: 'Vasya',
    },
    newFunctionProp: () => 'blah',
  });
}, 1000);

setTimeout(() => {
  profilePage.setProps({
    button: button2,
    buttonTitle: 'Inner Buttonnn',
  });
}, 3000);
