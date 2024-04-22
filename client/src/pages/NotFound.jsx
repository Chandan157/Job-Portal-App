import {Link} from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h3>Not Found</h3>
      <Link className="btn btn-success" to="/">Go Back</Link>
    </div>
  );
};

export default NotFound;
