import Input from '../components/Input';
import InputError from '../components/InputError';
import InputGroup, { InputProps } from '../components/InputGroup';

export default function createInput(inputData: InputProps) {
  const { errorMessage } = inputData;
  const { type, name, placeholder } = inputData;
  const attributes = { type, name, placeholder };
  const input = new Input({ ...inputData, attributes });
  const inputError = new InputError({ errorMessage });
  const inputGroup = new InputGroup({
    input,
    inputError,
  });
  return inputGroup;
}
