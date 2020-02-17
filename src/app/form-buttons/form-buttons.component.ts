import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-buttons',
  template: `
  <div class="ui-g-12">
    <button pButton [disabled]="isDisabled" type="submit" class="ui-button-primary" label="Salvar"></button>    
    <button pButton type="button" class="ui-button-info" label="Novo"></button>
    <a href="javascript:;">Voltar para a pesquisa</a>
  </div>
  `,
  styles: []
})
export class FormButtonsComponent {
  
  @Input() formualario : NgForm;

  isDisabled() : boolean {
    return !this.formualario.valid;
  }
  
}
