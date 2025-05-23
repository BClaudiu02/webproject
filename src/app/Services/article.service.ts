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
      location: ['Cluj-Napoca'],
      sport: 'Basketball',
      isAmateurCompetition: false
    },
    {
      id: '2',
      title: 'U Cluj este pregătită pentru derby-ul cu CFR din această seară',
      imageUrl: 'https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2022/04/26/3362425-68728768-2560-1440.jpg',
      contentSnippet: 'Partida va avea loc la ora 19:45 pe stadionul Dr. Constantin Rădulescu.',
      link: '#',
      location: ['Cluj-Napoca'],
      sport: 'Football',
      isAmateurCompetition: false
    },
    {
      id: '3',
      title: 'A mai rămas puțin timp până la Maratonul Internațional Sibiu 2025',
      imageUrl: 'https://sibiuindependent.ro/wp-content/uploads/2025/03/Afis-landscape-MIS-25.png',
      contentSnippet: 'Începând de astăzi, 7 martie, pasionații de alergare și susținătorii cauzelor locale se pot înscrie la cea de-a 14-a ediție a Maratonului, care va avea loc în inima Sibiului. Înscrierile sunt deschise până pe 2 mai, ora 23:59',
      link: 'https://maratonsibiu.ro/ro/proiecte',
      location: ['Sibiu'],
      sport: 'Running',
      isAmateurCompetition: true
    },
    {
      id: '4',
      title: 'CFR Cluj a câștigat finala Cupei României',
      imageUrl: 'https://s.iw.ro/gateway/g/ZmlsZVNvdXJjZT1odHRwJTNBJTJGJTJG/c3RvcmFnZTAxZGlnaXMucmNzLXJkcy5y/byUyRnN0b3JhZ2UlMkYyMDI1JTJGMDUl/MkYxNCUyRjIyNTg3NDlfMjI1ODc0OV9D/RlItQ3VwYS5qcGcmdz0xMDYwJmg9NjM2/Jmhhc2g9ZGI2ODdjOWVjNWNlZjcxNjk3ZGY1MzM4NTMwNWRkYWM=.thumb.jpg',
      contentSnippet: 'CFR - FC Hermannsadt 3-2. Dan Petrescu a câștigat Cupa României și îi duce pe clujeni în Europa League',
      link: 'https://www.digisport.ro/fotbal/cupa-romaniei/cfr-hermannstadt-3-2-clujenii-au-castigat-cupa-romaniei-si-merg-in-europa-league-spectacol-la-arad-3586991',
      location: ['Arad', 'Cluj-Napoca', 'Sibiu'],
      sport: 'Football',
      isAmateurCompetition: false
    },
    {
      id: '5',
      title: 'FCSB a câştigat al doilea titlu consecutiv în Liga 1!',
      imageUrl: 'https://cdn.as.ro/wp-content/uploads/2025/05/fcsb-1.jpg',
      contentSnippet: 'FCSB a câştigat al doilea titlu consecutiv în Liga 1, în sezonul 2024-2025. A suferit doar 4 înfrângeri în sezonul regulat, în timp ce în play-off nu a mai pierdut niciun meci.',
      link: 'https://as.ro/fotbal/liga-1/fcsb-a-castigat-al-doilea-titlu-consecutiv-in-liga-1-parcurs-fara-greseala-al-echipei-lui-elias-charalambous-518084.html#:~:text=FCSB%20a%20c%C3%A2%C5%9Ftigat%20al%20doilea%20titlu%20consecutiv%20%C3%AEn,ocupat%20de%20c%C4%83tre%20CFR%20Cluj%2C%20dup%C4%83%20%C3%AEnjum%C4%83t%C4%83%C5%A3irea%20punctelor.',
      location: ['București'],
      sport: 'Football',
      isAmateurCompetition: false
    },
    {
      id: '6',
      title: 'Sports Festival Cluj-Napoca 2025',
      imageUrl: 'https://zcj.ro/images/db/1_3_249013_1686317031_00652_fav.jpg',
      contentSnippet: 'Festivalul va avea loc în perioada 12-15 iunie',
      link: 'https://www.sportsfestival.com/',
      location: ['Cluj-Napoca'],
      sport: 'Sport',
      isAmateurCompetition: true
    },
    {
      id: '7',
      title: 'CSM București este campioana României la handbal feminin!',
      imageUrl: 'https://www.eurohandball.com/media/z32dwwpi/20220818-clw-countdown-csm-bucuresti-neagu.jpg?center=0.26657692540383565,0.53242632370871923&mode=crop&width=1020&height=720&rnd=133052936378430000',
      contentSnippet: 'CSM București a câștigat al treilea titlu consecutiv',
      link: 'https://www.sport.ro/handbal/dunarea-braila-csm-bucuresti-ultima-deplasare-a-legendei-cristina-neagu-live-de-la-17-30-pe-pro-arena-si-voyo.html',
      location: ['București'],
      sport: 'Handball',
      isAmateurCompetition: false
    },
    // {
    //   id: '8',
    //   title: '',
    //   imageUrl: '',
    //   contentSnippet: '',
    //   link: '',
    //   location: '',
    //   sport: '',
    //   isAmateurCompetition: false
    // },
    // {
    //   id: '9',
    //   title: '',
    //   imageUrl: '',
    //   contentSnippet: '',
    //   link: '',
    //   location: '',
    //   sport: '',
    //   isAmateurCompetition: false
    // },
    // {
    //   id: '10',
    //   title: '',
    //   imageUrl: '',
    //   contentSnippet: '',
    //   link: '',
    //   location: '',
    //   sport: '',
    //   isAmateurCompetition: false
    // }
  ];

  getArticles(): Article[] {
    return this.articles;
  }

  getLocations(): string[] {
    return [...new Set(this.articles.flatMap(article => article.location))];
  }

  getSports(): string[] {
    return [...new Set(this.articles.map(article => article.sport))];
  }
}