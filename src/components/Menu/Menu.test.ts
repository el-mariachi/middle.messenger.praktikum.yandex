import { Menu } from './Menu';
const menu = new Menu({});

describe('The Menu component', () => {
  test('should have a <nav> root element', () => {
    expect(menu.getContent().nodeName).toBe('NAV');
  });
  test('should have Menu class', () => {
    expect(menu.getContent()).toHaveClass('Menu');
  });
  test("should receive Menu_active class when called it's show() method", () => {
    menu.show();
    expect(menu.getContent()).toHaveClass('Menu_active');
  });
});
