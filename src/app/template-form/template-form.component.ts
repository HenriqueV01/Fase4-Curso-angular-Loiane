import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.css'
})
export class TemplateFormComponent implements OnInit{

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(){}

  onSubmit(form: NgForm){
    console.log(form.value);
    console.log(this.usuario);
  }

  verificaValidTouched(campo: any){
    return !campo.valid && campo.touched;
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

  ngOnInit(): void {

  }

}
