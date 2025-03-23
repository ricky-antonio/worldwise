import { createContext, useState, useEffect, useContext } from "react";

const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
    const BASE_URL = "http://localhost:9000";

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        setIsLoading(true);
        fetch(`${BASE_URL}/cities`)
            .then((res) => res.json())
            .then((data) => {
                setCities(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const getCity = (id) => {
        setIsLoading(true);
        fetch(`${BASE_URL}/cities/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCurrentCity(data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoading(false);
            });
    };

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
};

const useCities = () => {
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error("PostContext was used outside of the PostProvider");
    return context;
};

export { CitiesProvider, useCities };
