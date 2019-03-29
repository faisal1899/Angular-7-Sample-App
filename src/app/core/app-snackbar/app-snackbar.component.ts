import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';
import { IAppSnackBarData } from './app-snackbar.interfaces';

@Component({
  selector: 'app-app-snackbar',
  templateUrl: './app-snackbar.component.html',
  styleUrls: ['./app-snackbar.component.scss']
})
export class AppSnackbarComponent implements OnInit {

  constructor(
    private matSnackBarRef: MatSnackBarRef<AppSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: IAppSnackBarData,
  ) { }

  ngOnInit() {
    this.data.type = this.data.type || 'info';
  }

}
