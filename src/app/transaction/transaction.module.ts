import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//ROTA
import { RouterModule, Router } from '@angular/router';

import { TransactionComponent } from './transaction.component';

import { TransactionService } from './transaction.service';
import { TemplateExcel } from './template';

import { PercentualPipe } from '../shared/percentualPipe';

import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [BrowserModule,
    FormsModule,
    // ROTA
    RouterModule.forChild([
        { path: 'transactions', component: TransactionComponent}
        //{ path: 'booking/:action/:id', component: BookingDetailComponent }
    ])],
    declarations: [ TransactionComponent, PercentualPipe ],
    providers: [ TransactionService, TemplateExcel ]
})

export class TransactionModule { }