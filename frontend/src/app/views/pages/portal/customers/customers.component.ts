import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {MatSort} from '@angular/material';
import {MatDialog} from '@angular/material';
import {AuthService} from '../../../../core/auth/_services';
import {EditCustomersComponent} from './edit-customers/edit-customers.component';
import {AddCustomersComponent} from './add-customers/add-customers.component';
import {send} from "q";

@Component({
  selector: 'kt-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

	displayedColumns = ['id', 'customer_no', 'name', 'email', 'customer_type', 'pre_contract', 'pre_contract_date', 'purchase_contract',  'action'];
	dataSource: MatTableDataSource<UserData>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	public datasource: Array<any>;
	role: string;

	users: UserData[] = [];

	animal: string;
	name: string;
	adminIf: boolean;
	original_id: string;
	constructor(
		private getUserService: AuthService,
		private ref: ChangeDetectorRef,
		public dialog: MatDialog,
		private userService: AuthService
	) {
	}

	ngOnInit() {
		this.getUserService.getCustomer().subscribe( result => {
			this.datasource = Object.values(result);
			//console.log('from server', result);
			let i = 1;
			for (const item of this.datasource) {
				this.users.push(createNewUser(i, item));
				i++;
				// console.log(item);
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

	addCustomers(): void {
		const dialogRef = this.dialog.open(AddCustomersComponent, {
			width: '60%',
			data: {}
		});

		dialogRef.afterClosed().subscribe(result => {
			this.animal = result;
		});
	}


	editCustomers(id): void {
		let send_data = {};
		for (let i = 0; i < this.users.length; i++ ) {
			if (this.users[i]['original_id'] === id) {
				send_data = this.users[i];
				break;
			}
		}
		console.log(send_data);
		this.getUserService.getCustomerLegalInfo(id).subscribe(resp => {
			console.log('response-', resp);
			send_data['legal_info'] = resp['result'][0];
			const dialogRef = this.dialog.open(EditCustomersComponent, {
				width: '40%',
				data: {detail_data: send_data}
			});

			dialogRef.afterClosed().subscribe(result => {
				// this.send_data = send_data;
			});
		});

	}

	deleteCustomers(id): void {
		let data = {};
		for (let i = 0; i < this.users.length; i++ ) {
			if (this.users[i]['id'] === id) {
				data = this.users[i];

				if (confirm('Are you really delete this information?'))
				{
					console.log('delete--', data['email']);
					this.userService.custom_delete(data['email'])
						.subscribe(result => {
							console.log(result);
							alert('Success');
							window.history.go(0);
						});
				}
			}
		}
	}



}
function createNewUser(id, user): UserData {
	return {
		id: id,
		customer_no: user.customer_no,
		name: user.name,
		email: user.email,
		customer_type: user.customer_type,
		pre_contract: user.pre_contract,
		pre_contract_date: user.pre_contract_date,
		purchase_contract: user.purchase_contract,
		original_id: user.id,
		action: '',
	};
}

export interface UserData {
	id: string;
	customer_no: string;
	name: string;
	email: string;
	customer_type: string;
	pre_contract: string;
	pre_contract_date: string;
	purchase_contract: string;
	action: string;
	original_id: string;
}
