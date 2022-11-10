import { InputProps } from '../components/InputGroup';

export default function prepInputAttrs(inputData: InputProps) {
  const { type, name, placeholder } = inputData;
  const attributes = { type, name, placeholder, id: name };
  return { ...inputData, attributes };
}
