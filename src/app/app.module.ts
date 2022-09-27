import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { SingleRacerComponent } from './components/single-racer/single-racer.component';
import {FormsModule} from "@angular/forms";
import { ScreenRestrictionComponent } from './components/screen-restriction/screen-restriction.component';
import { WinnerModalComponent } from './components/winner-modal/winner-modal.component';
import { FansComponent } from './components/fans/fans.component';
import { FooterComponent } from './components/footer/footer.component';
import { Led7DisplayComponent } from './components/led7-display/led7-display.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SingleRacerComponent,
    ScreenRestrictionComponent,
    WinnerModalComponent,
    FansComponent,
    FooterComponent,
    Led7DisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
