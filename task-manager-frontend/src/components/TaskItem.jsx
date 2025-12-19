import api from "../api/axios";

const TaskItem = ({ task, projectId, refresh }) => {  
  const toggleComplete = async () => {
    try {
  
      await api.put(`/projects/${projectId}/tasks/${task.id}`, { 
        completed: !task.completed 
      });
      refresh();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  const deleteTask = async () => {

    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    
    try {
    
      await api.delete(`/projects/${projectId}/tasks/${task.id}`);
      refresh();
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded shadow-sm">
      <div className="flex-grow-1">
        <h6 
          className="mb-1" 
          style={{ 
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "#6c757d" : "inherit",
            fontWeight: task.completed ? "normal" : "500"
          }}
        >
          {task.title}
        </h6>
        
        {task.description && (
          <p className="mb-2 text-muted small">{task.description}</p>
        )}
        
        <small className="text-muted">
          <i className="bi bi-calendar me-1"></i>
          Due: {formatDate(task.dueDate)}
        </small>
        
        {task.completed && (
          <div className="mt-2">
            <span className="badge bg-success">
              <i className="bi bi-check-circle me-1"></i>
              Completed
            </span>
          </div>
        )}
      </div>
      
      <div className="d-flex gap-2 ms-3">
        <button 
          className={`btn btn-sm ${task.completed ? "btn-warning" : "btn-success"}`}
          onClick={toggleComplete}
          title={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          <i className={`bi ${task.completed ? "bi-arrow-counterclockwise" : "bi-check-lg"}`}></i>
          {task.completed ? " Undo" : " Complete"}
        </button>
        
        <button 
          className="btn btn-danger btn-sm"
          onClick={deleteTask}
          title="Delete task"
        >
          <i className="bi bi-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
