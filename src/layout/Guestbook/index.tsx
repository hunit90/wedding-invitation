import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import useScrollFadeIn from "../../hooks/useScrollFadeIn";

const Container = styled.section`
  padding: 100px 20px;
  background-color: #f2efe9;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
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
  color: #333;
  letter-spacing: 2px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto 50px auto;
  background-color: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
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
  
  &:focus {
    outline: none;
    border-color: var(--point-color);
  }
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
  
  &:focus {
    outline: none;
    border-color: var(--point-color);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #555;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-family: var(--font-kr);
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #333;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 400px;
  margin: 0 auto;
`;

const MessageCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  position: relative;
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const MessageName = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: #333;
`;

const MessageDate = styled.div`
  font-size: 12px;
  color: #999;
`;

const MessageContent = styled.div`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  white-space: pre-wrap;
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

interface GuestbookMessage {
  id: string;
  name: string;
  password: string;
  message: string;
  createdAt: { toDate: () => Date } | null;
}

export default function Guestbook() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
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
      alert("이름, 비밀번호, 메시지를 모두 입력해주세요.");
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
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("방명록 작성에 실패했습니다. 다시 시도해주세요.");
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

  return (
    <Container {...fade}>
      <Header>
        <SubTitle>Guestbook</SubTitle>
        <Title>방명록</Title>
      </Header>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input 
            type="text" 
            placeholder="이름" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            maxLength={10}
          />
          <Input 
            type="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            maxLength={15} 
          />
        </InputGroup>
        <TextArea 
          placeholder="축하의 메시지를 남겨주세요." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          maxLength={300}
        />
        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "등록 중..." : "등록하기"}
        </SubmitButton>
      </Form>

      <MessageList>
        {messages.map((msg) => (
          <MessageCard key={msg.id}>
            <DeleteButton onClick={() => handleDelete(msg.id, msg.password)}>✕</DeleteButton>
            <MessageHeader>
              <MessageName>{msg.name}</MessageName>
              <MessageDate>{formatDate(msg.createdAt)}</MessageDate>
            </MessageHeader>
            <MessageContent>{msg.message}</MessageContent>
          </MessageCard>
        ))}
      </MessageList>
    </Container>
  );
}
