// kanbanTypes.d.ts
export interface Board {
    id: string;
    name: string;
}

export interface Column {
    id: string;
    name: string;
    boardId: string; // Foreign key to Board
}

export interface Task {
    id: string;
    title: string;
    description: string;
    columnId: string; // Foreign key to Column
}

export interface Subtask {
    id: string;
    title: string;
    isCompleted: boolean;
    taskId: string; // Foreign key to Task
}