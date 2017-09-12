import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
//import { DataStorageService } from './shared/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipe';

  //constructor(private dataStorageService: DataStorageService ) { }


  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDYALqaFxwyjwj0zo82pvDzseA4ygCdP7Q",
      authDomain: "udemy-angular4.firebaseapp.com"
    });
    //this.dataStorageService.getRecipes();
    //this.dataStorageService.getShoppingList();
  }



}
