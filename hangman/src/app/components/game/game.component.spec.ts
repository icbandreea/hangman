import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { WordService } from '../../services';
import { GuessableWord } from '../../models';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let wordService: jest.Mocked<WordService>;

  beforeEach(() => {
    const wordServiceMock = {
      getRandomWord: jest.fn()
    };

    const mockWord: GuessableWord = {
      word: 'TEST',
      hints: ['HINT1', 'HINT2']
    };

    wordServiceMock.getRandomWord.mockReturnValue(of(mockWord));

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: WordService, useValue: wordServiceMock }
      ]
    });

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    wordService = TestBed.inject(WordService) as jest.Mocked<WordService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should make a correct guess and update word display', () => {
    component.wordToGuess = 'TEST';
    component.guessedLetters = [];
    component.makeGuess('T');
    
    expect(component.guessedLetters).toContain('T');
    expect(component.wordDisplay).toBe('T _ _ T');
  });

  it('should make a wrong guess and increment wrong guesses', () => {
    component.wordToGuess = 'TEST';
    component.wrongGuesses = 0;
    component.makeGuess('X');
    
    expect(component.wrongLetters).toContain('X');
    expect(component.wrongGuesses).toBe(1);
  });

  it('should show game over message when wrongGuesses reach MAX_ATTEMPTS', () => {
    component.wordToGuess = 'TEST';
    component.wrongGuesses = 6;
    (component as any).updateGameMessage();
    
    expect(component.gameMessage).toBe('You lost! The word was: TEST');
  });

  it('should use a hint and decrease hintsRemaining', () => {
    component.hints = ['HINT1', 'HINT2'];
    component.hintsRemaining = 2;
    component.useHint();
    
    expect(component.currentHints.length).toBe(1);
    expect(component.hintsRemaining).toBe(1);
  });

  it('should show a congratulatory message when the word is guessed', () => {
    component.wordToGuess = 'TEST';
    component.guessedLetters = ['T', 'E', 'S'];
    (component as any).updateGameMessage();
    
    expect(component.gameMessage).toBe('Congratulations! You guessed the word!');
  });

  it('should update word display correctly with new guesses', () => {
    component.wordToGuess = 'HELLO';
    component.guessedLetters = ['H', 'E'];
    (component as any).updateWordDisplay();
    
    expect(component.wordDisplay).toBe('H E _ _ _');
  });

  it('isWrongLetter should be false if wrongLetters array does not contain it', () => {
    component.wrongLetters = ['A', 'B'];

    const result = component.isWrongLetter('C');

    expect(result).toBe(false);
  });

  it('isWrongLetter should be true if wrongLetters array contains it', () => {
    component.wrongLetters = ['A', 'B'];

    const result = component.isWrongLetter('A');

    expect(result).toBe(true);
  });
  
  it('should unsubscribe on ngOnDestroy to prevent memory leaks', () => {
    const destroyNextSpy = jest.spyOn(component['destroy$'], 'next');
    const destroyCompleteSpy = jest.spyOn(component['destroy$'], 'complete');
    
    component.ngOnDestroy();
    
    expect(destroyNextSpy).toHaveBeenCalled();
    expect(destroyCompleteSpy).toHaveBeenCalled();
  });
});
