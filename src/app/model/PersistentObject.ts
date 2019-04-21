export abstract class PersistentObject {
  public oid: number;
  public creationUser: string;
  public modificationUser: string;
  public createTimestamp: Date ;
  public modificationTimestamp: Date ;
}
