import { Component, OnInit } from "@angular/core";
// import { cards } from "assets/json/statusQuestions.json";
import { QuizService } from "./quiz.service";

interface iQuestionCard {
  questionHeader?: string;
  question: string;
  answerHeader?: string;
  answer: string;
  difficulty?: 1 | 2 | 3;
}

interface iQuiz {
  title: string;
  questions: Array<iQuestionCard>;
  difficulty: number;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  questionCards: Array<iQuestionCard> = [];
  cardCount: number = 0;
  currentCardIndex: number = 0;
  currentCard: iQuestionCard | null;
  cardFlipped: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.getQuiz();
  }

  getQuiz(): void {
    this.quizService.getQuiz("1").subscribe(cards => {
      const quiz: iQuiz = cards as iQuiz;
      this.questionCards = quiz && quiz.questions ? quiz.questions : [];
      this.cardCount = this.questionCards.length;
      this.updateCurrentCard();
    });
    console.log("cards", this.questionCards);
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
    console.log("questionCards", this.questionCards);
    this.setCardQuestionSideUp();
    this.currentCard = this.questionCards[this.currentCardIndex];
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
