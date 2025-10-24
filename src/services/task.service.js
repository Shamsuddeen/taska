const taskRepository = require('../repositories/task.repository');

class TaskService {
    
    async createTask(taskData) {
        // Business logic: validate due date
        if (taskData.dueDate && new Date(taskData.dueDate) < new Date()) {
            throw new Error('Due date cannot be in the past');
        }
        
        return await taskRepository.create(taskData);
    }

    async getAllTasks(filters) {
        return await taskRepository.findAll(filters);
    }

    async getTaskById(taskId) {
        return await taskRepository.findById(taskId);
    }

    async updateTask(taskId, updateData) {
        // Business logic: prevent invalid status transitions
        if (updateData.status === 'completed') {
            const task = await taskRepository.findById(taskId);
            if (task.status === 'pending') {
                throw new Error('Cannot mark pending task as completed. Move to in-progress first.');
            }
        }
    
        return await taskRepository.update(taskId, updateData);
    }

    async deleteTask(taskId) {
        return await taskRepository.delete(taskId);
    }

    async getTaskStats() {
        const total = await taskRepository.count();
        const pending = await taskRepository.count({ status: 'pending' });
        const inProgress = await taskRepository.count({ status: 'in-progress' });
        const completed = await taskRepository.count({ status: 'completed' });
        
        return {
            total,
            pending,
            inProgress,
            completed
        };
    }
}

module.exports = new TaskService();