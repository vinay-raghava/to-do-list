export interface ToDoItem {
  id: string;
  priority: Priority;
  label: string;
  editable: boolean;
}

export enum Priority {
  Low = 'LOW',
  High = 'HIGH',
  Medium = 'MEDIUM'
}
