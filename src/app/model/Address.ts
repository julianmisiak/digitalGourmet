import {PersistentObjectLogicalDelete} from "./PersistentObjectLogicalDelete";

export class Address extends PersistentObjectLogicalDelete {
  public province: string;
  public district: string;
  public location: string;
  public postalCode: number;
  public street: string;
  public number: number;
  public isDepartment: boolean;
  public department: string;
  public isDefault: boolean;

}
