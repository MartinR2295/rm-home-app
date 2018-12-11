import { BaseModel } from "./BaseModel";
import { RMHObjectModel } from "./RMHObjectModel";

export class InventoryModel extends RMHObjectModel {
    inventory_id: Number;
    inventory_object_id: Number;
    inventory_child_object_id: Number;
    inventory_created_at: String;
  }