// Chatbot.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { OPENAI_API_KEY } from '@env';

const Chatbot = () => {
   const [messages, setMessages] = useState([]);
   const [userInput, setUserInput] = useState('');
   const [loading, setLoading] = useState(false);
   const [quizMode, setQuizMode] = useState(false); // 퀴즈 모드 활성화 여부
   const [currentQuiz, setCurrentQuiz] = useState(null); // 현재 퀴즈 저장
   const [correctAnswer, setCorrectAnswer] = useState(null); // 정답 저장

   const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

   // 메시지 배열에 새로운 메시지를 추가하는 함수
   const addMessage = (sender, message) => {
      setMessages(prevMessages => [...prevMessages, { sender, message }]);
   };

   // 퀴즈 시작 함수: OpenAI API를 통해 OX 퀴즈 질문을 가져옵니다.
   const startQuiz = async () => {
      setLoading(true);
      try {
         const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
               model: 'gpt-3.5-turbo',
               messages: [{ role: 'user', content: 'OX 형식의 이지선다 상식 퀴즈를 하나 내줘' }],
               max_tokens: 100,
            }),
         });

         const data = await response.json();
         const quizQuestion = data.choices?.[0]?.message?.content || '퀴즈 질문을 불러올 수 없습니다.';
         
         // 퀴즈 모드를 활성화하고 질문을 저장
         setQuizMode(true);
         setCurrentQuiz(quizQuestion);
         setCorrectAnswer('O'); // OpenAI에서 받은 정답을 "O" 또는 "X"로 설정해주세요
         addMessage('bot', `퀴즈: ${quizQuestion}\n정답을 O 또는 X로 입력하세요.`);
      } catch (error) {
         console.error('퀴즈 로딩 오류!', error);
         addMessage('bot', '퀴즈를 가져오는 중 오류가 발생했습니다.');
      } finally {
         setLoading(false);
      }
   };

   // 사용자가 메시지를 전송할 때 호출되는 함수
   const handleSendMessage = () => {
      const message = userInput.trim().toUpperCase();
      if (message.length === 0) return;

      addMessage('user', message);
      setUserInput('');

      if (quizMode && currentQuiz) {
         // 퀴즈 모드에서 사용자의 답변을 처리
         checkAnswer(message);
      } else if (message === '퀴즈 시작') {
         // 사용자가 "퀴즈 시작"이라고 입력하면 퀴즈 시작 함수 호출
         startQuiz();
      } else {
         // 일반 메시지 처리 (퀴즈 모드가 아닐 때)
         addMessage('bot', '퀴즈를 시작하려면 "퀴즈 시작"이라고 입력하세요.');
      }
   };

   // 사용자의 답변을 확인하는 함수
   const checkAnswer = async (answer) => {
      if (answer !== 'O' && answer !== 'X') {
         addMessage('bot', '정확한 답변을 위해 O 또는 X로만 입력해주세요.');
         return;
      }

      setLoading(true);
      try {
         const isCorrect = answer === correctAnswer;
         const feedback = isCorrect ? '정답입니다!' : '오답입니다. 다시 도전해보세요!';
         addMessage('bot', feedback);

         setQuizMode(false); // 퀴즈 모드 종료
         setCurrentQuiz(null); // 현재 퀴즈 초기화
         setCorrectAnswer(null); // 정답 초기화
      } catch (error) {
         console.error('답변 확인 오류!', error);
         addMessage('bot', '답변을 확인하는 중 오류가 발생했습니다.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title}>퀴즈 챗봇</Text>
         <ScrollView style={styles.chatDiv}>
            {loading && <Text style={styles.loading}>답변을 기다리고 있습니다...</Text>}
            {messages.map((msg, index) => (
               <Text key={index} style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                  {`${msg.sender === 'user' ? '나' : '챗봇'}: ${msg.message}`}
               </Text>
            ))}
         </ScrollView>
         <View style={styles.inputDiv}>
            <TextInput
               style={styles.input}
               placeholder='메시지를 입력하세요'
               value={userInput}
               onChangeText={setUserInput}
               onSubmitEditing={handleSendMessage}
            />
            <Button title='전송' onPress={handleSendMessage} />
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: { flex: 1, padding: 20 },
   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
   chatDiv: { flex: 1, marginBottom: 20 },
   userMessage: { alignSelf: 'flex-end', backgroundColor: '#d1e7dd', padding: 10, borderRadius: 5, marginBottom: 5 },
   botMessage: { alignSelf: 'flex-start', backgroundColor: '#f8d7da', padding: 10, borderRadius: 5, marginBottom: 5 },
   loading: { fontStyle: 'italic', marginBottom: 5 },
   inputDiv: { flexDirection: 'row', alignItems: 'center' },
   input: { flex: 1, borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 10, marginRight: 10 },
});

export default Chatbot;
