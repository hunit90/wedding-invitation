import styled from "@emotion/styled";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";

const Container = styled.div`
  padding: 70px 20px;
  background-color: #f6f6f6;
  text-align: center;
`;

const SubTitle = styled.h2`
  margin-bottom: 30px;
  color: #333;
  font-size: 0.8rem;
  letter-spacing: 3px;
  font-family: var(--font-en);
`;

const DateText = styled.p`
  font-size: 0.95rem;
  letter-spacing: 1px;
  color: #555;
  margin-bottom: 30px;
  
  span {
    font-weight: bold;
  }
`;

const MonthText = styled.div`
  margin-bottom: 27px;
  font-size: 1.1rem;
  color: #000;
  letter-spacing: 3px;
  font-family: var(--font-kr);
  font-weight: 500;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 15px 0px;
  max-width: 280px;
  margin: 0px auto;
  font-size: 0.9rem;
  color: #444;
`;

const DayHeader = styled.div<{ isSun?: boolean }>`
  color: ${({ isSun }) => (isSun ? "#ff6b6b" : "#444")};
  font-weight: bold;
  font-size: 0.8rem;
`;

const DayCell = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayCircle = styled.div<{ isTarget?: boolean }>`
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background-color: ${({ isTarget }) => (isTarget ? "#999" : "transparent")};
  color: ${({ isTarget }) => (isTarget ? "white" : "#333")};
  font-weight: ${({ isTarget }) => (isTarget ? "bold" : "normal")};
  box-shadow: ${({ isTarget }) =>
    isTarget ? "rgba(131, 131, 131, 0.4) 0px 2px 5px" : "none"};
`;

const DDayContainer = styled.div`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
`;

const DDayText = styled.p`
  font-size: 0.9rem;
  color: #555;
  
  span {
    color: #464646;
    font-weight: bold;
  }
`;

export default function Calendar() {
  const fade = useScrollFadeIn<HTMLDivElement>();

  // 2026년 12월 5일 기준 달력 데이터 (1일은 화요일)
  // 빈 칸 2개 (일, 월)
  const emptyDays = Array.from({ length: 2 }, (_, i) => i);
  // 1일부터 31일까지
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 디데이 계산 로직
  const calculateDDay = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 오늘 날짜 자정 기준
    const dday = new Date(2026, 11, 5); // 2026년 12월 5일 (월은 0부터 시작하므로 11)
    const diff = dday.getTime() - today.getTime();
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const dDayCount = calculateDDay();

  return (
    <div {...fade}>
      <Container>
        <SubTitle>WEDDING DAY</SubTitle>
        <div>
          <DateText>
            <span>2026년 12월 5일</span> 토요일 오후 5시
          </DateText>
        </div>
        <MonthText>Dec.</MonthText>
        
        <Grid>
          <DayHeader isSun>S</DayHeader>
          <DayHeader>M</DayHeader>
          <DayHeader>T</DayHeader>
          <DayHeader>W</DayHeader>
          <DayHeader>T</DayHeader>
          <DayHeader>F</DayHeader>
          <DayHeader>S</DayHeader>
          
          {/* 달력 시작 전 빈칸 (일, 월) */}
          {emptyDays.map((i) => (
            <DayCell key={`empty-${i}`} />
          ))}
          
          {/* 실제 날짜들 */}
          {days.map((day) => (
            <DayCell key={day}>
              <DayCircle isTarget={day === 5}>{day}</DayCircle>
            </DayCell>
          ))}
        </Grid>
        
        <DDayContainer>
          <DDayText>
            {dDayCount > 0 ? (
              <>결혼식이 <span>{dDayCount}</span>일 남았습니다.</>
            ) : dDayCount === 0 ? (
              <>오늘은 <span>결혼식 당일</span>입니다.</>
            ) : (
              <>결혼식이 <span>{Math.abs(dDayCount)}</span>일 지났습니다.</>
            )}
          </DDayText>
        </DDayContainer>
      </Container>
    </div>
  );
}
