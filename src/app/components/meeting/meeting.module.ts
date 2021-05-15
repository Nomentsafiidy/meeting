import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MeetingComponent } from './meeting.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: MeetingComponent,
    },
];

@NgModule({
    declarations: [MeetingComponent],
    imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class MeetingComponentModule {}
