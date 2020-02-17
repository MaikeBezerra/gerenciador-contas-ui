import { FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
  <p-message *ngIf="temErro()" text="{{ text }}" severity="{{ severity }}">
  </p-message>
  `,
  styles: []
})
export class MessageComponent {

  @Input() error: string;
  @Input() control: FormControl;
  @Input() text: string;
  @Input() severity : string;

  temErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }

}
