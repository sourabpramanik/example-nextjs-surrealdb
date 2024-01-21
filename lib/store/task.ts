import { surrealDatabase } from '@/app/api/lib/surreal';
import { Task } from '../schema';
import { create } from 'zustand';

type TaskStore = {
    tasks: Task[],
    appendTask?: (newTasks: Task) => void,
    removeTask?: (newTask: Task) => void,
    updateTask?: (newTask: Task) => void,
}

export const useTaskStore = create<TaskStore>((set) => {
    const store = {
        tasks: [],
        appendTask: (newTask: Task) => set((state) => ({ tasks: [...state.tasks, newTask] })),
        removeTask: (removedTask: Task) => set((state) => ({
            tasks: state.tasks.reduce((arr: Task[], task) => {
                if (task.id !== removedTask.id) {
                    arr.push(task)
                }
                return arr
            }, [])
        })),
        updateTask: (modifiedTask: Task) => set((state) => ({
            tasks: state.tasks.reduce((arr: Task[], task) => {
                if (task.id === modifiedTask.id) {
                    arr.push(modifiedTask)
                } else {
                    arr.push(task)
                }
                return arr
            }, [])
        })),
    }

    surrealDatabase.live<Task>('task', ({ action, result }) => {
        switch (action) {
            case 'CREATE':
                store.appendTask(result);
                break;
            case 'DELETE':
                store.removeTask(result);
                break;
            case 'UPDATE':
                store.updateTask(result);
                break;

        }
    });
    return store;
});