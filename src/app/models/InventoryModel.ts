import { BaseModel } from "./BaseModel";
import { RMHObjectModel } from "./RMHObjectModel";

export class InventoryModel extends RMHObjectModel {
    inventory_id: Number;
    inventory_object_id: Number;
    inventory_child_object_id: Number;
    inventory_created_at: String;
    inventory_object_qr_code_string: String;
    inventory_child_object_qr_code_string: String;
    inventory_object: RMHObjectModel;
    inventory_child_object: RMHObjectModel;
    
  }