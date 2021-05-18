import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Heroes } from 'src/app/interfaces';
import { Service, APIs } from 'src/app/services';
import { HeroesService } from 'src/app/state/query';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  countries$: Observable<[]> = this.service.get(APIs().countries)
  heroes: Heroes[];
  form = {
    email: '',
    user_phone: '',
    user_name: '',
    country: '',
    date: ''
  }

  constructor(
    private service: Service,
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getHeroes();
    console.log(this.getQueryParams())
  }

  getQueryParams() {
    this.heroesService.queryParams$.subscribe(res => this.form = { ...this.form, ...res })
  }

  filter(form: NgForm) {
    let val = form.value;
    for (let key in val) {
      if (val[key] == '') {
        delete val[key]
      }
    }

    const queryParams: Params = val;

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );

    let heroes = this.heroes.filter(hero => hero.name?.trim() == val.user_name?.trim() || hero?.country.name == val?.country || hero?.phone?.trim() == val?.user_phone?.trim() || hero?.email?.trim() == val?.email?.trim() || new Date(hero?.date).getTime() == new Date(val?.date).getTime());
    this.heroesService.updateHeroes(heroes)
  }

  clear(form: NgForm) {
    form.reset();
    this.heroesService.getHeroes();
    this.heroesService.updateQueryParams(null)
  }

  getHeroes() {
    this.heroesService.heroes$.subscribe((res: Heroes[]) => {
      this.heroes = res
    })
  }

}
