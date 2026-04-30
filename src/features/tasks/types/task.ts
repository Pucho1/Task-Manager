export type TaskStatus = 'pending' | 'in_progress' | 'done';

export type Priority = 'low' | 'medium' | 'high';


export interface Task {
  "id": string,
  "title": string,
  "description": string,
  "priority": Priority,
  "status": TaskStatus,
  "createdAt": Date,
  "updatedAt": Date,
};

export interface FilterOption {
  value: string;
  label: string;
};

export type TaskInput = Omit<Task, "id" | "createdAt" | "updatedAt" | "status">;
