import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import { useAuth } from "../contexts/AuthContext";
import styles from './AppLayout.module.css';

const AppLayout = () => {
    const {isAuthenticated} = useAuth();
    return (
        <div className={styles.app}>
            <Sidebar />
            {isAuthenticated && <User />}
            <Map />
        </div>
    );
};

export default AppLayout;
