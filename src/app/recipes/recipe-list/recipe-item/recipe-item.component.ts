import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  // index is passed to this component from recipe-list.component.html
  // [index]="i"
  @Input() index: number;

  constructor( ) { }

  ngOnInit() {
  }



}
