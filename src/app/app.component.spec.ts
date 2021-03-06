// Angular imports
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
@Component({
  selector: 'to-do-list',
  template: '<div></div>'
})
export class FakeComponent{}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FakeComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'to-do-list'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('to-do-list');
  });
});
