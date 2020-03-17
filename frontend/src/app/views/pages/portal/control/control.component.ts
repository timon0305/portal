import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AuthService} from '../../../../core/auth/_services';
import {AddUsersComponent} from './add-users/add-users.component';
import {MatDialog} from '@angular/material/dialog';
import {EditUsersComponent} from './edit-users/edit-users.component';

@Component({
  selector: 'kt-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

	displayedColumns = ['id', 'name', 'email', 'role',  'action'];
	dataSource: MatTableDataSource<UserData>;
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	public datasource: Array<any>;
	role: string;
	users: UserData[] = [];

	data: string;
	name: string;
	adminIf: boolean;

	constructor(
		private getUserService: AuthService,
		private ref: ChangeDetectorRef,
		public dialog: MatDialog,
		private userService: AuthService
	) {
	}

	ngOnInit() {
		this.getUserService.getAllUser().subscribe( result => {
			this.datasource = Object.values(result);
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

	getItemCssClassByStatus(status: string = ''): string {
		switch (status) {
			case 'Admin':
				return 'danger';
			case 'Manager':
				return 'success';
		}
		return '';
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	addUsers(): void {
		const dialogRef = this.dialog.open(AddUsersComponent, {
			width: '40%',
			data: {}
		});

		dialogRef.afterClosed().subscribe(result => {
		});
	}


	editUsers(id): void {
		let send_data = {};
		for (let i = 0; i < this.users.length; i++ ) {
			if (this.users[i]['id'] === id) {
				send_data = this.users[i];
				break;
			}
		}
		const dialogRef = this.dialog.open(EditUsersComponent, {
			width: '40%',
			data: {detail_data: send_data}
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('result --- ', send_data);
		});
	}

	deleteUsers(id): void {
		let data = {};
		for (let i = 0; i < this.users.length; i++ ) {
			if (this.users[i]['id'] === id) {
				data = this.users[i];

				if (confirm('Are you really delete this information?'))
				{
					console.log('delete--', data['email']);
					this.userService.user_delete(data['email'])
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
		name: user.name,
		email: user.email,
		title: user.title,
		original_id: user.original_id,
		action: '',
	};
}


export interface UserData {
	id: string;
	name: string;
	email: string;
	title: string;
	action: string;
	original_id: string;
}

