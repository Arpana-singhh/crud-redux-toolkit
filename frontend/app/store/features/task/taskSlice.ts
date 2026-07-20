import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskService, type Task } from "@/app/service/api/task.service";

type TaskState = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk("task/fetchAll", async () => {
  return await TaskService.getAll();
});

export const addTask = createAsyncThunk("task/create",
  async ({ taskName }: { taskName: string }) => {
    return await TaskService.create(taskName);
  }
);

export const editTask = createAsyncThunk(
  "task/update",
  async ({
    id,
    taskName,
    completed,
  }: {
    id: string;
    taskName?: string;
    completed?: boolean;
  }) => {
    return await TaskService.update(id, { taskName, completed });
  }
);

export const removeTask = createAsyncThunk("task/delete", async (id: string) => {
  await TaskService.delete(id);
  return id;
});

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to add task";
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t.taskId === action.payload.taskId
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(editTask.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to update task";
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.taskId !== action.payload);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.error = action.error.message ?? "Failed to delete task";
      });
  },
});

export default taskSlice.reducer;
