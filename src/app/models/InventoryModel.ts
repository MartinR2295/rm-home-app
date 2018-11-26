import { BaseModel } from "./BaseModel";
import { RMHObjectModel } from "./RMHObjectModel";

export class InventoryModel extends BaseModel {
    object: RMHObjectModel;
    childObject: RMHObjectModel;
  }