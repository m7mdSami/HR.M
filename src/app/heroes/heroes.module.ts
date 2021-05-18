import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { UsersComponent } from './users/users.component';
import { HeroesComponent } from './heroes.component';
import { FilterComponent } from './filter/filter.component';

// Angular Material
import { MaterialModule } from '../material-module';
import { LayoutModule } from '@angular/cdk/layout';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
    HeroesComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
    LayoutModule,
    FormsModule
  ]
})
export class HeroesModule { }
