import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Импорт ReactiveFormsModule
// Import PrimeNG modules

import { AppComponent } from './app.component';
import { HeaderComponent } from './containers/header/header.component';
import { MainComponent } from './containers/main/main.component';
import { FooterComponent } from './containers/footer/footer.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { InputComponent } from './components/input/input.component';

import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { InputTextModule } from 'primeng/inputtext';
import { TruncateDecimalPipe } from './pipes/truncate-decimal.pipe';
import { RotateButtonComponent } from './components/rotate-button/rotate-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    DropdownComponent,
    InputComponent,
    TruncateDecimalPipe,
    RotateButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    KeyFilterModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
