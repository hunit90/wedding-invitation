import { Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "@emotion/styled";
import data from "../../data.json";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";

// 로고 이미지 임포트
import kakaoLogo from "../../assets/images/kakaomap.png";
import naverLogo from "../../assets/images/navermap.png";
import tmapLogo from "../../assets/images/tmap.png";

const Container = styled.section`
  padding: 100px 20px;
  background-color: var(--bg-color);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

const SubTitle = styled.div`
  font-family: var(--font-en);
  font-size: 14px;
  letter-spacing: 3px;
  color: var(--point-color);
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: 22px;
  color: #333;
  letter-spacing: 2px;
`;

const AddressContainer = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const VenueName = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  color: #333;
`;

const Address = styled.div`
  font-size: 15px;
  color: #666;
  white-space: pre-wrap;
  line-height: 1.6;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 25px;
  border: 1px solid #eee;
`;

const MapLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

const MapButton = styled.a`
  flex: 1;
  padding: 12px 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  font-size: 13px;
  color: #555;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  
  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
  
  &:hover {
    background-color: #f9f9f9;
    border-color: #ccc;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const InfoSection = styled.div``;

const InfoTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const InfoDesc = styled.div`
  font-size: 15px;
  color: #555;
  white-space: pre-wrap;
  line-height: 1.8;
  padding-left: 24px; /* 들여쓰기로 깔끔하게 */
`;

export default function LocationMap() {
  const { lat, lon, address1, address2, naverMap, kakaoMap, tmap } = data.mapInfo;
  
  const fadeHeader = useScrollFadeIn<HTMLDivElement>();
  const fadeMap = useScrollFadeIn<HTMLDivElement>();
  const fadeInfo = useScrollFadeIn<HTMLDivElement>();

  return (
    <Container>
      <Header {...fadeHeader}>
        <SubTitle>Location</SubTitle>
        <Title>오시는 길</Title>
      </Header>

      <div {...fadeMap}>
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
            <img src={naverLogo} alt="네이버 지도" />
            네이버지도
          </MapButton>
          <MapButton href={kakaoMap} target="_blank" rel="noreferrer">
            <img src={kakaoLogo} alt="카카오맵" />
            카카오맵
          </MapButton>
          <MapButton href={tmap} target="_blank" rel="noreferrer">
            <img src={tmapLogo} alt="티맵" />
            티맵
          </MapButton>
        </MapLinks>
      </div>

      <InfoContainer style={{ marginTop: "50px" }} {...fadeInfo}>
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
