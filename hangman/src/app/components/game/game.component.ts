import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HangmanComponent } from '../hangman/hangman.component';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { WordService } from '../../services';
import { GuessableWord } from '../../models';

const KEYS = 'QWERTYUIOPASDFGHJKLZXCVBNM';

@Component({
  selector: 'app-game',
  imports: [CommonModule, HangmanComponent],
  standalone: true,
  providers: [WordService],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit, OnDestroy {
  private startGameSubject: Subject<void> = new Subject<void>();
  private destroy$ = new Subject<void>();

  readonly MAX_ATTEMPTS = 6;
  readonly MAX_HINTS = 2;

  wordToGuess = '';
  hints: string[] = [];
  guessedLetters: string[] = [];
  wrongLetters: string[] = [];
  wrongGuesses = 0;
  hintsRemaining = this.MAX_HINTS;
  currentHints: string[] = [];
  availableLetters = KEYS.split('');
  gameMessage: string = '';
  wordDisplay: string = '';

  constructor(private wordService: WordService) {
    debugger
    this.startGameSubject
      .pipe(
        switchMap(() =>
          this.wordService.getRandomWord().pipe(
            tap((guessableWord: GuessableWord) => {
              debugger
             this.initializeGame(guessableWord);
            }),
            takeUntil(this.destroy$)
          )
        )
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.startGameSubject.next();
  }

  startGame(): void {
    this.startGameSubject.next();
    this.updateWordDisplay();
  }

  makeGuess(letter: string): void {
    letter = letter.toUpperCase();

    if (
      this.guessedLetters.includes(letter) ||
      this.wrongLetters.includes(letter)
    )
      return;

    if (this.wordToGuess.includes(letter)) {
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

  isLetterDisabled(letter: string): boolean {
    return (
      this.guessedLetters.includes(letter) ||
      this.wrongLetters.includes(letter) ||
      this.wrongGuesses >= this.MAX_ATTEMPTS ||
      this.wordToGuess
        .split('')
        .every((letter) =>
          letter === ' ' ? ' ' : this.guessedLetters.includes(letter)
        )
    );
  }

  isWrongLetter(letter: string): boolean {
    return this.wrongLetters.includes(letter);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeGame(guessableWord: GuessableWord): void {
    const { word, hints } = guessableWord;
    this.hints = hints;
    this.wordToGuess = word.toUpperCase();

    this.resetGameStats();
    this.updateWordDisplay();
  }

  private resetGameStats(): void {
    this.guessedLetters = [];
    this.wrongLetters = [];
    this.wrongGuesses = 0;
    this.hintsRemaining = this.MAX_HINTS;
    this.currentHints = [];
    this.gameMessage = '';
  }
  
  private updateWordDisplay(): void {
    this.wordDisplay = this.wordToGuess
      .split('')
      .map((letter) =>
        letter === ' '
          ? ' '
          : this.guessedLetters.includes(letter)
          ? letter
          : '_'
      )
      .join(' ');
  }

  private updateGameMessage(): void {
    if (this.isWordGuessed()) {
      this.gameMessage = 'Congratulations! You guessed the word!';
    } else if (this.wrongGuesses >= this.MAX_ATTEMPTS) {
      this.gameMessage = `You lost! The word was: ${this.wordToGuess}`;
    } else {
      this.gameMessage = '';
    }
  }

  private isWordGuessed(): boolean {
    return this.wordToGuess
        .split('')
        .every((letter) =>
          letter === ' ' ? ' ' : this.guessedLetters.includes(letter)
        )
  }
}
