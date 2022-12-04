import prepInputAttrs from './prepInputAttrs';

const type = 'testtype';
const name = 'testname';
const placeholder = 'testplaceholder';
const label = 'testlabel';
const errorMessage = 'testerrorMessage';
const testRE = /^(?=.*\d)(?=.*[A-ZА-Я]).{8,40}$/;

const testData = {
  name,
  label,
  errorMessage,
  type,
  placeholder,
  accept: '',
  value: '',
  test: testRE,
};
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type Result = Record<string, any>;

describe('The prepInputAttrs function', () => {
  const result: Result = prepInputAttrs(testData);
  test('should create a correct attributes property', () => {
    expect(result).toHaveProperty('attributes');
    expect(result.attributes).toEqual({
      type,
      name,
      placeholder,
      id: name,
    });
  });
  test('should keep the orignal properties', () => {
    expect(result).toHaveProperty('name');
    expect(result['name']).toBe(testData['name']);
    expect(result).toHaveProperty('label');
    expect(result['label']).toBe(testData['label']);
    expect(result).toHaveProperty('placeholder');
    expect(result['placeholder']).toBe(testData['placeholder']);
    expect(result).toHaveProperty('errorMessage');
    expect(result['errorMessage']).toBe(testData['errorMessage']);
    expect(result).toHaveProperty('type');
    expect(result['type']).toBe(testData['type']);
    expect(result).toHaveProperty('accept');
    expect(result['accept']).toBe(testData['accept']);
    expect(result).toHaveProperty('value');
    expect(result['value']).toBe(testData['value']);
    expect(result).toHaveProperty('test');
    expect(result['test']).toBe(testData['test']);
  });
});
