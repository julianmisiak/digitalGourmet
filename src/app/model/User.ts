import {Person} from './Person';
import {Role} from './Role';

export class User extends Person {
  public userName: string;
  public password: string;
  public roles: Array<Role>;

  constructor() {
    super();
    this.roles = new Array<Role>();
  }
}
