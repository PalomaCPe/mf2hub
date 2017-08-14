import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
const SERVICE_URL: string = 'api/transaction';
//import * as FileSaver from 'angular-file-saver'; 

@Injectable()
export class TransactionService {
    constructor(
        private _httpService: Http
    ) { }

    getTransations(): Promise<any[]> {
        let url: string = `${SERVICE_URL}/list`;

        return this._httpService.get(url)
            .toPromise()
            .then((response: Response) => {
                return response.json() as any[];
            });
    }

    getTransaction(id: string): Promise<any> {
        let url: string = `${SERVICE_URL}/${id}`;

        return this._httpService.get(url)
            .toPromise()
            .then((response: Response) => {
                console.log(response);
                return response.json() as any;
            });
    }

    getTransactionXls(id: string): Promise<string> {
        let url: string = `${SERVICE_URL}/getXls/${id}`;

        let headers = new Headers();
        headers.append('Content-Type', 'application/vnd.ms-excel');

        let options = new RequestOptions({
            headers: headers
        });

        return this._httpService.get(url, options)
            .toPromise()
            .then((data: any) => {

                // console.log(data);
                // let blob = new Blob([data], { type: 'application/vnd.ms-excel' });

                // let file = new File([blob], 'Template.xls', { type: 'application/vnd.ms-excel' });

                // let url: string = window.URL.createObjectURL(blob);

                // window.open(url);

                window.open(url);

                return "ok";
            });
    }

    createTransactions(transaction: any) {
        let url: string = `${SERVICE_URL}/post`;

        return this._httpService.post(url, { transaction: transaction })
            .toPromise()
            .then((response: Response) => {
                return response.json() as any;
            });
    }
}