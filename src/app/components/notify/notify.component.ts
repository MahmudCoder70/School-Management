import {Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';



@Component({
  selector: 'app-notify',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule
  ],
  templateUrl: './notify.component.html',
  styleUrl: './notify.component.css',
  
})
export class NotifyComponent {}
