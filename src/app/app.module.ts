import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MessageComponent } from './message/message.component';

import { LancamentoModule } from './lancamento/lancamento.module';
import { PessoaModule } from './pessoa/pessoa.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    LancamentoModule,
    PessoaModule,

    MessagesModule,
    MessageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
