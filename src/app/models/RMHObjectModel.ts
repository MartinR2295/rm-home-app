import { BaseModel } from "./BaseModel";
import { QRCodeModel } from "./QRCodeModel";
import { ObjectProvider } from "./../../providers/object/object";

export class RMHObjectModel extends BaseModel {

  public object_name: string;
  public qr_code_string: string;
  public qrCode: QRCodeModel;
  public disposed: boolean;
  public borrowed: boolean;
  public sellPrice: number;

    deserialize(input: any) {
      Object.assign(this, input);
      return this;
    }
    /** Delegates to updateObject with object data
     * @param data 
     */
    save() {
      console.log();
      // return this.objp.updateObject('object', JSON.stringify(this));
    }
  }