import { MongoClient, Db, InsertOneWriteOpResult, FindAndModifyWriteOpResultObject } from 'mongodb';

import { Transaction } from '../model/transaction';
import { Connection } from './connection';

export class TransactionPersistence {
    list(): Promise<Transaction[]> {
        let database: Db;
        return Promise.resolve(
            Connection.conn()
                .then((db: Db) => {
                    database = db;

                    return db.collection('campo_mf').find().toArray();
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

                    return db.collection('campo_mf').find({ Transacao: id }).toArray();
                })
                .then((transaction: Transaction[]) => {
                    database.close();

                    return transaction as Transaction[];
                })
        );
    }

    create(transaction: Transaction): Promise<Transaction> {
        let database: Db;
        let body: string = JSON.stringify(transaction);

        return Promise.resolve(
            Connection.conn()
                .then((db: Db) => {
                    database = db;

                    return db.collection('campo_mf').insertOne({
                        Transacao: transaction.transaction,
                        Tipo: transaction.type,
                        Formato: transaction.format,
                        Seq: transaction.sequence,
                        Campo: transaction.field,
                        Literal: transaction.literal,
                        Delimitador: transaction.delimiter,
                        Atributo: transaction.attribute,
                        Tamanho: transaction.length,
                        Tipo2: transaction.secondType
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

                return db.collection('campo_mf').findOneAndUpdate(
                    { id: id },
                    { $set: { 'deleted': true } });
            })
    }
}