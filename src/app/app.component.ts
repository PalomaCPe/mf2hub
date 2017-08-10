import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.html'
})

export class AppComponent {
    @Input() atributo: string;

    pageName: string;
    icon: string;
    mostra: boolean = true;
    atr: string = this.atributo;

    interpolacao() {
        this.mostra = true;
        this.pageName = "Nome da Página";
    }

    propriedade() {
        this.mostra = true;
        this.icon = "glyphicon glyphicon-calendar";
    }

    mostrar() {
        if (this.mostra)
            this.mostra = false;
        else
            this.mostra = true;
    }
}
