import { Heroes } from '../interfaces';
import { HeroesStore, HeroesState } from './store';
import { Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Service, APIs } from '../services';

@Injectable({
    providedIn: 'root'
})

export class HeroesService extends Query<HeroesState> {

    heroes$ = this.select('heroes');
    searchVal$ = this.select('searchVal');
    queryParams$ = this.select('queryParams');
    queries;

    constructor(
        private heroesStore: HeroesStore,
        private service: Service,
    ) {
        super(heroesStore);
        this.getQuery()
    }

    updateHeroes(heroes: Heroes[]) {
        this.heroesStore.update({ heroes: [...heroes] });
    }

    updateQueryParams(queryParams: {}) {
        this.heroesStore.update({ queryParams })
    }

    updateSearchVal(val: string) {
        this.heroesStore.update({ searchVal: val })
    }

    getHeroes() {
        this.service.get<Heroes[]>(APIs().heroes).subscribe((res: Heroes[]) => {
            console.log(this.queries)
            console.log(res);
            let heroes = res;
            if (this.queries && Object.keys(this.queries).length) {
                heroes = heroes.filter(hero => hero.name?.trim() == this.queries.user_name?.trim() || hero?.country.name == this.queries?.country || hero?.phone?.trim() == this.queries?.user_phone?.trim() || hero?.email?.trim() == this.queries?.email?.trim() || new Date(hero?.date).getTime() == new Date(this.queries?.date).getTime());
            }
            this.updateHeroes(heroes);
        })
    }

    getQuery() {
        this.queryParams$.subscribe(res => {
            this.queries = res
        })
    }

}