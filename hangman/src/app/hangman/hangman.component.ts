import { Component, Input } from '@angular/core';
import { GameComponent } from '../game/game.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hangman',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './hangman.component.html',
  styleUrl: './hangman.component.css'
})
export class HangmanComponent {

  @Input() wrongGuesses: number = 0;

  constructor() {}

  // get incorrectGuesses(): number {
  //   return this.wrongGuesses;
  // }


}
