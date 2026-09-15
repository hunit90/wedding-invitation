import styled from "@emotion/styled";
import Greeting from "./layout/Greeting/Greeting";
import Calendar from "./layout/Greeting/Calendar";
import WeddingGallery from "./layout/Gallery";
import LocationMap from "./layout/Map";
import Guestbook from "./layout/Guestbook";
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
  background-color: #efede7; /* 스크린샷과 유사한 따뜻한 베이지 배경 */
  color: #333;
  padding: 40px 15px; 
  box-sizing: border-box;
`;

const Frame = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  box-sizing: border-box;
`;

/* 모서리가 안으로 파인(오목한) 우아한 테두리 장식 */
const BorderWrapper = styled.div`
  position: absolute;
  top: 10px; left: 10px; right: 10px; bottom: 10px;
  pointer-events: none;
`;

const OuterEmboss = styled.div`
  position: absolute;
  top: -6px; left: -6px; right: -6px; bottom: -6px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 35px;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.03), 0 0 15px rgba(0,0,0,0.03);
`;

const BorderTop = styled.div`position: absolute; top: 0; left: 25px; right: 25px; height: 1px; background: rgba(0,0,0,0.15);`;
const BorderBottom = styled.div`position: absolute; bottom: 0; left: 25px; right: 25px; height: 1px; background: rgba(0,0,0,0.15);`;
const BorderLeft = styled.div`position: absolute; top: 25px; bottom: 25px; left: 0; width: 1px; background: rgba(0,0,0,0.15);`;
const BorderRight = styled.div`position: absolute; top: 25px; bottom: 25px; right: 0; width: 1px; background: rgba(0,0,0,0.15);`;

const CornerTL = styled.div`position: absolute; top: 0; left: 0; width: 25px; height: 25px; border-bottom: 1px solid rgba(0,0,0,0.15); border-right: 1px solid rgba(0,0,0,0.15); border-radius: 0 0 25px 0;`;
const CornerTR = styled.div`position: absolute; top: 0; right: 0; width: 25px; height: 25px; border-bottom: 1px solid rgba(0,0,0,0.15); border-left: 1px solid rgba(0,0,0,0.15); border-radius: 0 0 0 25px;`;
const CornerBL = styled.div`position: absolute; bottom: 0; left: 0; width: 25px; height: 25px; border-top: 1px solid rgba(0,0,0,0.15); border-right: 1px solid rgba(0,0,0,0.15); border-radius: 0 25px 0 0;`;
const CornerBR = styled.div`position: absolute; bottom: 0; right: 0; width: 25px; height: 25px; border-top: 1px solid rgba(0,0,0,0.15); border-left: 1px solid rgba(0,0,0,0.15); border-radius: 25px 0 0 0;`;

const TopText = styled.div`
  font-family: var(--font-en);
  font-size: 15px;
  letter-spacing: 5px;
  margin-bottom: 40px;
  text-transform: uppercase;
  color: #111;
  font-weight: 500;
`;

const PhotoWrapper = styled.div`
  width: 100%;
  max-width: 320px;
  background-color: #0c0c0c; /* 검은색 배경 매트 */
  padding: 10px 25px; /* 사진 좌우로 검은 배경이 나오게 함 */
  margin-bottom: 40px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Photo = styled.img`
  width: 100%;
  aspect-ratio: 3/2; 
  object-fit: cover;
  display: block;
`;

const CoverTitle = styled.h1`
  font-family: var(--font-cursive);
  font-size: 2.8rem; /* 한 줄에 들어가도록 살짝 조정 */
  font-weight: 400;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 5px;
  letter-spacing: 1px;
  white-space: nowrap; /* 무조건 한 줄로 나오도록 강제 */
  
  @media (max-width: 380px) {
    font-size: 2.4rem;
  }
`;

function App() {
  const fade = useScrollFadeIn<HTMLDivElement>();

  return (
    <AppContainer>
      <CoverSection>
        <Frame {...fade}>
          <BorderWrapper>
            <OuterEmboss />
            <BorderTop /><BorderBottom /><BorderLeft /><BorderRight />
            <CornerTL /><CornerTR /><CornerBL /><CornerBR />
          </BorderWrapper>

          <TopText>Wedding Day</TopText>
          
          <PhotoWrapper>
            <Photo src={coverImg} alt="Cover" />
          </PhotoWrapper>
          
          <CoverTitle>
            Kihun & Hwayong
          </CoverTitle>
        </Frame>
      </CoverSection>

      <Greeting />
      <Calendar />
      <WeddingGallery />
      <LocationMap />
      <Guestbook />
      <Account />
    </AppContainer>
  );
}

export default App;
