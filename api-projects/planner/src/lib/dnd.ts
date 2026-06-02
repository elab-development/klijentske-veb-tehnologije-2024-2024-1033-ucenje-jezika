// Simple helpers for native HTML5 drag & drop
export const DND_MIME = 'application/x-planit-task-id';

export function setDragTaskId(e: React.DragEvent, taskId: string) {
  e.dataTransfer.setData(DND_MIME, taskId);
  e.dataTransfer.setData('text/plain', taskId);
  e.dataTransfer.effectAllowed = 'move';
}

export function getDragTaskId(e: React.DragEvent): string | null {
  return (
    e.dataTransfer.getData(DND_MIME) ||
    e.dataTransfer.getData('text/plain') ||
    null
  );
}
