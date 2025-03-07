import { Component, OnInit } from '@angular/core';
import { WordService } from '../word.service';
import { CommonModule } from '@angular/common';
import { HangmanComponent } from "../hangman/hangman.component";

@Component({
  selector: 'app-game',
  imports: [CommonModule, HangmanComponent],
  standalone: true,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  readonly MAX_ATTEMPTS = 6;
  readonly MAX_HINTS = 2;
  wordToGuess = '';
  hints: string[] = [];
  guessedLetters: string[] = [];
  wrongLetters: string[] = [];
  wrongGuesses = 0;
  hintsRemaining = this.MAX_HINTS;
  currentHints: string[] = [];
  availableLetters = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
  gameMessage: string = '';
  wordDisplay: string = ''; 


  constructor(private wordService: WordService) {}

  ngOnInit(): void {
    this.startGame();
  }

  startGame(): void {
    const selectedWordObject = this.wordService.getRandomWord();
 
    this.wordToGuess = selectedWordObject.word.toUpperCase();
    this.hints = selectedWordObject.hints;
    this.guessedLetters = [];
    this.wrongLetters = [];
    this.wrongGuesses = 0;
    this.hintsRemaining = this.MAX_HINTS;
    this.currentHints = [];
    this.gameMessage = '';
    this.updateWordDisplay();
  }


  // Method that receives the letter and verifies it
  makeGuess(letter: string): void {
    letter = letter.toUpperCase();

    if(this.guessedLetters.includes(letter) || (this.wrongLetters.includes(letter)) ) return;

    if(this.wordToGuess.includes(letter)) {
      this.guessedLetters.push(letter);
    } else {
      this.wrongGuesses++;
      this.wrongLetters.push(letter);
    }

    this.updateWordDisplay();

    this.updateGameMessage();
    
  }

  useHint(): void {
    if (this.hintsRemaining > 0 && this.currentHints.length < this.MAX_HINTS) {
      this.currentHints.push(this.hints[this.currentHints.length]);
      this.hintsRemaining--;
    }
  }

  disabledLetters(letter: string): boolean {
    return (
      this.guessedLetters.includes(letter) ||
      this.wrongLetters.includes(letter) ||
      this.wrongGuesses >= this.MAX_ATTEMPTS ||
      this.wordToGuess.split('').every(letter => letter === ' ' ? ' ' : this.guessedLetters.includes(letter))
    );
  }

  isWrongLetter(letter: string): boolean {
    return this.wrongLetters.includes(letter);
  }

    //Method to show the word 
    private updateWordDisplay(): void {
      this.wordDisplay = this.wordToGuess
        .split('')
        .map(letter => letter === ' ' ? ' ' : (this.guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
    }

    private updateGameMessage(): void {
      if (this.wordToGuess.split('').every(letter => letter === ' ' ? ' ' : this.guessedLetters.includes(letter))) {
        this.gameMessage = 'Congratulations! You guessed the word!';
      } else if (this.wrongGuesses >= this.MAX_ATTEMPTS) {
        this.gameMessage = `You lost! The word was: ${this.wordToGuess}`;
      } else {
        this.gameMessage = '';
      }
    }




}
