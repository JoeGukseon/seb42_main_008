import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { MdLocationOn } from 'react-icons/md';
import styled from 'styled-components';

const SearchMap = () => {
  // googleMapKey 타입
  const googleMapKey: any = process.env.REACT_APP_API_KEY;
  return (
    <MapContent>
      <LoadScript googleMapsApiKey={googleMapKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        ></GoogleMap>
        <MapPlace>
          <LocationPin />
          장소 위치 렌더링할 곳
        </MapPlace>
      </LoadScript>
    </MapContent>
  );
};

export default SearchMap;

const containerStyle = {
  width: '100%',
  height: '300px',
};

const center = {
  lat: 37.566535,
  lng: 126.9779692,
};

const MapContent = styled.section`
  padding: 10px;
  width: 100%;
`;
const MapPlace = styled.div`
  background-color: white;
  border: 1px solid #555555;
  width: 100%;
  padding: 5px;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  align-items: center;
`;

const LocationPin = styled(MdLocationOn)`
  font-size: 1.5rem;
`;

/* TODO:
1. 기본 구조 * 
2. 지도 API * 
2-1. 위치 핀 찍기
2-2. 위치 핀찍은 장소 렌더링
*/
