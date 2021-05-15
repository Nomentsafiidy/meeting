import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MeetingComponent } from './meeting.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: MeetingComponent,
    },
];

@NgModule({
    declarations: [MeetingComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MeetingComponentModule {}
