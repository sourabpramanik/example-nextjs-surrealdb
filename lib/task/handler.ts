import { Task } from "../schema";

const endpoint = process.env.NEXT_PUBLIC_BASE_URL + '/api/task'
// Create a new task
export const createTask = async (payload: Task) => {
    const res: {
        success: boolean;
        data?: Task;
    } = await (
        await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
    ).json();

    return res;
}

// Fetch all tasks
export const getAllTasks = async () => {
    const res: {
        success: boolean;
        data?: Task[];
    } = await (
        await fetch(endpoint)
    ).json();

    return res;
};

// Fetch task by id
export const getTaskById = async (id: string) => {
    const res: {
        success: boolean;
        data?: Task;
    } = await (
        await fetch(endpoint + "/" + id)
    ).json();

    return res;
};

// Update task by id
export const updateTaskById = async (id: string, payload: Task) => {
    console.log(id);

    const res: {
        success: boolean;
        data?: Task;
    } = await (
        await fetch(endpoint + "/" + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
    ).json();

    return res;
};

// Delete task by id
export const deleteTaskById = async (id: string) => {
    await fetch(endpoint + "/" + id, { method: "DELETE" })
};
