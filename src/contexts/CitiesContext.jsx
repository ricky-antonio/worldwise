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
            .then((data) => setCities(data))
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    }, []);

    const getCity = (id) => {
        setIsLoading(true);
        fetch(`${BASE_URL}/cities/${id}`)
            .then((res) => res.json())
            .then((data) => setCurrentCity(data))
            .catch((err) => console.error(err))
            .finally(() => setIsLoading(false));
    };

    const addCity = (newCity) => {
        setIsLoading(true);
        return fetch(`${BASE_URL}/cities/`, {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => setCities((cities) => [...cities, data]))
            .catch((err) => console.error("Error adding city", err))
            .finally(() => setIsLoading(false));
    };

    const deleteCity = (id) => {
        setIsLoading(true);
        return fetch(`${BASE_URL}/cities/${id}`, {
            method: "DELETE",
        })
            .then(() => setCities((cities) => cities.filter((city) => id !== city.id)))
            .catch((err) => console.error("Error deleting city", err))
            .finally(() => setIsLoading(false));
    };

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                addCity,
                deleteCity
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
