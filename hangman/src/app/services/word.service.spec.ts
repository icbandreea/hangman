import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { WordService } from "./word.service";
import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import { GuessableWord } from "../models";

describe('WordService', () => {
  let service: WordService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        WordService
      ],
    });

    service = TestBed.inject(WordService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a random word from the API', () => {
    const mockWord: GuessableWord = { word: 'example', hints: [ 'sample hint' ] };

    service.getRandomWord().subscribe((response) => {
      expect(response).toEqual(mockWord);
    });

    const req = httpMock.expectOne('http://localhost:3000/hangman');
    expect(req.request.method).toBe('GET');

    req.flush(mockWord);
  });
});