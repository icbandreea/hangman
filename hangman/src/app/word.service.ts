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
    { word: 'Volcano', hints: ['Mountain', 'Erupts Lava'] },
    { word: 'Amazon', hints: ['River', 'Online Shopping'] },
    { word: 'Mercury', hints: ['Planet', 'Closest to the Sun'] },
    { word: 'Eiffel', hints: ['Tower', 'Paris Landmark'] },
    { word: 'Cheetah', hints: ['Animal', 'Fastest Runner'] },
    { word: 'Venus', hints: ['Planet', 'Hottest One'] },
    { word: 'Pizza', hints: ['Food', 'Cheese & Tomato'] },
    { word: 'Hawk', hints: ['Bird', 'Sharp Eyes'] },
    { word: 'Dracula', hints: ['Vampire', 'Transylvania'] },
    { word: 'Rainbow', hints: ['Colors', 'After Rain'] },
    { word: 'Diamond', hints: ['Jewel', 'Hardest Material'] },
    { word: 'Neptune', hints: ['Planet', 'Farthest from Sun'] },
    { word: 'Ballet', hints: ['Dance', 'On Toes'] },
    { word: 'Chess', hints: ['Game', 'King & Queen'] },
    { word: 'Comet', hints: ['Space', 'Has a Tail'] },
    { word: 'Pyramid', hints: ['Egypt', 'Triangle Shape'] },
    { word: 'Sphinx', hints: ['Egypt', 'Half Lion'] },
    { word: 'Octopus', hints: ['Sea Creature', 'Eight Arms'] },
    { word: 'Clock', hints: ['Time', 'Has Hands'] },
    { word: 'Wolf', hints: ['Animal', 'Howls at Moon'] }
  ];

  constructor() { }

  getRandomWord(): GuessableWord {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }
}
