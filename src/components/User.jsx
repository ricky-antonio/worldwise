import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./User.module.css";

const User = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    function handleClick() {
        logout();
        navigate("/");
    }

    return (
        <div className={styles.user}>
            <div className={styles.text}>
                <img src={user.avatar} alt={user.name} />
                <span>Welcome, {user.name}</span>
            </div>
            <button onClick={handleClick}>Logout</button>
        </div>
    );
};

export default User;
