import {AccessResource} from './AccessResource';
import {PersistentObjectLogicalDelete} from './PersistentObjectLogicalDelete';


export class Role extends PersistentObjectLogicalDelete {
  public name: string;
  public description: string;
  public accessResources: Array<AccessResource>;

  constructor() {
    super();
    this.accessResources = new Array<AccessResource>();
  }
}
