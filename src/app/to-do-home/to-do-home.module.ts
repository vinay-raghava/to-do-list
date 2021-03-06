// Angular imports
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// Primeng imports
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';

// Custom imports
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
@NgModule({
    imports: [
        ButtonModule,
        CarouselModule,
        CheckboxModule,
        CommonModule,
        DropdownModule,
        FormsModule,
        InputTextareaModule,
        ToolbarModule
    ],
    exports: [
        ToDoListComponent
    ],
    declarations: [
        ToDoListComponent
    ],
    providers: [],
})
export class ToDoHomeModule { }
