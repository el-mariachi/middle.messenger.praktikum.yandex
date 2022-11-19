import { Block, IProps } from '../classes/Block';
import store, { State } from '../store/Store';
import { EVENTS } from '../constants/events';
import isEqual from './isEqual';

export function connect(mapStateToProps: (state: State) => State) {
  return function (Component: typeof Block) {
    return class extends Component {
      constructor(props: IProps) {
        let state = mapStateToProps(store.getState());
        super({ ...props, ...state });

        store.on(EVENTS.STORE_UPDATED, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
            state = newState;
          }
        });
      }
    };
  };
}
