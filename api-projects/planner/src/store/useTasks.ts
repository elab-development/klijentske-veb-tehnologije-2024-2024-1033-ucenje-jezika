import { create } from 'zustand';
import { Task, type CreateTaskInput } from '../domain/task';
import { newId } from '../lib/id';
import {
  loadTasks,
  upsertTask,
  deleteTask as storageDeleteTask,
  scheduleTask as storageScheduleTask,
  unscheduleTask as storageUnscheduleTask,
  getTask as storageGetTask,
} from '../lib/taskStorage';

type TasksState = {
  tasks: Task[];
  refresh: () => void;

  createTask: (input: CreateTaskInput) => Task;
  updateTask: (
    id: string,
    patch: Partial<
      Pick<Task, 'title' | 'location' | 'description' | 'priority' | 'status'>
    >
  ) => void;

  scheduleTask: (id: string, dateISO: string) => void;
  unscheduleTask: (id: string) => void;

  markDone: (id: string) => void;
  cancelTask: (id: string) => void;

  deleteTask: (id: string) => void;

  backlog: () => Task[];
  scheduledFor: (dateISO: string) => Task[];
};

export const useTasks = create<TasksState>((set, get) => ({
  tasks: loadTasks(),

  refresh: () => set({ tasks: loadTasks() }),

  createTask: (input) => {
    const t = Task.create(newId, input);
    upsertTask(t);
    set({ tasks: loadTasks() });
    return t;
  },

  updateTask: (id, patch) => {
    const t = storageGetTask(id);
    if (!t) return;
    if (
      patch.title !== undefined ||
      patch.location !== undefined ||
      patch.description !== undefined ||
      patch.priority !== undefined
    ) {
      t.update({
        title: patch.title,
        location: patch.location,
        description: patch.description,
        priority: patch.priority,
      });
    }
    if (patch.status) {
      t.setStatus(patch.status);
    }
    upsertTask(t);
    set({ tasks: loadTasks() });
  },

  scheduleTask: (id, dateISO) => {
    storageScheduleTask(id, dateISO);
    set({ tasks: loadTasks() });
  },

  unscheduleTask: (id) => {
    storageUnscheduleTask(id);
    set({ tasks: loadTasks() });
  },

  markDone: (id) => {
    const t = storageGetTask(id);
    if (!t) return;
    t.setStatus('done');
    upsertTask(t);
    set({ tasks: loadTasks() });
  },

  cancelTask: (id) => {
    const t = storageGetTask(id);
    if (!t) return;
    t.setStatus('canceled');
    upsertTask(t);
    set({ tasks: loadTasks() });
  },

  deleteTask: (id) => {
    storageDeleteTask(id);
    set({ tasks: loadTasks() });
  },

  backlog: () =>
    get().tasks.filter((t) => t.status === 'created' && !t.scheduledDate),
  scheduledFor: (dateISO: string) =>
    get().tasks.filter((t) => t.scheduledDate === dateISO),
}));
