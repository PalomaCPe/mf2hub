import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//ROTA
import { RouterModule, Router } from '@angular/router';

import { TransactionComponent } from './transaction.component';

import { TransactionService } from './transaction.service';

import { PercentualPipe } from '../shared/percentualPipe';

import { FormsModule } from '@angular/forms';

import * as XLSX from 'xlsx';

@NgModule({
    imports: [BrowserModule,
    FormsModule,
    // ROTA
    RouterModule.forChild([
        { path: 'transactions', component: TransactionComponent}
    ])],
    declarations: [ TransactionComponent, PercentualPipe ],
    providers: [ TransactionService ]
})

export class TransactionModule { }