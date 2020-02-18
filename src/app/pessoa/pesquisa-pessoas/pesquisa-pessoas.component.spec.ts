import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaPessoasComponent } from './pesquisa-pessoas.component';

describe('PesquisaPessoasComponent', () => {
  let component: PesquisaPessoasComponent;
  let fixture: ComponentFixture<PesquisaPessoasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaPessoasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaPessoasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
