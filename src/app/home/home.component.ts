import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    motivationalQuotes: string[] = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Believe you can and you're halfway there. - Theodore Roosevelt",
        "It does not matter how slowly you go as long as you do not stop. - Confucius",
        "The body achieves what the mind believes. - Napoleon Hill",
        "You miss 100% of the shots you don't take. - Wayne Gretzky",
        "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success. Greatness will come. - Dwayne Johnson",
        "The difference between the impossible and the possible lies in a person's determination. - Tommy Lasorda",
        "Champions aren't made in the gyms. Champions are made from something they have deep inside them—a desire, a dream, a vision. - Muhammad Ali"
    ];
    currentQuote: string = '';

    constructor(public afAuth: AngularFireAuth) { }

    ngOnInit(): void {
        this.setRandomQuote()
    }

    setRandomQuote(): void {
        const randomIndex = Math.floor(Math.random() * this.motivationalQuotes.length);
        console.log("Random Index:", randomIndex);
        this.currentQuote = this.motivationalQuotes[randomIndex];
    }

    logout(): void {
        this.afAuth.signOut();
    }

}
