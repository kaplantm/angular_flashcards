import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class QuizService {
  constructor(private http: HttpClient) {}

  baseQuizServerURL = "http://127.0.0.1:3000/";

  getUrlForRequest(ending) {
    return `${this.baseQuizServerURL}${ending}`;
  }

  getQuiz(id: string): Observable<Object> {
    const url = this.getUrlForRequest(`quizzes/${id}?details=true`);
    console.log({ url });
    return this.http.get(url);
  }
}
