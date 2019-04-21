import {PersistentObject} from './PersistentObject';

export abstract class PersistentObjectLogicalDelete extends PersistentObject {
  public isActive: boolean;
}
