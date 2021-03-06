// Angular imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Custom imports
import { AppComponent } from './app.component';
import { ToDoHomeModule } from './to-do-home/to-do-home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToDoHomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
