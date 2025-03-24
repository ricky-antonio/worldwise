export const convertToEmoji = (countryCode) => {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    const emoji = String.fromCodePoint(...codePoints);
    return flagemojiToPNG(emoji);
};

const flagemojiToPNG = (flag) => {
    // Convert flag emoji to corresponding country code
    const countryCode = [...flag]
        .map((char) =>
            String.fromCharCode(char.codePointAt() - 127397).toLowerCase()
        )
        .join("");

    // Return an image element with the country's flag
    return (
        <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
};