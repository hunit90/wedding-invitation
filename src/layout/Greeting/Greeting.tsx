import styled from '@emotion/styled';
import data from '../../data.json';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';

const Container = styled.section`
  padding: 80px 25px;
  background-color: var(--bg-color);
  text-align: left;
`;

const GreetingTitle = styled.h2`
  font-family: var(--font-editorial);
  font-size: 32px;
  font-style: italic;
  font-weight: 400;
  color: #111;
  margin: 0 0 80px 0;
  line-height: 1.3;
  letter-spacing: -0.5px;
`;

const ParentInfo = styled.div`
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ParentRow = styled.div`
  font-size: 17px;
  font-family: var(--font-kr);
  color: #111;
  font-weight: 500;
  display: flex;
  align-items: center;
  
  .relation {
    font-size: 13px;
    color: #888;
    margin: 0 8px;
    font-weight: 400;
  }

  .name {
    font-weight: 600;
    font-size: 18px;
  }
`;

const InvitationLabel = styled.div`
  font-family: var(--font-en);
  font-size: 12px;
  letter-spacing: 4px;
  color: #999;
  margin-bottom: 30px;
  font-weight: 600;
`;

const GreetingText = styled.div`
  font-size: 15px;
  line-height: 2.2;
  color: #555;
  font-family: var(--font-kr);
  white-space: pre-wrap;
`;

export default function Greeting() {
  const fade1 = useScrollFadeIn<HTMLDivElement>();
  const fade2 = useScrollFadeIn<HTMLDivElement>();
  const fade3 = useScrollFadeIn<HTMLDivElement>();

  return (
    <Container>
      <div {...fade1}>
        <GreetingTitle>
          Join us<br />
          for our wedding
        </GreetingTitle>
      </div>

      <ParentInfo {...fade2}>
        <ParentRow>
          {data.greeting.host.groom.parents[0].name} · {data.greeting.host.groom.parents[1].name}
          <span className="relation">의 {data.greeting.host.groom.relation}</span>
          <span className="name">{data.greeting.host.groom.name}</span>
        </ParentRow>
        <ParentRow>
          {data.greeting.host.bride.parents[0].name} · {data.greeting.host.bride.parents[1].name}
          <span className="relation">의 {data.greeting.host.bride.relation}</span>
          <span className="name">{data.greeting.host.bride.name}</span>
        </ParentRow>
      </ParentInfo>

      <div {...fade3}>
        <InvitationLabel>INVITATION</InvitationLabel>
        <GreetingText>
          {data.greeting.message}
        </GreetingText>
      </div>
    </Container>
  );
}
