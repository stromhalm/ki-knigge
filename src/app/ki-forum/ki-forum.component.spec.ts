import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KiForumComponent } from './ki-forum.component';

describe('KiForumComponent', () => {
  let component: KiForumComponent;
  let fixture: ComponentFixture<KiForumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KiForumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KiForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
