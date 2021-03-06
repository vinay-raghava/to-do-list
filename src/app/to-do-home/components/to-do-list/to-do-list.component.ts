// Angular imports
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';

// Custom imports
import { ArrowKey } from '../../models/arrow-key';
import { Priority, ToDoItem } from '../../models/to-do-list';

// Primeng imports
import { Carousel } from 'primeng/carousel';

@Component({
    selector: 'to-do-list',
    templateUrl: 'to-do-list.component.html',
    styleUrls: ['to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
    @Input() public toDoList: ToDoItem[] = [];
    // selected to do items
    public selectedToDos: string[] = [];
    @ViewChild('toDoListView') public toDoListView: Carousel = <Carousel>{};

    // default priority dropdown options
    public priorities = [
        {
            name: 'High',
            value: Priority.High
        },
        {
            name: 'Low',
            value: Priority.Low
        },
        {
            name: 'Medium',
            value: Priority.Medium,
        }
    ];

    /**
     * Angular life cycle hook
     */
    public ngOnInit() {
        if (!this.toDoList.length) this.addNewListItem();
    }

    /**
     * Adds a new to do item
     */
    public addNewListItem() {
        // console.log('called this add');
        this.toDoListView.page = this.toDoList.length;
        this.toDoList = [...this.toDoList, {
            id: new Date().valueOf().toString(),
            label: '',
            priority: Priority.Low,
            editable: true
        }]
    }

    /**
     * Listens to keyboard arrow keys and navigates to next to do item based on key.
     * @param event keyboard event
     */
    @HostListener('window:keyup', ['$event'])
    public changePage(event: KeyboardEvent) {
      console.log(event);
        if (event.code === ArrowKey.ARROW_LEFT) {
          this.toDoListView.navBackward(event);
        }
        else if (event.code === ArrowKey.ARROW_RIGHT) {
            this.toDoListView.navForward(event);
        }
    }

    /**
     * Deletes the selected to do items. If the list is empty creates an empty editable to do item.
     */
    public deleteSelected() {
        this.toDoList = this.toDoList.filter((toDoItem: ToDoItem) => !this.selectedToDos.includes(toDoItem.id));
        if (!this.toDoList.length) {
            this.addNewListItem();
        }
    }
}
