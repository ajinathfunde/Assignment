import * as fs from 'fs';
import * as path from 'path';

interface CustomerData {
  FirstName: string;
  LastName: string;
  Postalcode: string;
}

export class CustomerInfo {
  private customerData: CustomerData;

  constructor() {
    this.customerData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../TestData/CustomerCheckoutDetails.json'), 'utf-8'));
  }

  get FirstName(): string {
    return this.customerData.FirstName;
  }

    get LastName(): string {
    return this.customerData.LastName;
    }

  get Postalcode(): string {
    return this.customerData.Postalcode;
  }
}
//const customerInfo: CustomerInfo = new CustomerInfo();
//export default customerInfo;