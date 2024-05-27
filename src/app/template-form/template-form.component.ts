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

  ngOnInit(): void {

  }

}
