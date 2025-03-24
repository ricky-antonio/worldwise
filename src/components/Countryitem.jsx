import { convertToEmoji } from "../utils/convertToEmoji";
import styles from "./CountryItem.module.css";

const CountryItem = ({ country }) => {
    return (
        <li className={styles.countryItem}>
            <span>{convertToEmoji(country.emoji)}</span>
            <span>{country.country}</span>
        </li>
    );
}

export default CountryItem;
