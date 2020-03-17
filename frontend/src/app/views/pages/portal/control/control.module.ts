import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {ControlComponent} from './control.component';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatTableModule,
	MatProgressSpinnerModule,
	MatCheckboxModule,
	MatCardModule, MatTabsModule
} from '@angular/material';
import {MatPaginatorModule, MatDialogModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { AddUsersComponent } from './add-users/add-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';

@NgModule({
  declarations: [
  	ControlComponent,
  	AddUsersComponent,
  	EditUsersComponent,
  ],
  imports: [
    CommonModule,
	  MatButtonModule,
	  MatFormFieldModule,
	  MatTableModule,
	  MatInputModule,
	  MatPaginatorModule,
	  MatIconModule,
	  MatTooltipModule,
	  FormsModule,
	  ReactiveFormsModule,
	  MatRadioModule,
	  MatProgressSpinnerModule,
	  MatDialogModule,
	  MatSelectModule,
	  MatCheckboxModule,
	  MatTabsModule,
	  MatCardModule,
	  RouterModule.forChild([
		  {
			  path: '',
			  component: ControlComponent,
		  }
	  ]),
  ],
	bootstrap: [ControlComponent],
	exports: [
		MatButtonModule,
		MatFormFieldModule,
	],
	entryComponents: [AddUsersComponent, EditUsersComponent]
})
export class ControlModule { }
