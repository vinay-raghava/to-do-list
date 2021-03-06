// Angular imports
import { By } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";

// Primeng imports
import { ButtonModule } from "primeng/button";
import { CarouselModule } from "primeng/carousel";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { InputTextareaModule } from "primeng/inputtextarea";

// Custom imports
import { ArrowKey } from "src/app/to-do-home/models/arrow-key";
import { Priority, ToDoItem } from "src/app/to-do-home/models/to-do-list";
import { ToDoListComponent } from "../to-do-list.component";

describe('ToDoListComponent', () => {
  const fakeTodos: ToDoItem[] = [
    {
      id: 'test1',
      editable: false,
      label: 'Get up',
      priority: Priority.High
    },
    {
      id: 'test2',
      editable: false,
      label: 'Eat food',
      priority: Priority.Medium
    },
    {
      id: 'test3',
      editable: false,
      label: 'Wash the car',
      priority: Priority.Low
    }
  ];

  function ensureNavigation(code: string, expectedPage: number) {
    fixture.detectChanges();
    const event = new KeyboardEvent('keyup', { code: code });
    window.dispatchEvent(event);
    expect(component.toDoListView.page).toBe(expectedPage);
  }

  function getDebugElement(selector: string) {
    const debugElement = fixture.debugElement.query(By.css(selector));
    expect(debugElement).toBeTruthy();
    return debugElement;
  }

  function ensureDeletion() {
    fixture.detectChanges();
    const previousSelected = component.selectedToDos;
    const checkboxInput = getDebugElement('p-checkbox input');
    checkboxInput.nativeElement.click();
    expect(component.selectedToDos.length).toBe(previousSelected.length + 1);

    const previousLength = component.toDoList.length;
    const deleteIcon = getDebugElement('.pi-trash');
    deleteIcon.nativeElement.click();
    if (previousLength > 1) expect(component.toDoList.length).toBe(previousLength - 1);
    else expect(component.toDoList.length).toBe(1); // as a new item will be appended if list is empty
  }

  let fixture: ComponentFixture<ToDoListComponent>;
  let component: ToDoListComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToDoListComponent],
      imports: [
        CommonModule,
        CheckboxModule,
        ButtonModule,
        CarouselModule,
        DropdownModule,
        FormsModule,
        InputTextareaModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    component.toDoList = fakeTodos;
  });

  it('should load the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should add a empty list item on click of new button', () => {
    fixture.detectChanges();
    const previousLength = component.toDoList.length;
    const plusIcon = getDebugElement('.pi-plus');
    plusIcon.nativeElement.click();
    fixture.detectChanges();
    expect(component.toDoList.length).toBe(previousLength + 1);
  });

  it('should navigate left in to do items list on click of keyboard left arrow', () => {
    ensureNavigation(ArrowKey.ARROW_LEFT, 2);
  });

  it('should navigate right in to do items list on click of keyboard right arrow', () => {
    ensureNavigation(ArrowKey.ARROW_RIGHT, 1);
  });

  it('should not navigate or perform any action on click of keyboard buttons other than arrow left and right', () => {
    ensureNavigation('KeyI', 0);
  });

  it('should delete the items in the selected items in to do list', () => {
    ensureDeletion();
  });

  it('should add a new empty to do item if all to do items are deleted', () => {
    component.toDoList = [fakeTodos[0]];
    fixture.detectChanges();
    ensureDeletion();
  });

  it('should add a new empty to do item if no to do items are present on component instance', () => {
    component.toDoList = [];
    fixture.detectChanges();
    expect(component.toDoList.length).toBe(1);
  });

});
