import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../../core/auth/_services';

@Component({
  selector: 'kt-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

	name: string;
	fromPage: any;
	constructor(
		public dialogRef: MatDialogRef<EditUsersComponent>,
		private formBuilder: FormBuilder,
		private userService: AuthService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.fromPage = this.data.detail_data;
	}

	editUserForm: FormGroup;
	submitted = false;


	ngOnInit() {
		//let change_roll = this.fromPage.title = 'Admin' ? 1 : 2;
		this.editUserForm = this.formBuilder.group({
			role: [this.fromPage.title, Validators.required],
			name: [this.fromPage.name, Validators.required],
			email: [this.fromPage.email, [Validators.required, Validators.email]],
			password: [''],
			acceptTerms: [false, Validators.requiredTrue]
		});
	}



	get f() { return this.editUserForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.editUserForm.invalid) {
			return;
		}
		// display form values on success
		this.userService.user_edit(this.editUserForm.value)
			.subscribe(result => {
				console.log('edit data-- ', result);
				alert('success');
				window.history.go(0);
			});

	}

	onReset() {
		this.submitted = false;
		this.editUserForm.reset();
	}
}

