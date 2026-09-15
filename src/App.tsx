import styled from "@emotion/styled";
import Greeting from "./layout/Greeting/Greeting";
import Calendar from "./layout/Greeting/Calendar";
import WeddingGallery from "./layout/Gallery";
import LocationMap from "./layout/Map";
import Account from "./layout/Account/Account";
import coverImg from "./assets/images/main_cover.jpg";
import useScrollFadeIn from "./hooks/useScrollFadeIn";

const AppContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const CoverSection = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2efe9; /* 부드러운 베이지 배경 */
  color: #333;
  padding: 40px 20px; /* 위아래 여백을 줄여 전체 높이 축소 */
  box-sizing: border-box;
`;

const Frame = styled.div`
  position: relative;
  width: 100%;
  border: 1.5px solid rgba(0,0,0,0.08);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 20px; /* 프레임 내부 여백 */
  box-sizing: border-box;
  
  /* 이중 테두리(액자 느낌) */
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    border: 1px solid rgba(0,0,0,0.04);
    border-radius: 22px;
    pointer-events: none;
  }
`;

const TopText = styled.div`
  font-family: var(--font-en);
  font-size: 15px;
  letter-spacing: 5px;
  margin-bottom: 40px;
  text-transform: uppercase;
  color: #222;
`;

const PhotoWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  /* 가로로 긴 사진 비율(3:2)에 맞춤 */
  aspect-ratio: 3/2; 
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  background-color: #fff;
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const CoverTitle = styled.h1`
  font-family: var(--font-cursive);
  font-size: 3.2rem;
  font-weight: 400;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 10px;
  letter-spacing: 2px;
`;

const CoverDate = styled.div`
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 2px;
  color: #555;
  margin-top: 15px;
  font-family: var(--font-en);
`;

function App() {
  const fade = useScrollFadeIn<HTMLDivElement>();

  return (
    <AppContainer>
      <CoverSection>
        <Frame {...fade}>
          <TopText>Wedding Day</TopText>
          
          <PhotoWrapper>
            <Photo src={coverImg} alt="Cover" />
          </PhotoWrapper>
          
          <CoverTitle>
            Kihun & Hwayong
          </CoverTitle>
          <CoverDate>2026. 12. 05</CoverDate>
        </Frame>
      </CoverSection>

      <Greeting />
      <Calendar />
      <WeddingGallery />
      <LocationMap />
      <Account />
    </AppContainer>
  );
}

export default App;
