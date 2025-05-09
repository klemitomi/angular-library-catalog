// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary">
        <button mat-icon-button (click)="toggleSidenav()">
          <mat-icon>menu</mat-icon>
        </button>
        <span>{{title}}</span>
        <span class="spacer"></span>
        <button mat-button routerLink="/books" routerLinkActive="active">
          <mat-icon>list</mat-icon>
          Könyvek
        </button>
        <button mat-button routerLink="/books/add" routerLinkActive="active">
          <mat-icon>add</mat-icon>
          Új könyv
        </button>
      </mat-toolbar>

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav [(opened)]="sidenavOpened" mode="side">
          <mat-nav-list>
            <a mat-list-item routerLink="/books" routerLinkActive="active">
              <mat-icon>list</mat-icon>
              <span>Könyvek listája</span>
            </a>
            <a mat-list-item routerLink="/books/add" routerLinkActive="active">
              <mat-icon>add</mat-icon>
              <span>Új könyv</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content>
          <div class="content-wrapper">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .spacer {
      flex: 1 1 auto;
    }

    mat-toolbar {
      button[mat-button] {
        margin-left: 8px;
      }

      mat-icon {
        margin-right: 8px;
      }
    }

    .sidenav-container {
      flex: 1;
    }

    mat-sidenav {
      width: 250px;
    }

    .content-wrapper {
      padding: 20px;
      height: calc(100% - 40px);
    }

    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }

    mat-nav-list {
      a {
        mat-icon {
          margin-right: 8px;
        }
      }
    }
  `]
})
export class AppComponent {
  title = 'Könyvtárkezelő';
  sidenavOpened = true;

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}