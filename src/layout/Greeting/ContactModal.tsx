import styled from "@emotion/styled";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContainer = styled.div`
  background: #fff;
  width: 100%;
  max-width: 340px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Header = styled.div`
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

const Content = styled.div`
  display: flex;
  padding: 20px 0;
`;

const Column = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:first-of-type {
    border-right: 1px solid #eee;
  }
`;

const ColumnTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const PersonGroup = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PersonName = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
  
  span {
    color: #888;
    margin-right: 4px;
    font-size: 13px;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.a`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #666;
  
  /* SVG 아이콘 스타일 */
  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;

// 전화 아이콘
const PhoneIcon = () => (
  <svg viewBox="0 0 512 512">
    <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
  </svg>
);

// 문자 아이콘
const SmsIcon = () => (
  <svg viewBox="0 0 512 512">
    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
  </svg>
);

interface PersonData {
  name: string;
  phone: string;
  relation: string;
  parents: { relation: string; name: string; phone: string }[];
}

interface Props {
  onClose: () => void;
  data: {
    groom: PersonData;
    bride: PersonData;
  };
}

export default function ContactModal({ onClose, data }: Props) {
  const { groom, bride } = data;

  const renderPerson = (role: string, name: string, base64Phone: string) => {
    // base64로 암호화된 전화번호를 복호화 (에러 방지를 위해 try-catch 적용)
    let phone = base64Phone;
    try {
      phone = atob(base64Phone);
    } catch {
      // 복호화 실패 시 원본 문자열 사용
    }
    
    return (
      <PersonGroup>
        <PersonName>
          <span>{role}</span> {name}
        </PersonName>
        <Actions>
          <ActionButton href={`tel:${phone}`}>
            <PhoneIcon />
          </ActionButton>
          <ActionButton href={`sms:${phone}`}>
            <SmsIcon />
          </ActionButton>
        </Actions>
      </PersonGroup>
    );
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>축하 연락하기</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Content>
          <Column>
            <ColumnTitle>신랑측</ColumnTitle>
            {renderPerson("신랑", groom.name, groom.phone)}
            {renderPerson("아버님", groom.parents[0].name, groom.parents[0].phone)}
            {renderPerson("어머님", groom.parents[1].name, groom.parents[1].phone)}
          </Column>
          <Column>
            <ColumnTitle>신부측</ColumnTitle>
            {renderPerson("신부", bride.name, bride.phone)}
            {renderPerson("아버님", bride.parents[0].name, bride.parents[0].phone)}
            {renderPerson("어머님", bride.parents[1].name, bride.parents[1].phone)}
          </Column>
        </Content>
      </ModalContainer>
    </Overlay>
  );
}
