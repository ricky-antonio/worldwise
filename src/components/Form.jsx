import { useEffect, useState } from "react";
import Button from "./Button";
import ButtonBack from "./ButtonBack";
import { useUrlPosition } from "../hooks/useUrlPosition";
import styles from "./Form.module.css";
import { convertToEmoji } from "../utils/convertToEmoji";
import Message from "./Message";
import Spinner from "./Spinner";

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

    useEffect(() => {
        setIsLoadingGeocoding(true);
        setGeocodingError("")
        fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
            .then((res) => res.json())
            .then((data) => {
                if (!data.countryCode) throw new Error("This doesn't seem to be a city, click somewhere else.")

                setCityName(data.city || data.locality);
                setCountry(data.countryName);
                setEmoji(data.countryCode);
                console.log(data)
            })
            .catch((err) => setGeocodingError(err.message))
            .finally(() => setIsLoadingGeocoding(false));
    }, [lat, lng]);

    if (isLoadingGeocoding) return <Spinner />

    if (geocodingError) return <Message message={geocodingError} />

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji ? convertToEmoji(emoji) : ""}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
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
