import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  // CAMBIAR ESTE URL POR EL SUYO
  private url = 'https://crududemy-27479-default-rtdb.firebaseio.com';

  // MI URL, poner el suyo propio de firebase RealTime Database
  // https://crududemy-27479-default-rtdb.firebaseio.com

  constructor(private http: HttpClient) { }


  crearHeroe(heroe: HeroeModel) {

    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );

  }

  actualizarHeroe(heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);


  }

  borrarHeroe(id: string | undefined) {

    return this.http.delete(`${this.url}/heroes/${id}.json`);

  }


  getHeroe(id: string) {

    console.log(this.http.get(`${this.url}/heroes/${id}.json`));

    return this.http.get(`${this.url}/heroes/${id}.json`);

  }


  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo),
        delay(0)
      );
  }

  // private crearArreglo(heroesObj: { [index: string]: any }) {


  //   if (heroesObj === null) {
  //     const nada: HeroeModel[] = [{
  //       id: "",
  //       nombre: "",
  //       poder: "",
  //       vivo: true
  //     }]
  //     return nada;
  //   }

  //   const heroes: HeroeModel[] = [];

  //   Object.keys(heroesObj).forEach(key => {
  //     console.log(key);

  //     const heroe: HeroeModel = heroesObj[key];
  //     heroe.id = key;

  //     heroes.push(heroe);
  //   });


  //   return heroes;

  // }
  private crearArreglo(heroesObj: object | any) {

    const heroes: HeroeModel[] = [];

    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach(key => {

      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });


    return heroes;

  }


}
