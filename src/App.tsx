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
  margin: 0 auto;
  overflow: hidden;
`;

const CoverSection = styled.section`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  padding: 30px 25px 0;
  box-sizing: border-box;
`;

const TopHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
`;

const SmallItalic = styled.div`
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: 15px;
  color: #777;
`;

const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  
  div {
    width: 22px;
    height: 1px;
    background-color: #888;
  }
`;

const MainTitle = styled.h1`
  font-family: var(--font-editorial);
  font-size: 64px;
  line-height: 0.9;
  letter-spacing: -2px;
  color: #111;
  text-transform: uppercase;
  margin: 0 0 25px 0;
`;

const Names = styled.div`
  font-size: 24px;
  font-family: var(--font-kr);
  font-weight: 500;
  color: #222;
  margin-bottom: 12px;
  letter-spacing: 1px;
`;

const SubDate = styled.div`
  font-size: 14px;
  color: #777;
  font-family: var(--font-kr);
  line-height: 1.6;
  margin-bottom: 40px;
`;

const CoverImageWrapper = styled.div`
  width: calc(100% + 50px);
  margin-left: -25px;
  margin-right: -25px;
  position: relative;
  display: flex;
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

function App() {
  const fade = useScrollFadeIn<HTMLDivElement>();

  return (
    <AppContainer>
      {/* 1. 메인 커버 섹션 */}
      <CoverSection>
        <TopHeader {...fade}>
          <SmallItalic>The Wedding of</SmallItalic>
          <Hamburger>
            <div />
            <div />
            <div />
          </Hamburger>
        </TopHeader>

        <div {...fade}>
          <MainTitle>WEDDING DAY.</MainTitle>
          <Names>이기훈 & 정화용</Names>
          <SubDate>
            2026년 12월 5일, 오후 5시<br />
            (주)우리은행본점 4층 비전홀
          </SubDate>
        </div>

        <CoverImageWrapper {...useScrollFadeIn<HTMLDivElement>()}>
          <CoverImage src={coverImg} alt="메인 사진" />
        </CoverImageWrapper>
      </CoverSection>

      {/* 2. 모시는 글 & 캘린더 */}
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
