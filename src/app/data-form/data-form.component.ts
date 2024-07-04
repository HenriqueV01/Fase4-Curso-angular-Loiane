import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrl: './data-form.component.css'
})
export class DataFormComponent implements OnInit{

  formulario!: FormGroup;

  usuario: any;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
  ){

  }

  ngOnInit(): void {

    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]

      //Validators.pattern("REGEX");

    });

  }

  onSubmit(){
    // console.log(this.formulario.value);
    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value)).pipe(
      map(res => res)
    ).subscribe(dados => {
          console.log(dados);
          this.resetar();
        },
          (error: any) => alert('erro')
      );
  }

  resetar() {
    this.formulario.reset();
    }

    verificaEmailTouched(){
      // this.formulario.controls[campo];
      return !this.formulario.get('email')?.value && !!this.formulario.get('email')?.touched;
    }

    verificaEmailInvalido(){
      let campoEmail = this.formulario.get('email');
      if(campoEmail?.errors)
        return campoEmail.errors['email'];
    }

    verificaValidTouched(campo: any){
      // this.formulario.controls[campo];
      return !this.formulario.get(campo)?.valid && !!this.formulario.get(campo)?.touched;
    }

    aplicaCSSTextoVermelho(campo: any){
      return {
        'textoErro': this.verificaValidTouched(campo)
      }
    }

    aplicaCSSInvalido(campo: any){
      return {
        'is-invalid': this.verificaValidTouched(campo)
      }
    }

}
