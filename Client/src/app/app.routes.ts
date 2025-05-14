import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './guards/auth.guard';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
    {path: '',component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path:'members',component: MemberListComponent},
            {path:'members/:username',component: MemberDetailComponent},
            {path:'member/edit',component: MemberEditComponent, canDeactivate:[preventUnsavedChangesGuard]},
            {path:'list',component: ListsComponent},
            {path:'messages',component: MessagesComponent},
        ]
    },
   
    {path:'**',component: HomeComponent, pathMatch:'full'}
];
