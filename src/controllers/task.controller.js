const taskService = require('../services/task.service');

class TaskController {
  
  // CREATE a new task
  async create(req, res) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: task
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // READ all tasks
  async getAll(req, res) {
    try {
      const { status, priority } = req.query;
      const filters = {};
      
      if (status) filters.status = status;
      if (priority) filters.priority = priority;
      
      const tasks = await taskService.getAllTasks(filters);
      res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // READ a single task
  async getById(req, res) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      res.status(200).json({
        success: true,
        data: task
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // UPDATE a task
  async update(req, res) {
    try {
      const task = await taskService.updateTask(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        data: task
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // DELETE a task
  async delete(req, res) {
    try {
      await taskService.deleteTask(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully'
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get task statistics
  async getStats(req, res) {
    try {
      const stats = await taskService.getTaskStats();
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new TaskController();