import {
    createContext,
    useEffect,
    useContext,
    useReducer,
    useCallback,
} from "react";

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };
        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };
        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case "city/added":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: [
                    ...state.cities.filter(
                        (city) => action.payload !== city.id
                    ),
                ],
                currentCity: {},
            };
        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            throw new Error("Unknown action.");
    }
};

const CitiesContext = createContext();

const BASE_URL = "http://localhost:9000";

const CitiesProvider = ({ children }) => {
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        dispatch({ type: "loading" });
        fetch(`${BASE_URL}/cities`)
            .then((res) => res.json())
            .then((data) => dispatch({ type: "cities/loaded", payload: data }))
            .catch(() =>
                dispatch({ type: "rejected", payload: "Error loading data." })
            );
    }, []);

    const getCity = useCallback(() => {
        (id) => {
            if (Number(id) === currentCity.id) return;

            dispatch({ type: "loading" });
            fetch(`${BASE_URL}/cities/${id}`)
                .then((res) => res.json())
                .then((data) =>
                    dispatch({ type: "city/loaded", payload: data })
                )
                .catch(() =>
                    dispatch({
                        type: "rejected",
                        payload: "Error loading data.",
                    })
                );
        };
    }, [currentCity.id]);

    const addCity = (newCity) => {
        dispatch({ type: "loading" });
        return fetch(`${BASE_URL}/cities/`, {
            method: "POST",
            body: JSON.stringify(newCity),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => dispatch({ type: "city/added", payload: data }))
            .catch(() =>
                dispatch({ type: "rejected", payload: "Error adding city." })
            );
    };

    const deleteCity = (id) => {
        dispatch({ type: "loading" });
        return fetch(`${BASE_URL}/cities/${id}`, {
            method: "DELETE",
        })
            .then(() => dispatch({ type: "city/deleted", payload: id }))
            .catch(() =>
                dispatch({ type: "rejected", payload: "Error deleting data." })
            );
    };

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity,
                addCity,
                deleteCity,
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
