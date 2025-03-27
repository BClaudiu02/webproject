import { Component, OnInit } from '@angular/core';
import { GeminiService } from '../services/gemini.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
  styleUrls: ['./style.css']
})
export class ChatbotComponent implements OnInit {

  messages: { text: string, isUser: boolean }[] = [];
  userInput: string = '';
  isLoading: boolean = false;

  constructor(private geminiService: GeminiService) { }

  ngOnInit(): void {
    this.addBotMessage("Hello! How can I help you today?"); 
  }

  sendMessage(): void {
    if (this.userInput.trim() === '') {
      return; 
    }

    const userMessage = this.userInput;
    this.addUserMessage(userMessage);
    this.userInput = ''; 
    this.isLoading = true; 

    this.geminiService.generateContent(userMessage).subscribe({
      next: (response) => {
        this.isLoading = false;
        const botResponse = response.candidates[0].content.parts[0].text;
        this.addBotMessage(botResponse);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error from Gemini API:', error);
        this.addBotMessage('Sorry, I encountered an error. Please try again later.');
      }
    });
  }

  addUserMessage(text: string): void {
    this.messages.push({ text: text, isUser: true });
  }

  addBotMessage(text: string): void {
    this.messages.push({ text: text, isUser: false });
  }

}