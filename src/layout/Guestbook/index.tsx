import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";

const Container = styled.section`
  padding: 80px 25px;
  background-color: var(--bg-color);
`;

const Title = styled.h2`
  font-family: var(--font-editorial);
  font-size: 34px;
  font-style: italic;
  font-weight: 400;
  color: #111;
  margin: 0 0 15px 0;
  letter-spacing: -0.5px;
`;

const SubTitle = styled.p`
  font-family: var(--font-kr);
  font-size: 14px;
  color: #666;
  margin: 0 0 40px 0;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin-bottom: 40px;
`;

const MessageCard = styled.div`
  background-color: transparent;
  padding: 25px 20px;
  border: 1px solid #ddd;
  position: relative;
  box-sizing: border-box;
  width: 100%;
`;

const MessageContent = styled.div`
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  white-space: pre-wrap;
  margin-bottom: 20px;
  font-family: var(--font-kr);
`;

const MessageFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MessageName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: #555;
`;

const MessageDate = styled.div`
  font-size: 12px;
  color: #999;
  letter-spacing: 0.5px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #ccc;
  font-size: 16px;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    color: #999;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const PillButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 16px 0;
  border-radius: 30px;
  font-family: var(--font-kr);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? '#dcdad3' : 'transparent')};
  border: 1px solid ${(props) => (props.primary ? '#dcdad3' : '#dcdad3')};
  color: #333;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${(props) => (props.primary ? '#d0cec7' : '#f0efeb')};
  }
`;

// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.6);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  padding: 25px;
  box-sizing: border-box;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: var(--font-kr);
  
  &:focus { outline: none; border-color: #aaa; }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: var(--font-kr);
  resize: none;
  height: 100px;
  box-sizing: border-box;
  
  &:focus { outline: none; border-color: #aaa; }
`;

const SubmitBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
`;

const CloseBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #f5f5f5;
  color: #333;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
`;

interface GuestbookMessage {
  id: string;
  name: string;
  password: string;
  message: string;
  createdAt: { toDate: () => Date } | null;
}

export default function Guestbook() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const fade = useScrollFadeIn<HTMLDivElement>();

  useEffect(() => {
    const q = query(collection(db, "guestbook"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GuestbookMessage[];
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !password.trim() || !message.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "guestbook"), {
        name,
        password,
        message,
        createdAt: serverTimestamp()
      });
      setName("");
      setPassword("");
      setMessage("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("방명록 작성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, correctPassword: string) => {
    const inputPassword = window.prompt("삭제하려면 비밀번호를 입력해주세요.");
    if (inputPassword === null) return;
    
    if (inputPassword === correctPassword) {
      try {
        await deleteDoc(doc(db, "guestbook", id));
        alert("삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting document: ", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const formatDate = (timestamp: { toDate: () => Date } | null) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const displayMessages = showAll ? messages : messages.slice(0, 3);

  return (
    <Container {...fade}>
      <Title>Letters to Us</Title>
      <SubTitle>저희 둘에게 따뜻한 축하의 말을 남겨주세요</SubTitle>

      {messages.length > 0 && (
        <MessageList>
          {displayMessages.map((msg) => (
            <MessageCard key={msg.id}>
              <DeleteButton onClick={() => handleDelete(msg.id, msg.password)}>✕</DeleteButton>
              <MessageContent>{msg.message}</MessageContent>
              <MessageFooter>
                <MessageName>{msg.name}</MessageName>
                <MessageDate>{formatDate(msg.createdAt)}</MessageDate>
              </MessageFooter>
            </MessageCard>
          ))}
        </MessageList>
      )}

      <ButtonGroup>
        {messages.length > 3 && (
          <PillButton onClick={() => setShowAll(!showAll)}>
            {showAll ? "접기" : "전체 보기"}
          </PillButton>
        )}
        <PillButton primary onClick={() => setIsModalOpen(true)}>
          방명록 남기기
        </PillButton>
      </ButtonGroup>

      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h3 style={{ margin: '0 0 20px 0', fontFamily: 'var(--font-kr)' }}>방명록 작성</h3>
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} maxLength={10} />
                <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} maxLength={15} />
              </InputGroup>
              <TextArea placeholder="축하의 메시지를 남겨주세요." value={message} onChange={(e) => setMessage(e.target.value)} maxLength={300} />
              <SubmitBtn type="submit" disabled={isSubmitting}>
                {isSubmitting ? "등록 중..." : "등록하기"}
              </SubmitBtn>
              <CloseBtn type="button" onClick={() => setIsModalOpen(false)}>취소</CloseBtn>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}
