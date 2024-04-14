function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    var userMsgElement = document.createElement("div");
    userMsgElement.classList.add("user-msg");
    userMsgElement.textContent = userInput;

    document.getElementById("chat-box").appendChild(userMsgElement);
    document.getElementById("user-input").value = "";

    setTimeout(function() {
        var botMsgElement = document.createElement("div");
        botMsgElement.classList.add("bot-msg");
        botMsgElement.textContent = getResponse(userInput);
        document.getElementById("chat-box").appendChild(botMsgElement);
        document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
    }, 500);
}

var responses = [
    { keywords: ["salut"], response: "Salut! Cu ce te pot ajuta?" },
    { keywords: ["hello"], response: "Salut! Cu ce te pot ajuta?" },
    { keywords: ["buna"], response: "Salut! Cu ce te pot ajuta?" },
    { keywords: ["fotbal", "urmatorul", "u", "cluj"], response: "Următorul meci de fotbal va fi pe data de 13 aprilie, U Cluj - Petrolul Ploiesti." },
    { keywords: ["fotbal", "urmatorul", "cfr", "cluj"], response: "Următorul meci de fotbal va fi pe data de 14 aprilie, CFR Cluj - FCSB." },
    { keywords: ["fotbal", "urmatorul", "hermannstadt"], response: "Următorul meci de fotbal va fi pe data de 19 aprilie, Hermannstadt - FC Botoșani." },
    { keywords: ["handbal", "urmatorul", "cluj"], response: "Următorul meci de handbal va fi pe data de 25 aprilie: U Cluj vs. Minaur Baia Mare." },
    { keywords: ["baschet", "urmatorul", "cluj"], response: "Următorul meci de baschet va fi pe data de 12 aprilie: U-BT Cluj vs. Dinamo București." },
    { keywords: ["baschet", "urmatorul", "sibiu"], response: "Următorul meci de baschet va fi pe data de 14 aprilie: CSU Sibiu vs. CSO Voluntari." },
    { keywords: ["rugby", "urmatorul", "cluj"], response: "Următorul meci de rugby va fi pe data de 20 aprilie: Universitatea Clus vs. SCM Timișoara." },
    { keywords: ["polo", "urmatorul", "cluj"], response: "Nu se cunoaște încă data următorului meci de polo." },
    { keywords: ["fotbal", "aprilie", "cluj"], response: "Meciurile de fotbal care se vor juca la Cluj-Napoca în luna aprilie sunt: 13 aprilie: U Cluj vs. Petrolul Ploiești, 14 aprilie: CFR Cluj vs. FCSB, 24 aprilie: U Cluj vs. Poli Iași,29 aprilie: CFR Cluj vs. Sepsi Sf. Gheorghe." },
    { keywords: ["fotbal", "aprilie", "sibiu"], response: "Meciurile de fotbal care se vor juca la Sibiu în luna aprilie sunt: 19 aprilie: Hermannstadt vs. FC Botoșani, 25 aprilie: Hermannstadt vs. Petrolul Ploiești." },
    { keywords: ["handbal", "aprilie", "cluj"], response: "Meciurile de handbal care se vor juca la Cluj-Napoca în luna aprilie sunt: 25 aprilie: U Cluj vs. Minaur Baia Mare." },
    { keywords: ["baschet", "aprilie", "cluj"], response: "Meciurile de baschet care se vor juca la Cluj-Napoca în luna aprilie sunt: 10 aprilie: U-BT Cluj vs. Dinamo, 12 aprilie: U-BT Cluj vs. Dinamo București." },
    { keywords: ["baschet", "aprilie", "sibiu"], response: "Meciurile de baschet care se vor juca la Sibiu în luna aprilie sunt: 14 aprilie: CSU Sibiu vs. CSO Voluntari." },
    { keywords: ["antrenamente", "fotbal", "copii", "cluj"], response: "Academiile de fotbal ale cluburilor CFR Cluj si Universitatea Cluj, ACSF Juniorul Cluj, ACS Luceafarul Cluj-Napoca, ACS Viitorul Cluj, CS Sporting Cluj-Napoca, ACS Napocense Stars Cluj-Napoca, ACS U Evolution 2020 Cluj-Napoca sunt doar cateva dintre cluburile care organizează antrenamente de fotbal pentru copii." },
    { keywords: ["antrenamente", "fotbal", "copii", "sibiu"], response: "Academia de fotbal a clubului FC Hermannstadt, Școala de Fotbal Alma Sibiu, ACS LSS Voința Sibiu, ASFC Interstar Sibiu sunt cluburile care organizează antrenamente de fotbal pentru copii." },
    { keywords: ["antrenamente", "handbal", "copii", "cluj"], response: "ACS Handbal Academica Cluj-Napoca, CS Viitorul Cluj, ACS Ardealul Cluj-Napoca, ACS Handbal 4 ALL Cluj Napoca și LPS Cluj sunt cluburile care organizează antrenamente de handbal pentru copii." },
    { keywords: ["antrenamente", "handbal", "copii", "sibiu"], response: "CSS Sibiu și HC Sibiu sunt cluburile care organizează antrenamente de handbal pentru copii." },
    { keywords: ["antrenamente", "baschet", "copii", "cluj"], response: "Academia clubului U-BT Cluj-Napoca, ACS Napoca Baschet School Cluj-Napoca, SMART Basketball și Transylvania Wolves organizează antrenamente de baschet pentru copii." },
    { keywords: ["antrenamente", "baschet", "copii", "sibiu"], response: "CSS Sibiu, CSU Sibiu și Alpha Basketball Sibiu sunt cluburile care organizează antrenamente de baschet pentru copii." },
    { keywords: ["karate", "cluj"], response: "Ashihara Karate CLuj, ACS FOCUS Cluj-Napoca, ACS Delta MMA, CS Politehnica Cluj sunt doar câteva dintre cluburile sportive care organizează antrenamente de karate în Cluj-Napoca." },
    { keywords: ["karate", "sibiu"], response: "Antrenamente de karate Kyokushin sunt organizate de Terrasportika, Rokan Sibiu și de Clubul Sportiv Hirsch." },
    { keywords: ["tenis", "sibiu"], response: "Baza sportivă Obor și baza sportivă Pamira sunt locurile unde se poate practica tenis în Sibiu." },
    { keywords: ["tenis", "cluj"], response: "Club Transilvania Cluj, Tenis Clujana și Parcul Babeș sunt doar câteva din locurile în care se poate practica tenis in Cluj-Napoca." },
    { keywords: ["maratonul", "cluj"], response: "Maratonul Internațional din Cluj-Napoca a avut loc in perioada 13-14 aprilie." },
    { keywords: ["maratonul", "sibiu"], response: "Maratonul Internațional din Sibiu va avea loc in perioada 25-26 mai." },
];

function getResponse(userInput) {
    userInput = userInput.toLowerCase();
    for (var i = 0; i < responses.length; i++) {
        var allKeywordsPresent = responses[i].keywords.every(function(keyword) {
            return userInput.includes(keyword);
        });
        if (allKeywordsPresent) {
            return responses[i].response;
        }
    }

    return "Cu ce te pot ajuta?";
}