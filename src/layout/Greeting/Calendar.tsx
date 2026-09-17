import styled from '@emotion/styled';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';

const Container = styled.section`
  padding: 60px 25px 80px;
  background-color: var(--bg-color);
`;

const DateTitle = styled.h2`
  font-family: var(--font-editorial);
  font-size: 42px;
  font-style: italic;
  font-weight: 400;
  color: #111;
  margin: 0 0 10px 0;
  letter-spacing: -1px;
`;

const DateSub = styled.div`
  font-family: var(--font-kr);
  font-size: 15px;
  color: #555;
  font-weight: 500;
  margin-bottom: 30px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  margin-bottom: 40px;
`;

const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 20px 0;
  text-align: center;
`;

const DayHeader = styled.div<{ isSun?: boolean }>`
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: 15px;
  color: ${(props) => (props.isSun ? '#ff8a8a' : '#555')};
  margin-bottom: 15px;
`;

const DayCell = styled.div<{ isSun?: boolean; isHighlight?: boolean }>`
  font-family: var(--font-editorial);
  font-style: italic;
  font-size: 16px;
  color: ${(props) => (props.isHighlight ? '#fff' : props.isSun ? '#ff8a8a' : '#444')};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: ${(props) => (props.isHighlight ? '#333' : 'transparent')};
`;

export default function Calendar() {
  const fade = useScrollFadeIn<HTMLDivElement>();
  
  // 2026년 12월 달력 데이터 (1일이 화요일)
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dates = [
    null, null, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30, 31
  ];

  return (
    <Container {...fade}>
      <DateTitle>2026.12.05</DateTitle>
      <DateSub>토요일 오후 5시</DateSub>
      <Divider />
      
      <CalendarWrapper>
        <Grid>
          {days.map((day, idx) => (
            <DayHeader key={idx} isSun={idx === 0}>{day}</DayHeader>
          ))}
          
          {dates.map((date, idx) => (
            <DayCell 
              key={idx} 
              isSun={idx % 7 === 0 || date === 25} 
              isHighlight={date === 5}
            >
              {date || ''}
            </DayCell>
          ))}
        </Grid>
      </CalendarWrapper>
    </Container>
  );
}
