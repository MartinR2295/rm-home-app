import { BaseModel } from "./BaseModel";
import { QRCodeModel } from "./QRCodeModel";
import { ObjectProvider } from "./../../providers/object/object";
import { InventoryModel } from "./InventoryModel";

export class RMHObjectModel extends BaseModel {

  public object_name: string;
  public qr_code_string: string;
  public object_qr_code: QRCodeModel;
  public object_disposed: boolean;
  public object_borrowed: boolean;
  public sellPrice: number;
  public object_parent: InventoryModel;

    deserialize(input: any) {
      Object.assign(this, input);
      return this;
    }

  }