import { EventsProp } from '../classes/Block';
import { InputProps } from '../components/InputGroup';
import inputBlurHandler from '../controllers/inputBlurHandler';
import inputFocusHandler from '../controllers/inputFocusHandler';

const addedHandlers: EventsProp = {
  blur: inputBlurHandler,
  focus: inputFocusHandler,
};

export default function addInputHandlers(props: InputProps) {
  const { events } = props;
  Object.entries(addedHandlers).forEach(([eventName, localHandler]) => {
    // merge in outer events
    if (events && events[eventName]) {
      addedHandlers[eventName] = [...[events[eventName]].flat()].concat(localHandler);
      delete events[eventName]; // we don't need it anymore
    }
  });
  // Pass down what's left of outer events if any
  Object.assign(addedHandlers, events);
  return { ...props, events: addedHandlers };
}
