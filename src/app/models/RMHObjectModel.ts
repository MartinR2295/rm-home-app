import { BaseModel } from "./BaseModel";
import { QRCodeModel } from "./QRCodeModel";

export class RMHObjectModel extends BaseModel {
    name: string;
    qrCode: QRCodeModel;
    disposed: boolean;
    borrowed: boolean;
    sellPrice: number;
  }