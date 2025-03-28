import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Login = () => {
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState("guest@example.com");
    const [password, setPassword] = useState("qwerty");

    const { isAuthenticated, login } = useAuth();
    console.log(login);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email && !password) return;

        login(email, password);
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/app/", {replace: true});
    }, [isAuthenticated, navigate]);

    return (
        <main className={styles.login} onSubmit={(e) => handleSubmit(e)}>
            <PageNav />
            <form className={styles.form}>
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type="primary">Login</Button>
                </div>
            </form>
        </main>
    );
};

export default Login;
