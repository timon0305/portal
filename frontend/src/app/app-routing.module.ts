// Angular
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Components
import {BaseComponent} from './views/theme/base/base.component';
import {ErrorPageComponent} from './views/theme/content/error-page/error-page.component';
// Auth
import {AuthGuard} from './core/auth';
import {PortalDashboardModule} from "./views/pages/portal/portal-dashboard/portal-dashboard.module";

const defaultRoutes = [
	{
		path: 'mail',
		loadChildren: () => import('app/views/pages/apps/mail/mail.module').then(m => m.MailModule)
	},
	// {
	// 	path: 'ecommerce',
	// 	loadChildren: () => import('app/views/pages/apps/e-commerce/e-commerce.module').then(m => m.ECommerceModule),
	// },
	{
		path: 'ngbootstrap',
		loadChildren: () => import('app/views/pages/ngbootstrap/ngbootstrap.module').then(m => m.NgbootstrapModule)
	},
	{
		path: 'material',
		loadChildren: () => import('app/views/pages/material/material.module').then(m => m.MaterialModule)
	},
	{
		path: 'user-management',
		loadChildren: () => import('app/views/pages/user-management/user-management.module').then(m => m.UserManagementModule)
	},
	{
		path: 'wizard',
		loadChildren: () => import('app/views/pages/wizard/wizard.module').then(m => m.WizardModule)
	},
	{
		path: 'builder',
		loadChildren: () => import('app/views/theme/content/builder/builder.module').then(m => m.BuilderModule)
	},
	{
		path: 'error/403',
		component: ErrorPageComponent,
		data: {
			type: 'error-v6',
			code: 403,
			title: '403... Access forbidden',
			desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact Administrator'
		}
	},
	{path: 'error/:type', component: ErrorPageComponent},
	{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
	{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

const adminRoutes = [
	{
		path: 'portal_dashboard',
		loadChildren: () => import('app/views/pages/portal/portal-dashboard/portal-dashboard.module').then(m => m.PortalDashboardModule)
	},
	{
		path: 'control',
		loadChildren: () => import('app/views/pages/portal/control/control.module').then(m => m.ControlModule)
	},
	{
		path: 'property',
		loadChildren: () => import('app/views/pages/portal/property/property.module').then(m => m.PropertyModule)
	},
	{
		path: 'customers',
		loadChildren: () => import('app/views/pages/portal/customers/customers.module').then(m => m.CustomersModule)
	},

	{path: 'error/:type', component: ErrorPageComponent},
	{path: '', redirectTo: 'portal_dashboard', pathMatch: 'full'},
	{path: '**', redirectTo: 'portal_dashboard', pathMatch: 'full'}
];

const customerRoutes = [
	{
		path: 'portal_dashboard',
		loadChildren: () => import('app/views/pages/portal/portal-dashboard/portal-dashboard.module').then(m => m.PortalDashboardModule)
	},
	{
		path: 'basic_info',
		loadChildren: () => import('app/views/pages/portal/basic-info/basic-info.module').then(m => m.BasicInfoModule)
	},
	{
		path: 'property_info',
		loadChildren: () => import('app/views/pages/portal/property-info/property-info.module').then(m => m.PropertyInfoModule)
	},
	{
		path: 'legal_info',
		loadChildren: () => import('app/views/pages/portal/legal-info/legal-info.module').then(m => m.LegalInfoModule)
	},

	{path: 'error/:type', component: ErrorPageComponent},
	{path: '', redirectTo: 'portal_dashboard', pathMatch: 'full'},
	{path: '**', redirectTo: 'portal_dashboard', pathMatch: 'full'}
];

let routes: Routes = [
	{path: 'auth', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule)},
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: null
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

let role = localStorage.getItem('role');
if (role === 'Customer') {
	routes[1].children = customerRoutes;
} else {
	routes[1].children = adminRoutes;
}

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
