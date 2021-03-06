import { Component, OnInit, ViewChild } from '@angular/core';
import { Service, APIs } from '../../services';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Heroes } from '../../interfaces';
import { HeroesService } from 'src/app/state/query';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[];
  heroes;

  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private service: Service,
    private heroesService: HeroesService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    await this.getHeroes();
    await this.search();

    let queryParams = this.route.snapshot.queryParams;
    if(Object.keys(queryParams).length) {
      this.heroesService.updateQueryParams(queryParams)
      console.log(queryParams);
    }
  }

  getHeroes() {
    this.heroesService.getHeroes();
    this.heroesService.heroes$.subscribe((res:Heroes[]) => {
      if(res.length) {
        this.heroes = new MatTableDataSource<Heroes>(res);
        this.heroes.sort = this.sort;
        this.displayedColumns = Object.keys(res[0]);
      }
    })
  }

  search() {
    this.heroesService.searchVal$.subscribe((val: string) => { 
      if (val.length) {
        this.heroes.filter = val.trim().toLowerCase()
      }
    })
  }

}
