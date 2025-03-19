import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {

  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';

  constructor(private http: HttpClient) { }

  generateContent(prompt: string): Observable<any> {

    const apiKey = environment.geminiApiKey;

    if (!apiKey) {
      console.error('Gemini API key not found in environment variables.');
      return new Observable((observer) => {
        observer.error('Gemini API key not found. Please set the GEMINI_API_KEY environment variable.');
        observer.complete();
      });
    }


    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const data = {
      contents: [{
        parts: [{ text: prompt }]
      }]
    };

    const urlWithKey = `${this.apiUrl}?key=${apiKey}`;

    return this.http.post(urlWithKey, data, { headers });
  }
}