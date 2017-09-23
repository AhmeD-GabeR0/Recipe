import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, Output, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   this.subscription = this.recipeService.recipeChanged
    .subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe;
      }
    )
    this.recipes = this.recipeService.getRecipe();

  }
  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route} );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
