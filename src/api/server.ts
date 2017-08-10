import * as express from 'express';
import { Response, Request } from 'express';
import * as http from 'http';
import * as path from 'path';
import { json } from 'body-parser';

import { transactionRouter } from './service/transaction.service';

const app: express.Application = express();

app.use(express.static(path.join(__dirname, '../../')));

app.use(json());

//Route config
app.use('/api/transaction/', transactionRouter);

//Configuração para redicionar para a página de index à solicitações para a URL raiz (/) ou os outros "caminhos" não encontrados (404).
app.get('*', (request: Request, response: Response) => {
    response.sendFile(path.join(__dirname, '../../index.html'));
});

//Server
const server: http.Server = http.createServer(app);
server.listen(3000);

export {app}