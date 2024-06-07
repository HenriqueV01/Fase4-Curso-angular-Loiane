import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';

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

  constructor(private http: HttpClient){}

  onSubmit(form: NgForm){
    console.log(form.value);
    // console.log(this.usuario);
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

  consultaCEP(cep: any, form: NgForm) {
    // throw new Error('Method not implemented.');
    cep = cep.replace(/\D/g, ''); //REGEX para por apenas números.

    if(cep != ""){
      var validacep = /^[0-9]{8}$/;

      this.resetaDadosForm(form);

      if(validacep.test(cep)){
        this.http.get(`https://viacep.com.br/ws/${cep}/json`).pipe(map((dados: any)=>dados)).subscribe(dados => this.populaDadosForm(dados, form));

      }
    }
  }

  populaDadosForm(dados: any, formulario: NgForm){
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: "",
    //     complemento: dados.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf
    //     }
    //   });

      formulario.form.patchValue({ //Altera apenas a parte específica do formulário.
        endereco: {
          cep: dados.cep,
          // numero: "",
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }

      });
  }

  resetaDadosForm(formulario: NgForm){

    formulario.form.patchValue({ //Altera apenas a parte específica do formulário.
      endereco: {
        // cep: null,
        // numero: "",
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }

    });
}



}
