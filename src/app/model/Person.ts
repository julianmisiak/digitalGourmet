import {PersistentObjectLogicalDelete} from './PersistentObjectLogicalDelete';
import {Gender} from './Gender';

export abstract class Person extends PersistentObjectLogicalDelete {
  public name: string;
  public surname: string;
  public idCard: number;
  public gender: Gender;
  public email: string;

}
