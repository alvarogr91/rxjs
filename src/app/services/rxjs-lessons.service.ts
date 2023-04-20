import { ElementRef, Injectable, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable, endWith, forkJoin, map, mapTo, mergeMap, of, throwError, timer } from 'rxjs';

export interface IComment {
  id: number;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})

export class RxjsLessonsService {
  @ViewChildren('displayLog') displayLogs!: QueryList<ElementRef>;
  displayLogs$: BehaviorSubject<any> = new BehaviorSubject(1);

  constructor() { }

  generateDisplayLog(containersArray: QueryList<ElementRef>, content: any, index: number) {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = containersArray.toArray()[index];
    logContainer.nativeElement.appendChild(element);
  }

  updateDisplayLog(containersArray: QueryList<ElementRef>, content: any, index: number) {
    let element = document.createElement('div');
    element.innerHTML = content;
    const logContainer = containersArray.toArray()[index];
    while (logContainer.nativeElement.firstChild) {
      logContainer.nativeElement.removeChild(logContainer.nativeElement.firstChild);
    }
    logContainer.nativeElement.appendChild(element);
  }

  // Operadores concat y forkJoin
  // Introducción a los HOO: mergeAll y mergeMap
  getComment(id: number): Observable<IComment> {
    return timer(Math.random() * 1000).pipe(
      mapTo({ id: id, comment: `comment number ${id}` })
    );
  }

  getComments(): void {
    const comment1$ = this.getComment(1);
    const comment2$ = this.getComment(2);
    const comment3$ = this.getComment(3);
    const comment4$ = this.getComment(4);

    // concat(comment1$, comment2$, comment3$, comment4$).pipe(
    //   map(({ id, comment }) => `#${id} - ${comment}`),
    //   endWith('--------//--------')
    // ).subscribe(data => {
    //   this._rxjsService.generateDisplayLog(this.displayLogs, data, 0);
    // })
    forkJoin(comment1$, comment2$, comment3$, comment4$).pipe(
      map(comment => JSON.stringify(comment)),
      endWith('--------//--------')
    ).subscribe(data => this.generateDisplayLog(this.displayLogs$.value, data, 0))
  }

  // High Order Observables: de array a evento
  getCommentsList(page: any) {
    const buildCommentsList = (page: any) => {
      let comments = [];
      const offset = (page - 1) * 10;
      for (let i = offset; i < offset + 10; i++) {
        comments.push({ id: i, comment: `comment number ${i}` })
      }
      return comments;
    }
    return timer(Math.random() * 1000).pipe(
      mapTo(buildCommentsList(page))
    );
  }

  // Operadores throwError, catchError y retry
  getCommentError(id: number): Observable<any | Error> {
    return timer(Math.random() * 1000).pipe(
      mergeMap((evt: any) => {
        // const isError = Math.random() > 0.6 ? true : false;
        const isError = Math.random() > 0.1 ? true : false; // Forzamos a que el error ocurra el 90% de las veces para provocar un bucle infinito y así hacer uso de retry
        if(isError) {
          return throwError(new Error('Request Timeout'));
        } else {
          return of({ id: id, comment: `comment number ${id}` })
        }
      })
    );
  }
}
