import { Component } from '@angular/core';

interface IMainPageData {
  title: string;
  route: string;
  content?: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent {
  mainPageData: Array<IMainPageData> = [
    { 
      title: 'Creación de observables', 
      route: '/creacion-observables',
      content: 'Create, from, range, of, interval, time, fromEvent'
    },
    { title: 'Operadores básicos', 
      route: '/operadores-basicos', 
      content: 'mapTo, map, filter, tap, first, take, takeWhile, last, takeLast, skip, reduce, scan' 
    },
    { title: 'Utilidades', 
      route: '/utilidades', 
      content: 'startWith, endWith, distinct, distinctUntilChanged, pairwise, share, Subject, BehaviorSubject, Hot Observables' 
    },
    { title: 'Operadores temporales', 
      route: '/operadores-temporales', 
      content: 'sampleTime, throttleTime, auditTime, delay, bufferTime, debounceTime' 
    },
    { title: 'Combinación de observables', 
      route: '/combinacion-observables', 
      content: 'zip, merge, concat, forkJoin, combineLatest, withLatestFrom' 
    },
    { title: 'High Order Observables', 
      route: '/high-order-observables', 
      content: 'mergeAll, mergeMap, switchMap, concatMap' 
    },
    { title: 'Utilidades avanzadas', 
      route: '/utilidades-avanzadas', 
      content: 'throwError, catchError, retry, NEVER, EMPTY, materialize, dematerialize' 
    }
  ]
}
