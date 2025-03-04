import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { HangmanComponent } from './hangman/hangman.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { StatisticsComponent } from './statistics/statistics.component';


@NgModule({
  declarations: [

  ],
  imports: [
    AppComponent,
    GameComponent,
    HangmanComponent,
    KeyboardComponent,
    StatisticsComponent
  ],
  providers: [],
  bootstrap: [] 
})
export class AppModule { }