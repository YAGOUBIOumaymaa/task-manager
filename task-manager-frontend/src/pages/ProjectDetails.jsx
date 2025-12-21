import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import TaskItem from "../components/TaskItem";
import ProgressBar from "../components/ProgressBar";

import '../css/ProjectDetails.css';

const AddTaskModal = ({ show, onClose, onSubmit, formData, setFormData }) => {
  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.taskTitle.trim()) return;
    onSubmit();
  };

  return (
    <div className="modal fade show d-block modal-overlay">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal-content-custom">

          <div className="modal-header modal-header-custom">
            <h5 className="modal-title">Add New Task</h5>
            <button className="btn-close" onClick={onClose} />
          </div>

          <div className="modal-body">
            <input
              className="form-control modal-input"
              name="taskTitle"
              placeholder="Task Title"
              value={formData.taskTitle}
              onChange={handleChange}
            />

            <textarea
              className="form-control modal-textarea"
              name="taskDescription"
              placeholder="Description"
              value={formData.taskDescription}
              onChange={handleChange}
            />

            <input
              type="date"
              className="form-control modal-input"
              name="taskDueDate"
              value={formData.taskDueDate}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
            <button className="btn btn-create" onClick={handleSubmit}>Create Task</button>
          </div>

        </div>
      </div>
    </div>
  );
};

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [taskForm, setTaskForm] = useState({ taskTitle: "", taskDescription: "", taskDueDate: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const refreshProjectData = async () => {
    await Promise.all([fetchProject(), fetchTasks(), fetchProgress()]);
  };

  const fetchProject = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
    } catch {
      console.error("Failed to fetch project details");
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/projects/${id}/tasks`);
      setTasks(response.data || []);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const response = await api.get(`/projects/${id}/progress`);
      const data = response.data;
      
      setProgress(data.progress);
      setTotalTasks(data.totalTasks);
      setCompletedTasks(data.completedTasks);
      
    } catch (error) {
      console.error("Failed to fetch progress:", error);
      setProgress(0);
      setTotalTasks(0);
      setCompletedTasks(0);
    }
  };

  const addTask = async () => {
    try {
      await api.post(`/projects/${id}/tasks`, {
        title: taskForm.taskTitle.trim(),
        description: taskForm.taskDescription.trim(),
        dueDate: taskForm.taskDueDate || null,
      });

      setTaskForm({ taskTitle: "", taskDescription: "", taskDueDate: "" });
      setShowModal(false);
      refreshProjectData();
    } catch {
      alert("Failed to add task");
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    refreshProjectData();
  }, [id]);

  return (
    <div className="container project-container">

      <div className="project-header">
        <h2>{project.title || `Project #${id}`}</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          ➕ Add Task
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-4 project-search">
        <input
          type="text"
          className="form-control border-primary rounded"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {}
      <div className="card project-card">
        <div className="card-body">
          <h5 className="card-title mb-3">Project Progress</h5>
          
          {/* Barre de progression avec pourcentage à droite */}
          <div className="d-flex align-items-center mb-4">
            <div className="flex-grow-1 me-3">
              <ProgressBar value={progress} />
            </div>
            <div className="progress-percentage">
              <span className="percentage-value">{progress}%</span>
            </div>
          </div>
          
          {/* Statistiques simples */}
          <div className="progress-stats">
            <div className="stat-item">
              <div className="stat-label">Total Tasks</div>
              <div className="stat-value total">{totalTasks}</div>
            </div>
            
            <div className="stat-divider"></div>
            
            <div className="stat-item">
              <div className="stat-label">Completed</div>
              <div className="stat-value completed">{completedTasks}</div>
            </div>
            
            <div className="stat-divider"></div>
            
            <div className="stat-item">
              <div className="stat-label">Pending</div>
              <div className="stat-value pending">{totalTasks - completedTasks}</div>
            </div>
          </div>
        </div>
      </div>

      {/* TASK LIST */}
      <div className="card project-card">
        <div className="card-body">
          {loading ? (
            <p>Loading...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-muted">No tasks found</p>
          ) : (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                projectId={id}
                refresh={refreshProjectData}
              />
            ))
          )}
        </div>
      </div>

      {/* ADD TASK MODAL */}
      <AddTaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={addTask}
        formData={taskForm}
        setFormData={setTaskForm}
      />

    </div>
  );
};

export default ProjectDetails;






