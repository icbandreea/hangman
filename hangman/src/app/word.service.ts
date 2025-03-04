import { Injectable } from '@angular/core';
import { GuessableWord } from './models';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private words: GuessableWord[] = [
    { word: 'Einstein', hints: ['Scientist', 'Theory of Relativity'] },
    { word: 'Apple', hints: ['Fruit', 'Technology Company'] },
    { word: 'Shakespeare', hints: ['Playwright', 'English Literature'] },
    { word: 'Mount Everest', hints: ['Mountain', 'Highest Peak'] },
    { word: 'Bitcoin', hints: ['Cryptocurrency', 'Digital Currency'] },
    { word: 'Tesla', hints: ['Inventor', 'Electric Cars'] },
    { word: 'Titanic', hints: ['Ship', 'Sunk in 1912'] },
    { word: 'Piano', hints: ['Instrument', '88 Keys'] },
    { word: 'Giraffe', hints: ['Animal', 'Tallest Mammal'] },
    { word: 'Mona Lisa', hints: ['Painting', 'Leonardo da Vinci'] },
    { word: 'Oxygen', hints: ['Gas', 'Essential for Breathing'] },
    { word: 'Chocolate', hints: ['Sweet', 'Made from Cacao'] },
    { word: 'Rome', hints: ['City', 'Capital of Italy'] },
    { word: 'Shark', hints: ['Fish', 'Predator of the Ocean'] },
    { word: 'Internet', hints: ['Network', 'Global Communication'] },
    { word: 'Napoleon', hints: ['Leader', 'French Revolution'] },
    { word: 'Soccer', hints: ['Sport', 'Football'] },
    { word: 'Python', hints: ['Programming Language', 'Used for Web Development'] },
    { word: 'Guitar', hints: ['Instrument', 'Strummed'] },
    { word: 'Volcano', hints: ['Mountain', 'Erupts Lava'] }
  ];

  constructor() { }

  getRandomWord(): GuessableWord {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }
}
