import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Foo } from './foo.model';

@Component({
  selector: 'app-foo-component',
  templateUrl: './foo-component.component.html',
  styleUrls: ['./foo-component.component.css']
})
export class FooComponentComponent implements OnInit {
  data : Object;            //L’oggetto che conterrà il risultato della nostra chiamata http
  loading : boolean;        //Una variabile che ci dice se siamo in attesa di una risposta dal server
  o : Observable<Object>;   //Un oggetto che notifica quando arriva la risposta http dal server

  fooData : Foo[];    //Un vettore di oggetti Foo
  oFoo : Observable<Foo[]>; //Un Observable che riceve un vettore di oggetti Foo

  constructor(public http : HttpClient) { }

  ngOnInit(): void {
  }

  makeTypedRequest() : void {
    //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
    /*aggiungiamo un metodo che faccia una get ma ritorni un observable
    che ritorni i dati in una lista di oggetti Foo. (oFoo : Observable<Foo[]>;)*/
    this.oFoo = this.http.get<Foo[]>('https://jsonplaceholder.typicode.com/posts');
    this.oFoo.subscribe(data => {this.fooData = data;});
  }

  makeRequest(): void {
    this.loading = true; //Notifichiamo che stiamo attendendo dei dati

    this.o = this.http.get('https://jsonplaceholder.typicode.com/posts/1'); //Facciamo una get e otteniamo l'oggetto Observable che attende la risposta

    this.o.subscribe(this.getData); //Attacchiamo all'Observable o un metodo "observer" che verrà lanciato quando arriva la risposta
  }

  //Il metodo che notifica la risposta (usiamo una "arrow function")
  getData = (d : Object) =>
  {
    this.data = d; //Notifico l’oggetto ricevuto dal server
    this.loading = false;  // Notifico che ho ricevuto i dati
  }

  makeCompactPost() : void {
    this.loading = true;
    this.http
     .post('https://jsonplaceholder.typicode.com/posts',
       JSON.stringify({
        body: 'bar',
        title: 'foo',
        userId: 1
      })
    )
    .subscribe(data => {
      this.data = data;
      this.loading = false;
    });
  }
}
