// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../../core/auth';

@Component({
	selector: 'kt-user-profile2',
	templateUrl: './user-profile2.component.html',
})
export class UserProfile2Component implements OnInit {
	// Public properties
	user$: Observable<User>;
	username: string;
	role: string;

	@Input() avatar = true;
	@Input() greeting = true;
	@Input() badge: boolean;
	@Input() icon: boolean;


	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private store: Store<AppState>,
					
	) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user$ = this.store.pipe(select(currentUser));
		this.username = localStorage.getItem('username');
		this.role = localStorage.getItem('role');

		// this.toastr.success('ddd', localStorage.getItem('toastr'), {timeOut: 3000});
	}

	/**
	 * Log out
	 */
	logout() {
		this.store.dispatch(new Logout());
	}
}
