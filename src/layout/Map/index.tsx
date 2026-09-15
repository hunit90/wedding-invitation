import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import data from "../../data.json";

const Container = styled.div`
  padding: 50px 20px;
  background-color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #333;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;

const AddressContainer = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const VenueName = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Address = styled.div`
  font-size: 15px;
  color: #666;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const MapLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
`;

const MapButton = styled.a`
  padding: 8px 16px;
  background-color: #f5f5f5;
  border-radius: 20px;
  text-decoration: none;
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InfoSection = styled.div``;

const InfoTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #333;
`;

const InfoDesc = styled.div`
  font-size: 15px;
  color: #555;
  white-space: pre-wrap;
  line-height: 1.6;
`;

export default function LocationMap() {
  const { lat, lon, address1, address2, naverMap, kakaoMap, tmap } = data.mapInfo;

  return (
    <Container>
      <Title>오시는 길</Title>

      <AddressContainer>
        <VenueName>{address1}</VenueName>
        <Address>{address2}</Address>
      </AddressContainer>

      <MapWrapper>
        <Map
          center={{ lat, lng: lon }}
          style={{ width: "100%", height: "100%" }}
          level={4}
        >
          <MapMarker position={{ lat, lng: lon }} />
        </Map>
      </MapWrapper>

      <MapLinks>
        <MapButton href={naverMap} target="_blank" rel="noreferrer">
          네이버 지도
        </MapButton>
        <MapButton href={kakaoMap} target="_blank" rel="noreferrer">
          카카오 맵
        </MapButton>
        <MapButton href={tmap} target="_blank" rel="noreferrer">
          티맵
        </MapButton>
      </MapLinks>

      <InfoContainer style={{ marginTop: "40px" }}>
        {data.locationInfo.map((info, idx) => (
          <InfoSection key={idx}>
            <InfoTitle>{info.title}</InfoTitle>
            <InfoDesc>{info.desc}</InfoDesc>
          </InfoSection>
        ))}
      </InfoContainer>
    </Container>
  );
}
