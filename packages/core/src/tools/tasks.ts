import { generateId, readDB, writeDB } from "./helper/tasks.ts";

type Priority = "high" | "medium" | "low";

interface Task {
    id: string;
    description: string;
    priority: Priority;
    due_date?: string; // format: YYYY-MM-DD
    created_at: string;
}

function get_tasks(filter?: {
    priority?: Priority;
    due_date?: string;
}): Task[] {
    let tasks = readDB();

    if (filter?.priority) {
        tasks = tasks.filter((task) => task.priority === filter.priority);
    }

    if (filter?.due_date) {
        tasks = tasks.filter((task) => task.due_date === filter.due_date);
    }

    return tasks;
}

function create_task(data: {
    description: string;
    priority: Priority;
    due_date: string;
}) {
    const newTask: Task = {
        id: generateId(),
        description: data.description,
        priority: data.priority,
        due_date: data.due_date,
        created_at: new Date().toISOString(),
    };

    try {
        const tasks = readDB();
        tasks.push(newTask);
        writeDB(tasks);

        return { success: true, messsage: "Task created successfully" };
    } catch (error) {
        console.error("Error writing to DB:", error);
        return { success: false, messsage: "Failed to create task" };
    }
}

function delete_task(id: string) {
    try {
        let tasks = readDB();
        const initialLength = tasks.length;
        tasks = tasks.filter((task) => task.id !== id);

        if (tasks.length === initialLength) {
            return { success: false, message: "Task not found" };
        }

        writeDB(tasks);
        return { success: true, message: "Task deleted successfully" };
    } catch (error) {
        console.error("Error writing to DB:", error);
        return { success: false, message: "Failed to delete task" };
    }
}

export { get_tasks, create_task, delete_task, Task };
