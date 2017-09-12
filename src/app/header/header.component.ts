import { Component, OnInit  } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService ) { }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );

      this.dataStorageService.storeShoppingList()
        .subscribe(
          (response: Response) => {
            console.log(response);
          }
        );
  }

  onFetchData() {
    // we don't need to subscribe because we are already doing that in the dataStorageService
    this.dataStorageService.getRecipes();
    this.dataStorageService.getShoppingList();
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }



}
