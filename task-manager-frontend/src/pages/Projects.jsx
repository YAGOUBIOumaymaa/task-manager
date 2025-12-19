import { useEffect, useState } from "react";
import api from "../api/axios";
import ProjectCard from "../components/ProjectCard";
import '../css/Projects.css'; 

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
  }, []);

  const createProject = async () => {
    if (!title) return;

    const res = await api.post("/projects", { title, description });
    setProjects([...projects, res.data]);

    setTitle("");
    setDescription("");
    setShowModal(false); 
  };

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container projects-container">

      {/* Header */}
      <div className="projects-header">
        <h2>My Projects</h2>
        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          ➕ New Project
        </button>
      </div>

      {/* Search Bar */}
      <div className="projects-search">
        <input
          type="text"
          className="form-control border-primary rounded"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Liste des projets */}
      <div className="projects-row">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(p => (
            <ProjectCard key={p.id} project={p} />
          ))
        ) : (
          <p className="text-muted">No projects found.</p>
        )}
      </div>

      {/* MODAL ADD PROJECT */}
      {showModal && (
        <div className="modal fade show d-block modal-overlay">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content modal-content-custom">

              <div className="modal-header modal-header-custom">
                <h5 className="modal-title">Create New Project</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  className="form-control modal-input"
                  placeholder="Project Title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <textarea
                  className="form-control modal-textarea"
                  placeholder="Project Description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-create"
                  onClick={createProject}
                >
                  Create Project
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Projects;

