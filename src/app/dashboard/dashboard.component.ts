import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  articles: Article[] = [];
  locations: string[] = [];
  sports: string[] = [];

  selectedLocation: string = '';
  selectedSport: string = '';
  showAmateurCompetitions: boolean = false;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articles = this.articleService.getArticles();
    this.locations = this.articleService.getLocations();
    this.sports = this.articleService.getSports();
  }

  filterArticles(): Article[] {
    let filteredArticles = this.articles;

    if (this.selectedLocation) {
      filteredArticles = filteredArticles.filter(article => article.location === this.selectedLocation);
    }

    if (this.selectedSport) {
      filteredArticles = filteredArticles.filter(article => article.sport === this.selectedSport);
    }

    if (this.showAmateurCompetitions) {
      filteredArticles = filteredArticles.filter(article => article.isAmateurCompetition);
    }

    return filteredArticles;
  }

  resetFilters(): void {
      this.selectedLocation = '';
      this.selectedSport = '';
      this.showAmateurCompetitions = false;
  }

}
