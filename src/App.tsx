import styled from "@emotion/styled";
import Greeting from "./layout/Greeting/Greeting";
import WeddingGallery from "./layout/Gallery";
import LocationMap from "./layout/Map";
import Account from "./layout/Account/Account";
import data from "./data.json";
import coverImg from "./assets/images/1.jpeg"; // 메인 커버 이미지로 첫 번째 사진 사용

const AppContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const CoverSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-image: url(${coverImg});
  background-size: cover;
  background-position: center;
  color: white;
  padding-bottom: 50px;
`;

const CoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1),
    rgba(0, 0, 0, 0.4)
  );
`;

const CoverContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
`;

const CoverTitle = styled.h1`
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 15px;
  letter-spacing: 2px;
`;

const CoverDate = styled.div`
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 1px;
`;

function App() {
  const { host, eventDetail } = data.greeting;
  const dateStr = eventDetail.split("\n")[0];

  return (
    <AppContainer>
      <CoverSection>
        <CoverOverlay />
        <CoverContent>
          <CoverTitle>
            {host.groom.name} & {host.bride.name}
          </CoverTitle>
          <CoverDate>{dateStr}</CoverDate>
        </CoverContent>
      </CoverSection>

      <Greeting />
      <WeddingGallery />
      <LocationMap />
      <Account />
    </AppContainer>
  );
}

export default App;
