import { Component, OnInit } from "@angular/core";
import { cards } from "assets/json/statusQuestions.json";

interface iCard {
  question: string;
  answerTitle?: string;
  answer: string;
  level?: 1 | 2 | 3;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  allCards: Array<iCard> = cards;
  cardCount: number = this.allCards.length;
  currentCardIndex: number = 0;
  currentCard: iCard | null;
  cardFlipped: boolean = false;
  constructor() {}

  ngOnInit() {
    this.updateCurrentCard();
    console.log(this.allCards);
    console.log(this.currentCard);
  }

  restoreCardAnimation() {
    setTimeout(function() {
      document.querySelector("#flipper").classList.remove("noanimation");
    }, 10);
  }
  setCardQuestionSideUp() {
    document.querySelector("#flipper").classList.add("noanimation");
    document.querySelector("#card").classList.remove("flip");
    this.cardFlipped = false;
    this.restoreCardAnimation();
  }

  setCardAnswerSideUp() {
    document.querySelector("#flipper").classList.add("noanimation");
    document.querySelector("#card").classList.add("flip");
    this.cardFlipped = true;
    this.restoreCardAnimation();
  }

  flipCard() {
    document.querySelector("#card").classList.toggle("flip");
    this.cardFlipped = !this.cardFlipped;
  }

  updateCurrentCard() {
    this.setCardQuestionSideUp();
    this.currentCard = this.allCards[this.currentCardIndex];
    console.log(this.currentCard);
  }

  nextCard() {
    this.currentCardIndex += 1;
    this.updateCurrentCard();
  }

  previousCard() {
    console.log("previousCard");
    this.currentCardIndex -= 1;
    this.updateCurrentCard();
  }
}
