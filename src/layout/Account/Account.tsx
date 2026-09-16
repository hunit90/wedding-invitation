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

const ShareButton = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 16px;
  background-color: #fee500;
  color: #191919;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-family: var(--font-kr);
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 50px auto 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);

  &:hover {
    background-color: #f4dc00;
  }
`;

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

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

  const handleShare = () => {
    if (!window.Kakao) {
      alert('카카오톡 공유 기능을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    
    try {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_APP_KAKAOMAP_JAVASCRIPT_KEY);
      }
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: '기훈 💍 화용 결혼합니다',
          description: '2026년 12월 5일 (토) 오후 5시\\n우리은행 본점 4F',
          imageUrl: 'https://hunit90.github.io/wedding-invitation/og-image.jpg',
          link: {
            mobileWebUrl: 'https://hunit90.github.io/wedding-invitation/',
            webUrl: 'https://hunit90.github.io/wedding-invitation/',
          },
        },
        buttons: [
          {
            title: '청첩장 보기',
            link: {
              mobileWebUrl: 'https://hunit90.github.io/wedding-invitation/',
              webUrl: 'https://hunit90.github.io/wedding-invitation/',
            },
          },
        ],
      });
    } catch (error) {
      console.error('Kakao Share Error:', error);
      alert('카카오톡 공유 중 오류가 발생했습니다. 카카오 디벨로퍼스 사이트 도메인 설정을 확인해주세요.');
    }
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

      <ShareButton onClick={handleShare}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#191919">
          <path d="M12 3c-5.5 0-10 3.5-10 7.8 0 2.8 1.8 5.2 4.6 6.5-.1.5-.5 2.1-.6 2.3-.1.4.1.4.3.3.3-.2 2.7-1.8 3.8-2.6.6.1 1.2.2 1.9.2 5.5 0 10-3.5 10-7.8S17.5 3 12 3z"/>
        </svg>
        카카오톡 공유하기
      </ShareButton>
    </Container>
  );
}
