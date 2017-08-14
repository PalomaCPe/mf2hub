import { Component, OnInit } from '@angular/core';

import { TransactionService } from './transaction.service';

import { Transaction } from '../../api/model/transaction';
import { Template } from '../../api/model/template';
//import {  } from 'excellentexport';
const SERVICE_URL: string = 'api/transaction';
@Component({
    moduleId: module.id,
    templateUrl: 'transaction.html'
})

export class TransactionComponent implements OnInit {
    constructor(
        private _service: TransactionService
    ) { }

    pageName: string = 'Buscar transações';
    transactions: Transaction[];
    transaction: string;
    show: boolean;

    ngOnInit() {           
    }

    getTransaction() {
        this._service.getTransaction(this.transaction)
            .then((result: Transaction[]) => {
                this.transactions = result;
                this.show = true;
            });
    }

    getFile(){        
        let url: string = `${SERVICE_URL}/getXls/${this.transaction}`;
        window.open(url);

        // this._service.getTransactionXls(this.transaction)
        //     .then((result: string) => {
        //         console.log(result);
        //     });
    }    

    back(){
        this.show = false;
    }
}