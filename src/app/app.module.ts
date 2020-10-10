import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedComponentsModule } from './components/shared-components.module';
import { APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
export const URI_GPH_QL = "https://api.code-challenge.ze.delivery/public/graphql"

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedComponentsModule,
    HttpLinkModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    /** GraphQL config */
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: URI_GPH_QL
          })
        }
      },
      deps: [HttpLink]
    }],
  bootstrap: [AppComponent],
  exports: [
    HttpClientModule
  ]
})
export class AppModule { }

