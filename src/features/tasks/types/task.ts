export type TaskStatus = 'pending' | 'in-progress' | 'completed';

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
