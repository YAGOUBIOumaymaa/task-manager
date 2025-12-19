const ProgressBar = ({ value }) => (
  <div className="progress my-3">
    <div className="progress-bar" role="progressbar" style={{ width: `${value}%` }}>
      {value}%
    </div>
  </div>
);

export default ProgressBar;
