export class User {
  id: string;
  username: string;
  rules: string[];
  isBritish: boolean;
  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
