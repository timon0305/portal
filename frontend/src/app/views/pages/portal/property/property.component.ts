import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material';
import {AuthService} from '../../../../core/auth/_services';
import {MatDialog} from '@angular/material/dialog';
import {AddPropertyComponent} from './add-property/add-property.component';
import {EditPropertyComponent} from './edit-property/edit-property.component';

@Component({
  selector: 'kt-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

	displayedColumns = ['id', 'contract_start', 'pea_file', 'keys',   'action'];
	dataSource: MatTableDataSource<UserData>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	public datasource: Array<any>;

	role: string;
	adminIf: boolean;
	users: UserData[] = [];
	data: string;
	name: string;
	send_data: UserData[] = [];

	constructor(
		private getUserService: AuthService,
		private ref: ChangeDetectorRef,
		public dialog: MatDialog,
		private userService: AuthService
	) {
	}

	ngOnInit() {
		this.getUserService.getProperty().subscribe( result => {
			this.datasource = Object.values(result);
			console.log("property datasource__", result);
			let i = 1;
			for (const item of this.datasource) {
				this.users.push(createNewUser(i, item));
				i++;

			}
			this.dataSource = new MatTableDataSource(this.users);
			this.ref.detectChanges();
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;

			this.role = localStorage.getItem('role');
			this.adminIf = this.role === 'Admin' ;
		});
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	addProperty(): void {
		const dialogRef = this.dialog.open(AddPropertyComponent, {
			width: '30%',
			data: {}
		});

		dialogRef.afterClosed().subscribe(result => {

		});
	}


	editProperty(id): void {
		let send_data = {};
		// for (let i = 0; i < this.users.length; i++ ) {
		// 	if (this.users[i]['id'] === id) {
		// 		send_data = this.users[i];
		// 		break;
		// 	}
		// }
		this.userService.editProperty(id)
			.subscribe(result => {
				console.log("data_result", result);
				let customer_id = [];
				for(const [key, value] of Object.entries(result)) {
					if(value.customer_id) {
						customer_id.push(parseInt(value.customer_id));
					}
				}
				this.send_data.push(editNewProperty(1, result[0], customer_id));
				const dialogRef = this.dialog.open(EditPropertyComponent, {
					width: '40%',
					data: {detail_data: this.send_data}
				});
				this.send_data = [];

				dialogRef.afterClosed().subscribe(result => {
					console.log('result --- ', this.send_data);
				});
			})
	}

	delete_Property(id): void {
		if (confirm('Are you really delete this information?')) {
			this.userService.property_delete(id).subscribe(result => {
				console.log('delete_property--', result);
				alert('success');
				window.history.go(0);
			})
		}

	}


}
function createNewUser(id, user): UserData {
	return {
		id: id,
		contract_start: user.contract_date,
		pea_file: user.pea_file,
		keys: user.keys,
		pre_contract: user.pre_contract,
		action: '',
		original_id: user.id,
		name:[]
	};
}

function editNewProperty(id, property, customer_id): UserData {
	return {
		id: id,
		contract_start: property.contract_date,
		pea_file: property.pea_file,
		keys: property.keys,
		pre_contract: property.pre_contract,
		action: '',
		original_id: property.id,
		name: customer_id
	};
}
export interface UserData {
	id: string;
	contract_start: string;
	pea_file: string;
	keys: string;
	pre_contract: string;
	action: string;
	original_id: string;
	name: Array<string>;
}
