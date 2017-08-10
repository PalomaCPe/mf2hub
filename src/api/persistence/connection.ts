import { MongoClient, Db, FindAndModifyWriteOpResultObject } from 'mongodb';

const mongoUrl: string = 'mongodb://localhost:27017/hub';

export class Connection {
    static conn(): Promise<Db> {
        return Promise.resolve<Db>(
            MongoClient.connect(mongoUrl)
                .then((db: Db) => {
                    console.log('Conectou');
                    return db;
                })
        )
            .catch(() => { console.log('Erro') });
    }

    static getNextSequence(sequenceName: string): Promise<number> {
        let database: Db;

        return this.conn()
            .then((db: Db) => {
                database = db;

                return db.collection('counters').findOneAndUpdate(
                    { _id: sequenceName },
                    { $inc: { currentValue: 1 } },
                    { projection: { "currentValue": 1 }, upsert: true, returnOriginal: false });
            })
            .then((updateResult: FindAndModifyWriteOpResultObject) => {
                if (updateResult.ok === 1)
                    return +updateResult.value.currentValue;
                else
                    return Error("An error ocurred while retrieving updated sequence");
            });

    }
}