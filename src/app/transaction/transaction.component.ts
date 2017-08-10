import { Component, OnInit } from '@angular/core';

import { TransactionService } from './transaction.service';
import { Transaction } from './transaction';
import { TransactionTest } from './transactionTest';

import { TemplateExcel } from './template';

@Component({
    moduleId: module.id,
    templateUrl: 'transaction.html'
})

export class TransactionComponent implements OnInit {
    constructor(
        private _service: TransactionService,
        private _tempService: TemplateExcel
    ) { }

    pageName: string = 'Buscar transações';
    transactions: TransactionTest[];
    transaction: string;
    show: boolean;

    ngOnInit() {           
    }

    getTransaction() {
        this._service.getTransaction(this.transaction)
            .then((result: TransactionTest[]) => {
                this.transactions = result;
                this.show = true;
            });
    }

    getFile(){
        this._service.getTransaction(this.transaction)
        .then((result: TransactionTest[]) => {
            this._tempService.createFile(result); 
        });
    }

    back(){
        this.show = false;
    }
}