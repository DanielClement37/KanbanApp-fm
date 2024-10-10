import React, {useContext, useEffect, useState} from "react";
import "../../styles/AddEditForm.css";
import {AppContext} from "../../stateManagement/context/AppContext";
import {Subtask, Task} from "../../types/kanbanTypes";
import {ADD_TASK, EDIT_TASK} from "../../stateManagement/actions/actiontypes";
import AddEditListItem from "../FormComponents/AddEditListItem";
import {generateUniqueId} from "../../Helpers/generateUUID.ts";

interface AddEditTaskProps {
    closeTaskModal: () => void;
    isEditMode: boolean;
    taskId?: string;
}

const AddEditTask = ({closeTaskModal, isEditMode, taskId}: AddEditTaskProps) => {
    const {state, dispatch} = useContext(AppContext);
    const {tasks, subtasks, columns} = state;
    const {activeBoardId} = state.ui;

    const columnsForBoard = Object.values(columns).filter((col) => col.boardId === activeBoardId);

    const initialTaskState: Task = isEditMode && taskId && tasks[taskId]
        ? tasks[taskId]
        : {
            id: '', // Generate new ID when adding
            title: '',
            description: '',
            columnId: columnsForBoard[0]?.id || '',
        };

    const [localTask, setLocalTask] = useState<Task>(initialTaskState);
    const [subtasksForTask, setSubtasksForTask] = useState<Subtask[]>([]);
    const [errors, setErrors] = useState({
        title: '',
        subtasks: [] as string[],
    });

    useEffect(() => {
        if (isEditMode && taskId) {
            const existingSubtasks = Object.values(subtasks).filter((subtask) => subtask.taskId === taskId);
            setSubtasksForTask(existingSubtasks);
        } else {
            setSubtasksForTask([
                {id: '', title: '', isCompleted: false, taskId: ''},
                {id: '', title: '', isCompleted: false, taskId: ''},
            ]);
        }
    }, [isEditMode, taskId, subtasks]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalTask({...localTask, title: e.target.value});
    };

    const handleTitleBlur = () => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            title: localTask.title.trim() ? '' : "Can't be empty",
        }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setLocalTask({...localTask, description: e.target.value});
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newColumnId = e.target.value;
        setLocalTask({...localTask, columnId: newColumnId});
    };

    const handleSubtaskChange = (index: number, value: string) => {
        const newSubtasks = [...subtasksForTask];
        newSubtasks[index].title = value;
        setSubtasksForTask(newSubtasks);

        setErrors((prevErrors) => {
            const newSubtaskErrors = [...prevErrors.subtasks];
            newSubtaskErrors[index] = value.trim() ? '' : prevErrors.subtasks[index];
            return {
                ...prevErrors,
                subtasks: newSubtaskErrors,
            };
        });
    };

    const handleSubtaskBlur = (index: number) => {
        setErrors((prevErrors) => {
            const newSubtaskErrors = [...prevErrors.subtasks];
            newSubtaskErrors[index] = subtasksForTask[index].title.trim() ? '' : "Can't be empty";
            return {
                ...prevErrors,
                subtasks: newSubtaskErrors,
            };
        });
    };

    const addSubtask = () => {
        setSubtasksForTask([
            ...subtasksForTask,
            { id: '', title: '', isCompleted: false, taskId: '' },
        ]);
        setErrors((prevErrors) => ({
            ...prevErrors,
            subtasks: [...prevErrors.subtasks, ''],
        }));
    };

    const removeSubtask = (index: number) => {
        const newSubtasks = subtasksForTask.filter((_, i) => i !== index);
        setSubtasksForTask(newSubtasks);

        const newSubtaskErrors = errors.subtasks.filter((_, i) => i !== index);
        setErrors((prevErrors) => ({
            ...prevErrors,
            subtasks: newSubtaskErrors,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let hasErrors = false;
        const newErrors = {title: '', subtasks: [] as string[]};

        if (!localTask.title.trim()) {
            newErrors.title = "Can't be empty";
            hasErrors = true;
        }

        newErrors.subtasks = subtasksForTask.map((subtask) => {
            if (!subtask.title.trim()) {
                hasErrors = true;
                return "Can't be empty";
            }
            return '';
        });

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        const filteredSubtasks = subtasksForTask.filter((subtask) => subtask.title.trim() !== '');

        if (isEditMode && taskId) {
            dispatch({
                type: EDIT_TASK,
                payload: {
                    ...localTask,
                },
            });

            filteredSubtasks.forEach((subtask) => {
                if (subtask.id) {
                    dispatch({
                        type: 'EDIT_SUBTASK',
                        payload: subtask,
                    });
                } else {
                    const newSubtaskId = generateUniqueId();
                    dispatch({
                        type: 'ADD_SUBTASK',
                        payload: {
                            ...subtask,
                            id: newSubtaskId,
                            taskId: taskId,
                        },
                    });
                }
            });
        } else {
            const newTaskId = generateUniqueId();
            const newTask: Task = {
                ...localTask,
                id: newTaskId,
            };

            dispatch({
                type: ADD_TASK,
                payload: newTask,
            });

            filteredSubtasks.forEach((subtask) => {
                const newSubtaskId = generateUniqueId();
                const newSubtask: Subtask = {
                    ...subtask,
                    id: newSubtaskId,
                    taskId: newTaskId,
                };
                dispatch({
                    type: 'ADD_SUBTASK',
                    payload: newSubtask,
                });
            });
        }

        closeTaskModal();
    };

    return (
        <div className="modal-overlay" onClick={closeTaskModal}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-title-container">
                    {isEditMode ? (
                        <h1 className="heading-L">Edit Task</h1>
                    ) : (
                        <h1 className="heading-L">Add New Task</h1>
                    )}
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="input-container">
                        <div className="input-item">
                            <label htmlFor="title" className="text-M grey-text">
                                Title
                            </label>
                            <div className="input-field-container">
                                <input
                                    type="text"
                                    id="title"
                                    className={`input-field text-L ${errors.title ? 'input-field--error' : ''}`}
                                    placeholder="e.g. Take coffee break"
                                    value={localTask.title}
                                    onChange={handleTitleChange}
                                    onBlur={handleTitleBlur}
                                />
                                {errors.title && (
                                    <span className="input-error-message text-M">{errors.title}</span>
                                )}
                            </div>
                        </div>
                        <div className="input-item">
                            <label htmlFor="description" className="text-M grey-text">
                                Description
                            </label>
                            <textarea
                                id="description"
                                className="input-field text-area text-L"
                                placeholder="e.g. It’s always good to take a break..."
                                value={localTask.description}
                                onChange={handleDescriptionChange}
                            />
                        </div>
                        <div className="list-form-container">
                            <label className="text-M grey-text">Subtasks</label>
                            <div className="list-input-container">
                                {subtasksForTask.map((subtask, index) => (
                                    <AddEditListItem
                                        key={index}
                                        index={index}
                                        value={subtask.title}
                                        placeholder="e.g. Make coffee"
                                        onChange={handleSubtaskChange}
                                        onBlur={() => handleSubtaskBlur(index)}
                                        onRemove={removeSubtask}
                                        error={errors.subtasks[index]}
                                    />
                                ))}
                            </div>
                            <button
                                type="button"
                                className="add-list-item-btn text-M"
                                onClick={addSubtask}
                            >
                                + Add New Subtask
                            </button>
                        </div>
                        <div className="input-item">
                            <label htmlFor="status" className="text-M grey-text">
                                Status
                            </label>
                            <select
                                id="status"
                                className="input-field text-L"
                                value={localTask.columnId}
                                onChange={handleStatusChange}
                            >
                                {columnsForBoard.map((col) => (
                                    <option key={col.id} value={col.id}>
                                        {col.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-item">
                            <button type="submit" className="btn submit-btn text-L">
                                {isEditMode ? 'Save Changes' : 'Create Task'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditTask;
