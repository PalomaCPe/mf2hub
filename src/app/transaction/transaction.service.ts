import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
const SERVICE_URL: string = 'api/transaction';

@Injectable()
export class TransactionService {
    constructor(
        private _httpService: Http
    ){}

    getTransations(): Promise<any[]> {
        let url: string = `${SERVICE_URL}/list`;

        return this._httpService.get(url)
            .toPromise()
            .then((response: Response) => {
                return response.json() as any[];
            });
     }

     getTransaction(id: string): Promise<any>{
         let url: string = `${SERVICE_URL}/${id}`;

         return this._httpService.get(url)
            .toPromise()
            .then((response: Response) => {
                return response.json() as any;
            });
     }


     getTransactionJson(id: string): Promise<any>{
         let url: string = `${SERVICE_URL}/${id}`;

         return this._httpService.get(url)
            .toPromise()
            .then((response: Response) => {
                return response as any;
            });
     }

     createTransactions(transaction: any){
         let url: string = `${SERVICE_URL}/post`;

         return this._httpService.post(url, { transaction: transaction })
            .toPromise()
            .then((response: Response) => {
                return response.json() as any;
            });
     }
}