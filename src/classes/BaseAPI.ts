/* eslint-disable @typescript-eslint/no-unused-vars */
export abstract class BaseAPI {
  // @ts-expect-error unused var
  create(options: unknown): Promise<XMLHttpRequest> {
    throw 'unimplemented';
  }
  // @ts-expect-error unused var
  request(options: unknown): Promise<XMLHttpRequest> {
    throw 'unimplemented';
  }
  // @ts-expect-error unused var
  update(options: unknown): Promise<XMLHttpRequest> {
    throw 'unimplemented';
  }
  // @ts-expect-error unused var
  delete(options: unknown): Promise<XMLHttpRequest> {
    throw 'unimplemented';
  }
}
