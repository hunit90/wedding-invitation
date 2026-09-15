import styled from "@emotion/styled";
import data from "../../data.json";

const Container = styled.div`
  padding: 50px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  white-space: pre-wrap;
  color: #333;
`;

const Message = styled.p`
  font-size: 15px;
  line-height: 2;
  margin-bottom: 40px;
  white-space: pre-wrap;
  color: #555;
`;

const HostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 40px;
`;

const HostItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #333;
  gap: 10px;
`;

const Parents = styled.span`
  font-weight: 500;
`;

const Relation = styled.span`
  color: #888;
  font-size: 14px;
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 18px;
`;

const EventDetail = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  white-space: pre-wrap;
  color: #444;
`;

export default function Greeting() {
  const { title, message, host, eventDetail } = data.greeting;

  return (
    <Container>
      <Title>{title}</Title>
      <Message>{message}</Message>

      <HostContainer>
        <HostItem>
          <Parents>
            {host.groom.parents[0].name} · {host.groom.parents[1].name}
          </Parents>
          <Relation>의 {host.groom.relation}</Relation>
          <Name>{host.groom.name}</Name>
        </HostItem>
        <HostItem>
          <Parents>
            {host.bride.parents[0].name} · {host.bride.parents[1].name}
          </Parents>
          <Relation>의 {host.bride.relation}</Relation>
          <Name>{host.bride.name}</Name>
        </HostItem>
      </HostContainer>

      <EventDetail>{eventDetail}</EventDetail>
    </Container>
  );
}
