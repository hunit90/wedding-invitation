import { useState } from 'react';
import styled from '@emotion/styled';
import data from '../../data.json';
import useScrollFadeIn from '../../hooks/useScrollFadeIn';

const Container = styled.section`
  padding: 20px 20px 120px;
  background-color: #f5f4f0; /* 배경색을 지도와 다르게 주어 구분감 부여 */
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const SubTitle = styled.div`
  font-family: var(--font-en);
  font-size: 14px;
  letter-spacing: 3px;
  color: var(--point-color);
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 500;
  color: #333;
  letter-spacing: 2px;
`;

const AccordionItem = styled.div`
  background: white;
  margin-bottom: 15px;
  border: 1px solid #e8e8e8;
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  font-size: 16px;
  font-family: var(--font-kr);
  color: #444;
  cursor: pointer;
  
  /* 화살표 애니메이션을 위한 스타일 */
  & span:last-child {
    transition: transform 0.3s ease;
  }
  &.open span:last-child {
    transform: rotate(180deg);
  }
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  border-top: ${({ isOpen }) => (isOpen ? '1px solid #f0f0f0' : 'none')};
  background-color: #fafafa;
`;

const AccountRow = styled.div`
  padding: 20px;
  border-bottom: 1px dashed #e0e0e0;
  &:last-child {
    border-bottom: none;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const AccountDetails = styled.div`
  font-size: 15px;
  color: #555;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const BankInfo = styled.span`
  font-weight: 600;
  color: #333;
`;

const NumberInfo = styled.span`
  font-size: 14px;
  letter-spacing: 0.5px;
  color: #666;
`;

const CopyButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  font-family: var(--font-kr);
  color: #555;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const PayLinks = styled.div`
  display: flex;
  gap: 8px;
`;

const PayButton = styled.a`
  flex: 1;
  font-size: 13px;
  padding: 10px 0;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  text-align: center;
  
  &.kakao {
    background-color: #FEE500;
    color: #191919;
  }
  &.toss {
    background-color: #0050FF;
    color: white;
  }
`;

export default function Account() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const fade = useScrollFadeIn<HTMLDivElement>();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('계좌번호가 복사되었습니다.');
    });
  };

  return (
    <Container>
      <Header {...fade}>
        <SubTitle>Account</SubTitle>
        <Title>마음 전하실 곳</Title>
      </Header>
      
      <div {...fade}>
        {data.hostInfo.map((host, index) => (
          <AccordionItem key={index}>
            <AccordionHeader 
              onClick={() => toggleAccordion(index)}
              className={openIndex === index ? 'open' : ''}
            >
              <span>{host.host} 계좌번호</span>
              <span>▼</span>
            </AccordionHeader>
            <AccordionContent isOpen={openIndex === index}>
              {host.accountInfo.map((acc, accIdx) => (
                <AccountRow key={accIdx}>
                  <AccountInfo>
                    <AccountDetails>
                      <BankInfo>{acc.bank} <NumberInfo>{acc.account}</NumberInfo></BankInfo>
                      <div>{acc.name} <span style={{ fontSize: '13px', color: '#888' }}>({acc.relation})</span></div>
                    </AccountDetails>
                    <CopyButton onClick={() => copyToClipboard(acc.account)}>
                      복사
                    </CopyButton>
                  </AccountInfo>
                  
                  {(acc.kakaopayAccount || acc.tossAccount) && (
                    <PayLinks>
                      {acc.kakaopayAccount && (
                        <PayButton 
                          href={acc.kakaopayAccount} 
                          target="_blank" 
                          rel="noreferrer"
                          className="kakao"
                        >
                          카카오페이
                        </PayButton>
                      )}
                      {acc.tossAccount && (
                        <PayButton 
                          href={acc.tossAccount} 
                          target="_blank" 
                          rel="noreferrer"
                          className="toss"
                        >
                          토스
                        </PayButton>
                      )}
                    </PayLinks>
                  )}
                </AccountRow>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </div>
    </Container>
  );
}
