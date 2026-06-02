export type TaskId = string;

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskStatus = 'created' | 'pending' | 'done' | 'canceled';

export interface CreateTaskInput {
  title: string;
  location?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
}

export interface TaskProps {
  id: TaskId;
  title: string;
  location?: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  scheduledDate?: string;
  createdAt: string;
}

export class Task implements TaskProps {
  id: TaskId;
  title: string;
  location?: string | undefined;
  description?: string | undefined;
  priority: TaskPriority;
  status: TaskStatus;
  scheduledDate?: string | undefined;
  createdAt: string;

  constructor(props: TaskProps) {
    this.id = props.id;
    this.title = props.title;
    this.location = props.location;
    this.description = props.description;
    this.priority = props.priority;
    this.status = props.status;
    this.scheduledDate = props.scheduledDate;
    this.createdAt = props.createdAt;
  }

  static create(idFactory: () => TaskId, input: CreateTaskInput): Task {
    const now = new Date().toISOString();
    return new Task({
      id: idFactory(),
      title: input.title.trim(),
      location: input.location?.trim() || undefined,
      description: input.description?.trim() || undefined,
      priority: input.priority ?? 'medium',
      status: input.status ?? 'created',
      createdAt: now,
    });
  }

  setScheduledDate(dateISO: string) {
    this.scheduledDate = dateISO;
    this.status = 'pending';
  }

  clearScheduledDate() {
    this.scheduledDate = undefined;
    this.status = 'created';
  }

  setStatus(status: TaskStatus) {
    this.status = status;
  }

  update(
    patch: Partial<
      Pick<TaskProps, 'title' | 'location' | 'description' | 'priority'>
    >
  ) {
    if (patch.title !== undefined) this.title = patch.title.trim();
    if (patch.location !== undefined)
      this.location = patch.location?.trim() || undefined;
    if (patch.description !== undefined)
      this.description = patch.description?.trim() || undefined;
    if (patch.priority !== undefined) this.priority = patch.priority;
  }

  toJSON(): TaskProps {
    return {
      id: this.id,
      title: this.title,
      location: this.location,
      description: this.description,
      priority: this.priority,
      status: this.status,
      scheduledDate: this.scheduledDate,
      createdAt: this.createdAt,
    };
  }

  static fromJSON(raw: TaskProps): Task {
    return new Task(raw);
  }
}
