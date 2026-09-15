import styled from "@emotion/styled";
import { useState } from "react";
import data from "../../data.json";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";
import ContactModal from "./ContactModal";

const Container = styled.section`
  padding: 100px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
`;

const SubTitle = styled.div`
  font-family: var(--font-en);
  font-size: 16px;
  letter-spacing: 5px;
  color: #111;
  margin-bottom: 50px;
  text-transform: uppercase;
`;

const Message = styled.p`
  font-family: var(--font-kr);
  font-size: 15px;
  font-weight: 400;
  line-height: 2.4;
  color: #555;
  white-space: pre-wrap;
  margin-bottom: 70px;
`;

const HostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 60px;
  font-family: var(--font-kr);
`;

const HostItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
`;

const Parents = styled.span`
  color: #555;
`;

const Relation = styled.span`
  color: #aaa;
  margin: 0 8px;
`;

const Name = styled.span`
  font-weight: 600;
  color: #222;
  font-size: 16px;
`;

const ContactButton = styled.button`
  width: 100%;
  max-width: 280px;
  background-color: #f4f4f4;
  color: #555;
  border: none;
  padding: 18px 0;
  font-size: 14px;
  font-family: var(--font-kr);
  cursor: pointer;
  
  &:hover {
    background-color: #ebebeb;
  }
`;

export default function Greeting() {
  const { message, host } = data.greeting;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fade1 = useScrollFadeIn<HTMLDivElement>();
  const fade2 = useScrollFadeIn<HTMLDivElement>();
  const fade3 = useScrollFadeIn<HTMLDivElement>();

  return (
    <>
      <Container>
        <div {...fade1} style={{ width: "100%" }}>
          <SubTitle>Invitation</SubTitle>
          <Message>{message}</Message>
        </div>

        <div {...fade2} style={{ width: "100%" }}>
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
        </div>

        <div {...fade3} style={{ width: "100%" }}>
          <ContactButton onClick={() => setIsModalOpen(true)}>
            축하 연락하기
          </ContactButton>
        </div>
      </Container>
      
      {isModalOpen && (
        <ContactModal onClose={() => setIsModalOpen(false)} data={host} />
      )}
    </>
  );
}
