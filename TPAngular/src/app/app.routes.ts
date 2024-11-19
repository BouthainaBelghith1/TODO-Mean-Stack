import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list.component';
import { NgModule } from '@angular/core';
import { ItemEditComponent } from './components/item-edit/item-edit.component';

export const routes: Routes = [
    { path: '', component: ItemListComponent }, 
    { path: '**', redirectTo: '' },
    { path: 'edit-item/:id', component: ItemEditComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
