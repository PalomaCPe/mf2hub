import { Injectable } from '@angular/core';

//import { utils, write, WorkBook } from 'xlsx';

//import { F } from 'file-saver';

@Injectable()
export class TemplateExcel {
    createFile(data: any) {
    new Blob([{oi:"oi"}],{ type: 'application/vnd.ms-excel' });


        // let ws_name = 'SomeSheet';
        // let wb: WorkBook = { SheetNames: [], Sheets: {} };
        // let ws: any = utils.json_to_sheet(data);
        // wb.SheetNames.push(ws_name);
        // wb.Sheets[ws_name] = ws;
        // let  file = write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

        // function s2ab(s: any) {
        //     const buf = new ArrayBuffer(s.length);
        //     const view = new Uint8Array(buf);
        //     for (let i = 0; i !== s.length; ++i) {
        //         view[i] = s.charCodeAt(i) & 0xFF;
        //     };
        //     return buf;
        // }
    }
}
//Artefatos que serão gerados
/*
Pesquisar - 3 campos:
    Transação
    Nome Serviço
    Full text (igual WSRR)

Carregou transações
    Traz o que já existir do que foi pesquisado
    Parentesco com os dados input/output do que foi pesquisado

Ao selecionar..
    Vai pra tela pronta hoje, porém com as sugestoes de descricao e traduçoes, tranzendo frame de soap e rest
    Ao editar ou incluir, é obrigatório preencher o campo de usuário (criado por + projeto)


Gerar
Wsdl
Swagger
PDF - infos SOAP e REST
*/

