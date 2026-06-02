import { Task, type TaskProps } from '../domain/task';

function readRaw(): TaskProps[] {
  try {
    const raw = localStorage.getItem('planit.tasks');
    if (!raw) return [];
    return JSON.parse(raw) as TaskProps[];
  } catch {
    return [];
  }
}

function writeRaw(list: TaskProps[]) {
  localStorage.setItem('planit.tasks', JSON.stringify(list));
}

export function loadTasks(): Task[] {
  return readRaw().map(Task.fromJSON);
}

export function saveTasks(tasks: Task[]) {
  writeRaw(tasks.map((t) => t.toJSON()));
}

export function upsertTask(task: Task) {
  const list = readRaw();
  const idx = list.findIndex((t) => t.id === task.id);
  if (idx >= 0) list[idx] = task.toJSON();
  else list.push(task.toJSON());
  writeRaw(list);
}

export function deleteTask(taskId: string) {
  const list = readRaw().filter((t) => t.id !== taskId);
  writeRaw(list);
}

export function getTask(taskId: string): Task | undefined {
  const raw = readRaw().find((t) => t.id === taskId);
  return raw ? Task.fromJSON(raw) : undefined;
}

export function scheduleTask(taskId: string, dateISO: string) {
  const t = getTask(taskId);
  if (!t) return;
  t.setScheduledDate(dateISO);
  upsertTask(t);
}

export function unscheduleTask(taskId: string) {
  const t = getTask(taskId);
  if (!t) return;
  t.clearScheduledDate();
  upsertTask(t);
}
