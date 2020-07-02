// hier unterseiten definieren
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputPageComponent } from "./input-page/input-page.component";
import { ImprintComponent } from "./imprint/imprint.component";
import { HelpComponent } from "./help/help.component";

const routes: Routes = [
  { path: 'input', component: InputPageComponent},
  { path: 'help', component: HelpComponent},
  { path: 'imprint', component: ImprintComponent},
  { path: '**', component: InputPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
