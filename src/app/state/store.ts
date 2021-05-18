import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Heroes } from '../interfaces';

export interface HeroesState {
    heroes: Heroes[];
    searchVal: string;
}

export function getInitialState(): HeroesState {
    return {
        heroes: [],
        searchVal: ''
    };
}

@Injectable({
    providedIn: 'root'
})

@StoreConfig({ name: 'heroes' })
export class HeroesStore extends Store<HeroesState> {
    constructor() {
        super(getInitialState());
    }
}