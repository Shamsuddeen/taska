const Task = require('../models/task.model');

class TaskRepository {
  
  // CREATE - Add a new task
  async create(taskData) {
    try {
      const task = new Task(taskData);
      return await task.save();
    } catch (error) {
      throw new Error(`Error creating task: ${error.message}`);
    }
  }

  // READ - Get all tasks with optional filtering
  async findAll(filters = {}) {
    try {
      const query = {};
      
      // Apply filters if provided
      if (filters.status) query.status = filters.status;
      if (filters.priority) query.priority = filters.priority;
      
      return await Task.find(query).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }
  }

  // READ - Get a single task by ID
  async findById(taskId) {
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        throw new Error('Task not found');
      }
      return task;
    } catch (error) {
      throw new Error(`Error fetching task: ${error.message}`);
    }
  }

  // READ - Find tasks by status
  async findByStatus(status) {
    try {
      return await Task.find({ status }).sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching tasks by status: ${error.message}`);
    }
  }

  // UPDATE - Update a task by ID
  async update(taskId, updateData) {
    try {
      const task = await Task.findByIdAndUpdate(
        taskId,
        { ...updateData, updatedAt: Date.now() },
        { new: true, runValidators: true }
      );
      
      if (!task) {
        throw new Error('Task not found');
      }
      
      return task;
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  }

  // DELETE - Remove a task by ID
  async delete(taskId) {
    try {
      const task = await Task.findByIdAndDelete(taskId);
      
      if (!task) {
        throw new Error('Task not found');
      }
      
      return task;
    } catch (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
  }

  // Additional utility methods
  async count(filters = {}) {
    try {
      return await Task.countDocuments(filters);
    } catch (error) {
      throw new Error(`Error counting tasks: ${error.message}`);
    }
  }

  async deleteAll() {
    try {
      return await Task.deleteMany({});
    } catch (error) {
      throw new Error(`Error deleting all tasks: ${error.message}`);
    }
  }
}

module.exports = new TaskRepository();