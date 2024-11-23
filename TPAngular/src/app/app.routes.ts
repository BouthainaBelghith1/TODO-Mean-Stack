import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { NgModule } from '@angular/core';
import { ItemEditComponent } from './components/item-edit/item-edit.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

export const routes: Routes = [
    { path: '', component: ItemListComponent }, 
    { path: 'edit-item/:id', component: ItemEditComponent },
    { path: 'details/:id', component: ItemDetailsComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), RouterModule],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
