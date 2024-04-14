import { Component } from '@angular/core';

type Message = {
  text: string;
  isUser: boolean;
};

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.html',
  styleUrls: ['./style.css']
})
export class ChatbotComponent {
  chatMessages: Message[] = [];
  userInput: string = '';

  sendMessage() {
    if (this.userInput.trim() !== '') {
      this.chatMessages.push({text: this.userInput, isUser: true});
      this.botResponse(this.userInput);
      this.userInput = '';
    }
  }

  botResponse(userInput: string) {
    const keywords = userInput.toLowerCase().split(" ");
    let response = "Nu am găsit nicio informație legată de acest subiect. Poți încerca să întrebi altceva?";

    const keywordResponses: { keywords: string[], response: string }[] = [
      {keywords: ["salut"], response: "Salut! Cu ce te pot ajuta?"},
      {keywords: ["hello"], response: "Salut! Cu ce te pot ajuta?"},
      {keywords: ["buna"], response: "Salut! Cu ce te pot ajuta?"},
      {
        keywords: ["fotbal", "urmatorul", "u", "cluj"],
        response: "Următorul meci de fotbal va fi pe data de 13 aprilie, U Cluj - Petrolul Ploiesti."
      },
      {
        keywords: ["fotbal", "urmatorul", "cfr", "cluj"],
        response: "Următorul meci de fotbal va fi pe data de 14 aprilie, CFR Cluj - FCSB."
      },
      {
        keywords: ["fotbal", "urmatorul", "hermannstadt"],
        response: "Următorul meci de fotbal va fi pe data de 19 aprilie, Hermannstadt - FC Botoșani."
      },
      {
        keywords: ["handbal", "urmatorul", "cluj"],
        response: "Următorul meci de handbal va fi pe data de 25 aprilie: U Cluj vs. Minaur Baia Mare."
      },
      {
        keywords: ["baschet", "urmatorul", "cluj"],
        response: "Următorul meci de baschet va fi pe data de 12 aprilie: U-BT Cluj vs. Dinamo București."
      },
      {
        keywords: ["baschet", "urmatorul", "sibiu"],
        response: "Următorul meci de baschet va fi pe data de 14 aprilie: CSU Sibiu vs. CSO Voluntari."
      },
      {
        keywords: ["rugby", "urmatorul", "cluj"],
        response: "Următorul meci de rugby va fi pe data de 20 aprilie: Universitatea Clus vs. SCM Timișoara."
      },
      {keywords: ["polo", "urmatorul", "cluj"], response: "Nu se cunoaște încă data următorului meci de polo."},
      {
        keywords: ["fotbal", "aprilie", "cluj"],
        response: "Meciurile de fotbal care se vor juca la Cluj-Napoca în luna aprilie sunt: 13 aprilie: U Cluj vs. Petrolul Ploiești, 14 aprilie: CFR Cluj vs. FCSB, 24 aprilie: U Cluj vs. Poli Iași,29 aprilie: CFR Cluj vs. Sepsi Sf. Gheorghe."
      },
      {
        keywords: ["fotbal", "aprilie", "sibiu"],
        response: "Meciurile de fotbal care se vor juca la Sibiu în luna aprilie sunt: 19 aprilie: Hermannstadt vs. FC Botoșani, 25 aprilie: Hermannstadt vs. Petrolul Ploiești."
      },
      {
        keywords: ["handbal", "aprilie", "cluj"],
        response: "Meciurile de handbal care se vor juca la Cluj-Napoca în luna aprilie sunt: 25 aprilie: U Cluj vs. Minaur Baia Mare."
      },
      {
        keywords: ["baschet", "aprilie", "cluj"],
        response: "Meciurile de baschet care se vor juca la Cluj-Napoca în luna aprilie sunt: 10 aprilie: U-BT Cluj vs. Dinamo, 12 aprilie: U-BT Cluj vs. Dinamo București."
      },
      {
        keywords: ["baschet", "aprilie", "sibiu"],
        response: "Meciurile de baschet care se vor juca la Sibiu în luna aprilie sunt: 14 aprilie: CSU Sibiu vs. CSO Voluntari."
      },
      {
        keywords: ["antrenamente", "fotbal", "copii", "cluj"],
        response: "Academiile de fotbal ale cluburilor CFR Cluj si Universitatea Cluj, ACSF Juniorul Cluj, ACS Luceafarul Cluj-Napoca, ACS Viitorul Cluj, CS Sporting Cluj-Napoca, ACS Napocense Stars Cluj-Napoca, ACS U Evolution 2020 Cluj-Napoca sunt doar cateva dintre cluburile care organizează antrenamente de fotbal pentru copii."
      },
      {
        keywords: ["antrenamente", "fotbal", "copii", "sibiu"],
        response: "Academia de fotbal a clubului FC Hermannstadt, Școala de Fotbal Alma Sibiu, ACS LSS Voința Sibiu, ASFC Interstar Sibiu sunt cluburile care organizează antrenamente de fotbal pentru copii."
      },
      {
        keywords: ["antrenamente", "handbal", "copii", "cluj"],
        response: "ACS Handbal Academica Cluj-Napoca, CS Viitorul Cluj, ACS Ardealul Cluj-Napoca, ACS Handbal 4 ALL Cluj Napoca și LPS Cluj sunt cluburile care organizează antrenamente de handbal pentru copii."
      },
      {
        keywords: ["antrenamente", "handbal", "copii", "sibiu"],
        response: "CSS Sibiu și HC Sibiu sunt cluburile care organizează antrenamente de handbal pentru copii."
      },
      {
        keywords: ["antrenamente", "baschet", "copii", "cluj"],
        response: "Academia clubului U-BT Cluj-Napoca, ACS Napoca Baschet School Cluj-Napoca, SMART Basketball și Transylvania Wolves organizează antrenamente de baschet pentru copii."
      },
      {
        keywords: ["antrenamente", "baschet", "copii", "sibiu"],
        response: "CSS Sibiu, CSU Sibiu și Alpha Basketball Sibiu sunt cluburile care organizează antrenamente de baschet pentru copii."
      },
      {
        keywords: ["karate", "cluj"],
        response: "Ashihara Karate CLuj, ACS FOCUS Cluj-Napoca, ACS Delta MMA, CS Politehnica Cluj sunt doar câteva dintre cluburile sportive care organizează antrenamente de karate în Cluj-Napoca."
      },
      {
        keywords: ["karate", "sibiu"],
        response: "Antrenamente de karate Kyokushin sunt organizate de Terrasportika, Rokan Sibiu și de Clubul Sportiv Hirsch."
      },
      {
        keywords: ["tenis", "sibiu"],
        response: "Baza sportivă Obor și baza sportivă Pamira sunt locurile unde se poate practica tenis în Sibiu."
      },
      {
        keywords: ["tenis", "cluj"],
        response: "Club Transilvania Cluj, Tenis Clujana și Parcul Babeș sunt doar câteva din locurile în care se poate practica tenis in Cluj-Napoca."
      },
      {
        keywords: ["maratonul", "cluj"],
        response: "Maratonul Internațional din Cluj-Napoca a avut loc in perioada 13-14 aprilie."
      },
      {
        keywords: ["maratonul", "sibiu"],
        response: "Maratonul Internațional din Sibiu va avea loc in perioada 25-26 mai."
      },
    ];

    // Check if all keywords are present in the user input
    const matchingResponse = keywordResponses.find(keywordResponse => {
      return keywordResponse.keywords.every(keyword => {
        // Check if the keyword is present in the user input, ignoring any question marks next to it
        return keywords.some(userKeyword => {
          const cleanedKeyword = userKeyword.replace(/\?$/, ""); // Remove question mark if it's at the end
          return cleanedKeyword === keyword;
        });
      });
    });

    // If all keywords are present, set the response
    if (matchingResponse) {
      response = matchingResponse.response;
    }

    this.chatMessages.push({text: response, isUser: false});
  }
}

