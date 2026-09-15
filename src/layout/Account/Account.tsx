import { useState } from "react";
import styled from "@emotion/styled";
import data from "../../data.json";

const Container = styled.div`
  padding: 50px 20px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 30px;
  color: #333;
`;

const AccordionItem = styled.div`
  background: white;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const AccordionHeader = styled.button`
  width: 100%;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  font-size: 16px;
  font-weight: 500;
  color: #444;
  cursor: pointer;
`;

const AccordionContent = styled.div<{ isOpen: boolean }>`
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  border-top: ${({ isOpen }) => (isOpen ? "1px solid #eee" : "none")};
`;

const AccountRow = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #f5f5f5;
  &:last-child {
    border-bottom: none;
  }
`;

const AccountInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const AccountDetails = styled.div`
  font-size: 14px;
  color: #555;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const BankInfo = styled.span`
  font-weight: 500;
`;

const NumberInfo = styled.span`
  font-family: monospace;
  font-size: 15px;
`;

const CopyButton = styled.button`
  padding: 6px 12px;
  font-size: 12px;
  color: #333;
  background-color: #eee;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
`;

const NameRole = styled.span`
  font-size: 14px;
  color: #333;
  margin-top: 4px;
`;

const PayLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const PayButton = styled.a`
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  color: white;
  &.kakao {
    background-color: #fee500;
    color: #191919;
  }
  &.toss {
    background-color: #0050ff;
  }
`;

export default function Account() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("계좌번호가 복사되었습니다.");
    });
  };

  return (
    <Container>
      <Title>마음 전하실 곳</Title>

      {data.hostInfo.map((host, index) => (
        <AccordionItem key={index}>
          <AccordionHeader onClick={() => toggleAccordion(index)}>
            <span>{host.host} 계좌번호</span>
            <span>{openIndex === index ? "▲" : "▼"}</span>
          </AccordionHeader>
          <AccordionContent isOpen={openIndex === index}>
            {host.accountInfo.map((acc, accIdx) => (
              <AccountRow key={accIdx}>
                <AccountInfo>
                  <AccountDetails>
                    <BankInfo>{acc.bank}</BankInfo>
                    <NumberInfo>{acc.account}</NumberInfo>
                    <NameRole>
                      {acc.name} ({acc.relation})
                    </NameRole>
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
    </Container>
  );
}
