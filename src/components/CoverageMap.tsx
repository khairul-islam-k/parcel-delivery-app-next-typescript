"use client";

import { useEffect, useState } from "react";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});


type TRegion = {
    region: string;
    district: string;
    city: string;
    covered_area: string[];
    status: "active" | "inactive";
    flowchart: string;
    longitude: number;
    latitude: number;
};

function FlyToDistrict({ coords }: { coords: number[] }) {
    const map = useMap();

    useEffect(() => {
        if (coords.length === 2) {
            map.flyTo(coords as [number, number], 14, { duration: 1.5 });
        }
    }, [coords, map]);

    return null;
}

export default function CoverageMap() {
    const [coverageData, setCoverageData] = useState<TRegion[]>([]);
    const [activeCoords, setActiveCoords] = useState<number[]>([]);

    const bangladeshCenter: [number, number] = [23.685, 90.3563];

    useEffect(() => {
        fetch("/warehouses.json")
            .then((res) => res.json())
            .then((data) => setCoverageData(data));
    }, []);

    const handleSearch = (text: string) => {
        const match = coverageData.find((data) =>
            data.district.toLowerCase().includes(text.toLowerCase())
        );

        if (match) {
            setActiveCoords([match.latitude, match.longitude]);
        }
    };

    return (
        <div className="px-4 py-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
                We are available in 64 districts.
            </h2>

            {/* Search */}
            <div className="mt-4 flex">
                <input
                    type="text"
                    placeholder="Search for a district..."
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border-2 h-10 shadow w-full max-w-md rounded-lg"
                />
            </div>

            <h4 className="text-2xl font-bold mt-24 mb-12">
                We deliver almost all over Bangladesh
            </h4>

            <div className="h-[700px] w-full rounded-xl shadow-lg overflow-hidden mb-6">
                <MapContainer
                    center={bangladeshCenter}
                    zoom={7}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                    />

                    <FlyToDistrict coords={activeCoords} />

                    {coverageData.map((data, index) => (
                        <Marker
                            key={index}
                            position={[data.latitude, data.longitude]}
                        >
                            <Popup>
                                <div>
                                    <h3 className="font-bold">{data.district}</h3>
                                    <p className="text-sm">Region: {data.region}</p>
                                    <p className="text-sm">City: {data.city}</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}