import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MustMatch } from './_helpers/must-match.validator';
import {AuthService} from '../../../../../core/auth/_services';

@Component({
  selector: 'kt-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

	animal: string;
	name: string;
	constructor(
		public dialogRef: MatDialogRef<AddUsersComponent>,
		private formBuilder: FormBuilder,
		private userService: AuthService
	) {}


	registerForm: FormGroup;
	submitted = false;


	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			role: ['', Validators.required],
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', Validators.required],
			acceptTerms: [false, Validators.requiredTrue]
		}, {
			validator: MustMatch('password', 'confirmPassword')
		});
	}
	get f() { return this.registerForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}

		// display form values on success
		this.userService.user_register(this.registerForm.value)
			.subscribe(result => {
				// console.log('register data-- ', result);
				alert('Create Success');
				window.history.go(0);
			});

	}

	onReset() {
		this.submitted = false;
		this.registerForm.reset();
	}


}
