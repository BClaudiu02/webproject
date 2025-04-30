import { Injectable } from '@angular/core';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articles: Article[] = [
    {
      id: '1',
      title: 'UBT pierde partida cu JL Bourg',
      imageUrl: 'https://ubt.s3.eu-west-3.amazonaws.com/media/images/2022/04/ciuXoP9jlbXMxniEezlkNscaCckJkNZ8zhQrIO4N.jpeg',
      contentSnippet: 'U-BT Cluj-Napoca a primit marți, 19 decembrie, vizita lui JL Bourg, iar formația franceză a obținut a patra victorie în fața campioanei României.',
      link: 'https://baschet.ro/liga-nationala-de-baschet-masculin/stiri/mihai-silvasan-noi-le-am-hranit-aceasta-forma-buna-pe-care-au-avut-o',
      location: 'Cluj',
      sport: 'Basketball',
      isAmateurCompetition: false
    },
    {
      id: '2',
      title: 'U Cluj este pregătită pentru derby-ul cu CFR din această seară',
      imageUrl: 'https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2022/04/26/3362425-68728768-2560-1440.jpg',
      contentSnippet: 'Partida va avea loc la ora 19:45 pe stadionul Dr. Constantin Rădulescu.',
      link: '#',
      location: 'Cluj',
      sport: 'Football',
      isAmateurCompetition: false
    },
    
  ];

  getArticles(): Article[] {
    return this.articles;
  }

  getLocations(): string[] {
    return [...new Set(this.articles.map(article => article.location))]; 
  }

  getSports(): string[] {
    return [...new Set(this.articles.map(article => article.sport))]; 
  }
}