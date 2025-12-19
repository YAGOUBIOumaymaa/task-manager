import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => (
  <div className="col-md-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{project.title}</h5>
        <p className="card-text">{project.description}</p>
        <Link to={`/projects/${project.id}`} className="btn btn-primary">View</Link>
      </div>
    </div>
  </div>
);

export default ProjectCard;
