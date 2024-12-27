export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskDto {
  title: string;
  color: string;
}

export interface UpdateTaskDto {
  title?: string;
  color?: string;
  completed?: boolean;
}

export interface TaskResponse {
  success: boolean;
  data?: Task | Task[];
  error?: string;
}
