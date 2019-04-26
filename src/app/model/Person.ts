import {PersistentObjectLogicalDelete} from './PersistentObjectLogicalDelete';
import {Gender} from './Gender';
import {Address} from './Address';

export abstract class Person extends PersistentObjectLogicalDelete {
  public name: string;
  public surname: string;
  public idCard: number;
  public gender: Gender;
  public email: string;
  public addresses: Array<Address>;

  constructor() {
    super();
    this.addresses = new Array<Address>();
  }
}
