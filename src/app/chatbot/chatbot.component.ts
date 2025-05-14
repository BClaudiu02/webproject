import { Component, OnInit } from '@angular/core';
import { GeminiService } from '../services/gemini.service';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
  styleUrls: ['./style.css']
})
export class ChatbotComponent implements OnInit {

  messages: { text: SafeHtml, isUser: boolean }[] = [];
  userInput: string = '';
  isLoading: boolean = false;

  constructor(
    private geminiService: GeminiService,
    private sanitizer: DomSanitizer
  ) { }

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
      next: async (response) => {
        this.isLoading = false;
        const botResponse = response.candidates[0].content.parts[0].text;
        const formattedResponse = await this.formatChatbotResponse(botResponse);
        const sanitizedHtml = this.sanitizer.bypassSecurityTrustHtml(formattedResponse);
        this.addBotMessage(sanitizedHtml);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error from Gemini API:', error);
        this.addBotMessage(this.sanitizer.bypassSecurityTrustHtml('Sorry, I encountered an error. Please try again later.'));
      }
    });
  }

  addUserMessage(text: string): void {
    const sanitizedText = this.sanitizer.bypassSecurityTrustHtml(text);
    this.messages.push({ text: text, isUser: true });
  }

  addBotMessage(text: SafeHtml): void {
    this.messages.push({ text: text, isUser: false });
  }


  async formatChatbotResponse(text: string): Promise<string> {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br>');
    formattedText = formattedText.replace(/<br>\*(?!\*)/g, '<br>-');
    
    let listItems = formattedText.split('\n* ');
    if (listItems.length > 1) {
      let listHtml = '<ul>';
      for (let i = 1; i < listItems.length; i++) {
        listHtml += '<li>' + listItems[i] + '</li>';
      }
      listHtml += '</ul>';
      formattedText = listItems[0] + listHtml;
    }
    formattedText = await marked(formattedText);
    return formattedText;
  }

}