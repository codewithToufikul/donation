import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    font-family: 'Noto Sans Bengali', sans-serif; /* Ensure Bangla font is applied */
`;

const Header = styled.header`
    background-color: #00796b;
    color: #fff;
    padding: 20px;
    text-align: center;
    border-radius: 8px 8px 0 0;
    margin-bottom:12px
`;

const Title = styled.h1`
    margin: 0;
    font-size: 24px;
    font-weight: bold;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Label = styled.label`
    font-size: 16px;
    color: #333;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
`;

const Button = styled.button`
    padding: 15px;
    font-size: 16px;
    color: #fff;
    background-color: #00796b;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #004d40;
    }
`;

const PreviousAmounts = styled.div`
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f0f0f0;
`;

const AmountItem = styled.p`
    font-size: 16px;
    color: #333;
    margin: 5px 0;
`;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 300px;
    margin: 0 auto;
`;

const GlobalStyle = styled`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;700&display=swap');
    body {
        font-family: 'Noto Sans Bengali', Arial, sans-serif;
    }
`;

const AdminPanel = () => {
    const [totalMoney, setTotalMoney] = useState('');
    const [todaysMoney, setTodaysMoney] = useState('');
    const [previousTotal, setPreviousTotal] = useState(33572); // Example previous amount
    const [previousTodays, setPreviousTodays] = useState(0);  // Example previous amount
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const correctPassword = 'admin123';

    const handleSubmit = (e) => {
        e.preventDefault();
        setPreviousTotal(totalMoney);
        setPreviousTodays(todaysMoney);
        setTotalMoney('');
        setTodaysMoney('');
        alert(`মোট টাকা: ${totalMoney}\nআজকের টাকা: ${todaysMoney}`);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            alert('ভুল পাসওয়ার্ড');
        }
    };

    if (!isAuthenticated) {
        return (
            <>
                <GlobalStyle />
                <Container>
                    <Header>
                        <Title>লগইন</Title>
                    </Header>
                    <LoginForm>
                        <InputGroup>
                            <Label htmlFor="password">পাসওয়ার্ড</Label>
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputGroup>
                        <Button onClick={handleLogin}>লগইন</Button>
                    </LoginForm>
                </Container>
            </>
        );
    }

    return (
        <>
            <GlobalStyle />
            <Container>
                <Header>
                    <Title>অ্যাডমিন প্যানেল</Title>
                </Header>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label htmlFor="totalMoney">মোট টাকা</Label>
                        <Input
                            type="number"
                            id="totalMoney"
                            value={totalMoney}
                            onChange={(e) => setTotalMoney(e.target.value)}
                        />
                    </InputGroup>
                    <InputGroup>
                        <Label htmlFor="todaysMoney">আজকের টাকা</Label>
                        <Input
                            type="number"
                            id="todaysMoney"
                            value={todaysMoney}
                            onChange={(e) => setTodaysMoney(e.target.value)}
                        />
                    </InputGroup>
                    <Button type="submit">জমা দিন</Button>
                </Form>
                <PreviousAmounts>
                    <h2>পূর্ববর্তী পরিমাণ</h2>
                    <AmountItem>মোট টাকা: {previousTotal}</AmountItem>
                    <AmountItem>আজকের টাকা: {previousTodays}</AmountItem>
                </PreviousAmounts>
            </Container>
        </>
    );
};

export default AdminPanel;
