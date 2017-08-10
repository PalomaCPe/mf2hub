import { Router, Response, Request } from 'express';
import { Transaction } from '../model/transaction';
import { TransactionApplication } from '../application/transaction.application';

export const transactionRouter: Router = Router();

transactionRouter.get('/list', (request: Request, response: Response) => {
    let transactionApplication: TransactionApplication = new TransactionApplication();

    transactionApplication.getTransactions()
        .then((resultado: Transaction[]) => {
            response.json(resultado);
        });
});

transactionRouter.get('/:id', (request: Request, response: Response) => {
    let transactionApplication: TransactionApplication = new TransactionApplication();

    let id: string = request.params.id;

    transactionApplication.getTransaction(id)
        .then((result: Transaction[]) => {
            response.json(result);
        });
});

transactionRouter.post('/post', (request: Request, response: Response) => {
    let transactionApplication: TransactionApplication = new TransactionApplication();

    transactionApplication.createTransaction(request.body.transaction)
        .then((result: Transaction) => {
            response.json(result);
        });
});