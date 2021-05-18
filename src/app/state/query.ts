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

    constructor(
        private heroesStore: HeroesStore,
        private service: Service,
    ) {
        super(heroesStore);
    }

    updateHeroes(heroes: Heroes[]) {
        this.heroesStore.update({heroes: [...heroes]});
    }

    updateSearchVal(val: string) {
        this.heroesStore.update({ searchVal: val })
    }

    getHeroes() {
        this.service.get<Heroes[]>(APIs().heroes).subscribe((res: Heroes[]) => {
            console.log(res)
            this.updateHeroes(res);
        })
    }

}