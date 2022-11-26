import { InputProps } from '../components/InputGroup';

export const makeDisabled = (props: InputProps) => ({ ...props, disabled: true });
