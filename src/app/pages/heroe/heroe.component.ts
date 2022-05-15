import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {


  heroe = new HeroeModel();

  constructor(private heroesService: HeroesService,
    private route: ActivatedRoute) { }

  // ngOnInit(): void {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   console.log("BBBBBBBBBBBBBBBBBBBBbb" + id)

  //   if (id !== 'nuevo') {
  //     this.heroesService.getHeroe(id)
  //       .subscribe((resp: any) => {
  //         console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA " + resp.name)

  //         this.heroe = resp;
  //         this.heroe.id = resp.id;
  //       })
  //   }

  // }

  ngOnInit() {

    const id: any = this.route.snapshot.paramMap.get('id');


    if (id !== 'nuevo') {

      this.heroesService.getHeroe(id)
        .subscribe((resp: HeroeModel | any) => {
          this.heroe = resp;
          this.heroe.id = id;
          console.log("ZZZZZZZZZZ " + resp.id)
        });

    }

  }

  guardar(form: NgForm) {
    if (form.invalid) {

      return;
    }


    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'warning',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    console.log("AAAAAAAAAAAAAA " + this.heroe.id);

    if (this.heroe.id) {
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else {
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe(resp => {

      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

    });


    // if (this.heroe.id) {

    //   peticion = this.heroesService.actualizarHeroe(this.heroe);

    //   peticion.subscribe(reps => {
    //     Swal.fire({
    //       title: this.heroe.nombre,
    //       text: 'Se actualizo correctamente',
    //       icon: 'info'
    //     })
    //   });

    // } else {

    //   peticion = this.heroesService.crearHeroe(this.heroe);
    //   peticion.subscribe(reps => {
    //     Swal.fire({
    //       title: this.heroe.nombre,
    //       text: 'Se Creo correctamente',
    //       icon: 'success'
    //     })
    //   });
    // }
  }
}
