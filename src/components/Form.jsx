import { useEffect, useState } from "react";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { convertToEmoji } from "../utils/convertToEmoji";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [emoji, setEmoji] = useState("");
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    const [geocodingError, setGeocodingError] = useState("");

    const { addCity, isLoading } = useCities();
    const navigate = useNavigate();

    useEffect(() => {
        if (!lat && !lng) return;

        setIsLoadingGeocoding(true);
        setGeocodingError("");
        fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.countryCode)
                    throw new Error(
                        "This doesn't seem to be a city, click somewhere else."
                    );

                setCityName(data.city || data.locality);
                setEmoji(data.countryCode);
                setCountry(data.countryName);
                console.log(data);
            })
            .catch((err) => setGeocodingError(err.message))
            .finally(() => setIsLoadingGeocoding(false));
    }, [lat, lng]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng },
        };
        addCity(newCity)
            .then(() => navigate("/app/cities"))
            .catch((err) => console.error(err));
    };

    if (isLoadingGeocoding) return <Spinner />;

    if (!lat && !lng)
        return <Message message="Start by clicking somewhere on the map." />;

    if (geocodingError) return <Message message={geocodingError} />;

    return (
        <form
            className={`${styles.form} ${isLoading && styles.loading}`}
            onSubmit={(e) => handleSubmit(e)}
        >
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>
                    {emoji ? convertToEmoji(emoji) : ""}
                </span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker
                    id="date"
                    selected={date}
                    onChange={(newDate) => setDate(newDate)}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type={"primary"}>Add</Button>
                <ButtonBack />
            </div>
        </form>
    );
}

export default Form;
