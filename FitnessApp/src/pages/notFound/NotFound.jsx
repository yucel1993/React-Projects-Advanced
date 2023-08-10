import { Link } from "react-router-dom";
import "./notfound.scss";

function NotFound() {
  return <section>
    <div className="container notfound__container">
      <h2>Page Not Found</h2>
      <Link to="/" className="btn">
      Go Back Home
      </Link>
    </div>
  </section>;
}

export default NotFound;
