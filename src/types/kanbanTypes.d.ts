export interface Board{
    name: string,
    columns: Column[]
}

export interface Column{
    name: string,
    tasks: Task[]
}

export interface Task{
    title: string,
    description: string,
    status: string          ///Eventually will be an id for which column it is on
    subtasks: Subtask[]
}

export interface Subtask{
    title: string,
    isCompleted: boolean
}
