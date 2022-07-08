import { BaseAPI } from "./base.api";

export class ReceiptAPI extends BaseAPI {
  public async downloadReceipt(orderId: any) {
    const url = `${this.baseUrl}/api/receipt/get?id=${orderId}`;

    const result = await fetch(url, {
      method: "GET",
      headers: this.createHeader(),
    });

    const blob = await result.blob();

    let downloadUrl = window.URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "receipt.pdf";
    a.target = "_blank";
    a.click();
  }
}
