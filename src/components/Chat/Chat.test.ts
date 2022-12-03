import { Chat } from './Chat';
import { ChatData } from '../../store/Store';

const testData: ChatData = {
  id: 42,
  title: 'test_chat',
  avatar: '',
  created_by: 123,
  unread_count: 0,
  last_message: null,
};

const chat = new Chat({ ...testData, preview: 'test chat', sender: 'me' });

describe('The Chat component', () => {
  test('should have an <li> root element', () => {
    expect(chat.getContent().nodeName).toBe('LI');
  });
  test('should not be selected', () => {
    expect(chat.getContent()).not.toHaveClass('Chat_selected');
  });
  test("should get selected after receiving the 'current' prop", () => {
    chat.setProps({ current: true });
    expect(chat.getContent()).toHaveClass('Chat_selected');
  });
});
