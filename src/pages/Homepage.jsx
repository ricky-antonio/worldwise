import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";


const Homepage = () => {
  return (
    <div>
        <PageNav />
      <h1>worldwise</h1>
      <Link to="/pricing">Pricing</Link>
    </div>
  )
}

export default Homepage;
