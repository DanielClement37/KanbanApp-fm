import React, {useContext} from "react";
import "../styles/Board.css";
import {AppContext} from "../stateManagement/context/AppContext";
import {Task} from "../types/kanbanTypes";

type TaskCardProps = {
    task: Task;
    openTaskModal: () => void;
};

const TaskCard = ({task, openTaskModal}: TaskCardProps) => {
    const {state} = useContext(AppContext);
    const {subtasks} = state;

    const subtasksForTask = Object.values(subtasks).filter((subtask) => subtask.taskId === task.id);

    const completedSubtasks = subtasksForTask.filter((subtask) => subtask.isCompleted).length;

    return (
        <div className="task-card" onClick={openTaskModal}>
            <h3 className="heading-M">{task.title}</h3>
            <p className="sub-task-count text-M">
                {completedSubtasks} of {subtasksForTask.length} subtasks
            </p>
        </div>
    );
};

export default TaskCard;
