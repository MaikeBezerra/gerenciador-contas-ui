import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoListComponent } from './lancamento-list.component';

describe('LancamentoListComponent', () => {
  let component: LancamentoListComponent;
  let fixture: ComponentFixture<LancamentoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
