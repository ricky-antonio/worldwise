import { useMap } from "react-leaflet";

const ChangeCenter = ({ position }) => {
    const map = useMap();
    map.setView(position);
    return null;
};

export default ChangeCenter;
