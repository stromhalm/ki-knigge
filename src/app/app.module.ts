import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KiForumComponent } from './ki-forum/ki-forum.component';
import { VideoDialog } from './ki-forum/ki-forum.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    KiForumComponent,
    VideoDialog
    ],
  
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [MatDialog],
  entryComponents: [VideoDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
