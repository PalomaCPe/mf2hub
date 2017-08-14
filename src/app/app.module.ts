import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// ROTA
import { RouterModule, Router } from '@angular/router';
import * as FileSaver from 'file-saver'; 

import { AppComponent } from './app.component';
import { TransactionModule } from './transaction/transaction.module';

import { HttpModule } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@NgModule({                                     
    imports: [BrowserModule, 
    TransactionModule,
    HttpModule,
    RouterModule //ROTA
        .forRoot([{ path: '', redirectTo: '/', pathMatch: 'full' }])],
    declarations: [AppComponent ],
    bootstrap: [AppComponent]
})

export class AppModule { }