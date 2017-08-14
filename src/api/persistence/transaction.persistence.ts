import { MongoClient, Db, InsertOneWriteOpResult, FindAndModifyWriteOpResultObject } from 'mongodb';

import { Connection } from './connection';
import { Transaction } from '../model/transaction';
import { Template } from '../model/template';

var excel = require('excel4node');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var modelCampoMF: Transaction;
var modelCampoSOA: Template;

export class TransactionPersistence {
    list(): Promise<Transaction[]> {
        let database: Db;
        return Promise.resolve(
            Connection.conn()
                .then((db: Db) => {
                    database = db;

                    return db.collection('transactions').find().toArray();
                })
                .then((result: Transaction[]) => {
                    database.close();

                    return result;
                })
        );
    }

    read(id: string): Promise<Transaction[]> {
        let database: Db;
        return Promise.resolve(
            Connection.conn()
                .then((db: Db) => {
                    database = db;

                    return db.collection('transactions').find({ code: id }).toArray();
                })  
                .then((transaction: Transaction[]) => {
                    database.close();

                    return transaction as Transaction[];
                })
        );
    }

    soaDetails: Template[];
    getDetail(): Promise<Template[]> {
        let database: Db;
        return Promise.resolve(
            Connection.conn()
                .then((db: Db) => {
                    database = db;

                    return db.collection('campo_soa').find().toArray();
                })
                .then((data: Template[]) => {
                    database.close();

                    return data as Template[];
                })
        );

    }

    readAndDownload(id: string, res: any) {
        let database: Db;

        this.getDetail()
        .then((result: Template[]) => {
            this.soaDetails = result;
        });;

        return Promise.resolve(
            Connection.conn()
                .then((db: Db) => {
                    database = db;

                    return db.collection('transactions').find({ code: id }).toArray();
                })
                .then((transaction: Transaction[]) => {
                    let soaService = {};

                    let workbook = this.createTemplate(transaction);

                    workbook.write('Template'+id+'.xlsx', res);

                    let teste = workbook;

                    database.close();
                })
        );
    }

    sendFile(obj: any): any{
        return obj;
    }

    createTemplate(data: any): any {
        let workbook = new excel.Workbook();
        let worksheetInput = workbook.addWorksheet('Input');
        let worksheetOutput = workbook.addWorksheet('Output');

        this.setCabecalho(worksheetInput);
        this.setCabecalho(worksheetOutput);

        let dataInput = data.filter(x => x.type == 'Entrada');
        let dataOutput = data.filter(x => x.type == 'Saída');

        this.setTabela(worksheetInput, dataInput);
        this.setTabela(worksheetOutput, dataOutput);

        return workbook;
    }

    setCabecalho(worksheet: any) {
        worksheet.cell(1, 1).string('IIB');
        worksheet.cell(1, 2).string('Backend');
        worksheet.cell(1, 3).string('ZUP');
        worksheet.cell(1, 4).string('Valor');
        worksheet.cell(1, 5).string('Tipo');
        worksheet.cell(1, 6).string('Cardinalidade');
        worksheet.cell(1, 7).string('Descricao');
    }

    setTabela(worksheet: any, campos: any) {
        for (var i = 0, len = campos.length; i < len; i++) {
            var row = i + 2;
            let detail: Template;

            detail = this.soaDetails.find(x => x.Backend == campos[i].field);
            if (detail == undefined) {
                detail = new Template();
                detail.IIB = '';
                detail.ZUP = '';
                detail.Valor = '';
                detail.Tipo = 'String';
                detail.Cardinalidade = '[0-1]';
                detail.Descricao = 'Campo';
            }

            worksheet.cell(row, 1).string(detail.IIB); //iib
            worksheet.cell(row, 2).string(campos[i].field); //backend
            worksheet.cell(row, 3).string(detail.ZUP); //zup
            worksheet.cell(row, 4).string(detail.Valor); //value
            worksheet.cell(row, 5).string(detail.Tipo); //type
            worksheet.cell(row, 6).string(detail.Cardinalidade); //Cardinalidade
            worksheet.cell(row, 7).string(detail.Descricao); //Descricao
        }
    }


    create(transaction: Transaction): Promise<Transaction> {
        let database: Db;
        let body: string = JSON.stringify(transaction);

        return Promise.resolve(
            Connection.conn()
                .then((db: Db) => {
                    database = db;

                    return db.collection('transactions').insertOne({
                        Transacao: transaction.code,
                        Tipo: transaction.type,
                        Formato: transaction.format,
                        Seq: transaction.sequence,
                        Campo: transaction.field,
                        Literal: transaction.literal,
                        Delimitador: transaction.delimiter,
                        Atributo: transaction.attribut,
                        Tamanho: transaction.size,
                        Tipo2: transaction.secondeType
                    })
                })
                .then((inserted: InsertOneWriteOpResult) => {
                    if (inserted.result.ok == 1) {
                        let saved: Transaction = inserted.ops[0] as Transaction;

                        return saved;
                    }
                    else {
                        return Promise.reject<Transaction>(Error('Erro ao inserir'));
                    }
                })
        );
    }

    update(transaction: Transaction): Promise<Transaction> {
        return null;
        // let database: Db;

        // return Promise.resolve<Booking>(
        //     Connection.conn()
        //         .then((db: Db) => {
        //             database = db;
        //             return db.collection('booking').findOneAndUpdate({ id: booking.id }, {
        //                 id: booking.id,
        //                 startDate: booking.startDate,
        //                 endDate: booking.endDate,
        //                 percentual: booking.percentual,
        //                 projectId: +booking.projectId,
        //                 professionalId: +booking.professionalId,
        //                 project: null,
        //                 professional: null,
        //                 deleted: booking.deleted
        //             }, { returnOriginal: false });
        //         })
        //         .then((updateResult: FindAndModifyWriteOpResultObject) => {
        //             database.close();

        //             if (updateResult.ok == 1)
        //                 return updateResult.value;
        //             else
        //                 return Error("An error ocurred while triyng to update a record");
        //         }));
    }

    delete(id: number): Promise<boolean> {
        let database: Db;
        return Connection.conn()
            .then((db: Db) => {
                database = db;

                return db.collection('transactions').findOneAndUpdate(
                    { id: id },
                    { $set: { 'deleted': true } });
            })
    }
}