import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(
    private service: Service,
    private heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.getHeroes()
  }
  
  filter(form: NgForm) {
    let val = form.value;
    for(let key in val) {
      if(val[key] == '') {
        delete val[key]
      }
    }

    let heroes = this.heroes.filter(hero => hero.name?.trim() == val.name?.trim() || hero?.country.name == val?.country || hero?.phone?.trim() == val?.phone?.trim() || hero?.email?.trim() == val?.email?.trim() || new Date(hero?.date).getTime() == new Date(val?.date).getTime());
    this.heroesService.updateHeroes(heroes)
  }

  clear(form: NgForm) {
    form.reset();
    this.heroesService.getHeroes();
  }

  getHeroes() {
    this.heroesService.heroes$.subscribe((res:Heroes[]) => {
      this.heroes = res
    })
  }

}
