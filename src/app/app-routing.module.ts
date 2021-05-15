import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'meet',
                loadChildren: () => import('./components/meeting/meeting.module').then((module) => module.MeetingComponentModule),
            },
            {
                path: '**',
                redirectTo: 'meet',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
