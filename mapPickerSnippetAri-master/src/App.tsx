import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Geocode from "react-geocode";
import "./App.css";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY || "");

const ClujNapocaCoords = { lat: 46.7712, lng: 23.6236 };
const MapContainerStyle = {
  width: "100%",
  height: "400px",
};

// Green marker icon URL
const greenMarkerIcon = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
  });
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [initialPosition, setInitialPosition] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(
    selectedMarker
      ? { lat: selectedMarker.lat, lng: selectedMarker.lng }
      : initialPosition
      ? { lat: initialPosition[0], lng: initialPosition[1] }
      : ClujNapocaCoords
  );

  useEffect(() => {
    setMapCenter(
      selectedMarker
        ? { lat: selectedMarker.lat, lng: selectedMarker.lng }
        : initialPosition
        ? { lat: initialPosition[0], lng: initialPosition[1] }
        : ClujNapocaCoords
    );
  }, [selectedMarker, initialPosition]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setInitialPosition([latitude, longitude]);
      });
    } else {
      setInitialPosition([ClujNapocaCoords.lat, ClujNapocaCoords.lng]);
    }
  }, []);

  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;
    const { lat, lng } = event.latLng.toJSON();
    setSelectedMarker({ lat, lng });
  }, []);

  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await Geocode.fromLatLng(lat, lng);
      const address = response.results[0].formatted_address;
      console.log("Selected address:", address);
    } catch (error) {
      console.error("Error while getting address:", error);
    }
  };

  const handleOpenMapModal = () => {
    setShowMapModal(true);
  };

  const handleCloseMapModal = () => {
    setShowMapModal(false);
  };

  const handleModalSubmit = () => {
    if (selectedMarker) {
      getAddressFromCoordinates(selectedMarker.lat, selectedMarker.lng);
      handleCloseMapModal();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const modal = document.querySelector(".map-modal");
      if (modal && !modal.contains(event.target as Node)) {
        handleCloseMapModal();
      }
    };

    if (showMapModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showMapModal]);


  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="App">
      <button onClick={handleOpenMapModal}>Open Map</button>

      {showMapModal && (
        <div className="map-modal" style={ModalStyle}>
          <div className="map-container">
            <GoogleMap
              mapContainerStyle={MapContainerStyle}
              center={mapCenter}              
              zoom={15}
              onClick={handleMapClick}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
              }}
            >
              {selectedMarker && (
                <Marker
                  position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                  animation={google.maps.Animation.BOUNCE}
                  icon={{
                    url: greenMarkerIcon,
                    scaledSize: new window.google.maps.Size(32, 32),
                  }}
                />
              )}
            </GoogleMap>
          </div>
          <div style={{ marginTop: 50 }}>
            <button onClick={handleCloseMapModal}>Cancel</button>
            <button onClick={handleModalSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

const ModalStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

export default App;
