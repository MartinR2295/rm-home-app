import { BaseModel } from "./BaseModel";
import { QRCodeModel } from "./QRCodeModel";
import { ObjectProvider } from "./../../providers/object/object";

export class RMHObjectModel extends BaseModel {
  
  public name: string;
  public qrCode: QRCodeModel;
  public disposed: boolean;
  public borrowed: boolean;
  public sellPrice: number;
  public objp: ObjectProvider;

    deserialize(input: any) {
      Object.assign(this, input);
      return this;
    }

    /** Delegates to updateObject with object data
     * @param data 
     */
    save() {
      console.log(this);
      // return this.objp.updateObject(this);
    }
  }