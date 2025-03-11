import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { GameComponent, HangmanComponent } from './components';


@NgModule({
  declarations: [

  ],
  imports: [
    AppComponent,
    GameComponent,
    HangmanComponent,
  ],
  providers: [],
  bootstrap: [] 
})
export class AppModule { }