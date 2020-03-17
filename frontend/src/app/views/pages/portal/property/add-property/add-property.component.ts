import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, FileService} from '../../../../../core/auth/_services';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {compileInjectable} from "@angular/compiler";

type State = { name: string };

let states: State[] = [];

@Component({
	selector: 'kt-add-property',
	templateUrl: './add-property.component.html',
	styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {

	public model: State;


	file: File;
	animal: string;
	name = [];
	id: string;
	constructor(
		public dialogRef: MatDialogRef<AddPropertyComponent>,
		private formBuilder: FormBuilder,
		private userService: AuthService,
		private fileUploadService: FileService
	) {
	}

	add_Property: FormGroup;
	submitted = false;
	files: File[] = [];
	toppingList = [];
	ngOnInit() {
		this.userService.getOwnerName().subscribe(customer => {
			console.log('name-id', customer);
			for (let i = 0 ; i < customer['names'].length; i ++) {
				console.log(customer['names'][i]);
				this.toppingList.push(customer['names'][i]);
			}
		});
		this.add_Property = this.formBuilder.group({
			name: [[], Validators.required],
			contract_start: ['', Validators.required],
			pea_file: ['', [Validators.required]],
			keys: ['', [Validators.required]],
			acceptTerms: [false, Validators.requiredTrue]
		});
	}

	get f() {
		return this.add_Property.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (this.add_Property.invalid) {
			return;
		}
		this.userService.customer_property(this.add_Property.value)
			.subscribe(result => {
				this.id = result['id'];
				this.fileUploadService.property_postFile(this.file, this.id).subscribe(data => {
					alert('success');
					window.history.go(0);
				}, error => {
					console.log(error);
				});

			});

	}

	onReset() {
		this.submitted = false;
		this.add_Property.reset();
	}
	uploadFileToActivity(ev) {
		console.log(ev.target.files[0]);
		this.file = ev.target.files[0];
	}

}


