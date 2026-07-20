import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
    {
      taskName: {
        type: String,
        required: true,
        trim: true,
      },
  
      taskDetail: {
        type: String,
        default: "",
        trim: true,
      },
  
      completed: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      toJSON: {
        transform: (doc, ret) => {
          ret.taskId = ret._id;
          delete ret._id;
          delete ret.__v;
          return ret;
        },
      },
    }
  );

  const taskModel = mongoose.models.Task || mongoose.model("Task", taskSchema);
  export default taskModel;