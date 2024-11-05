// React와 필요한 컴포넌트들을 import합니다.
import React from 'react';
import { SafeAreaView } from 'react-native';
import Chatbot from './Chatbot'; // Chatbot 컴포넌트를 import합니다.

const App = () => {
   return (
      // SafeAreaView를 사용하여 iOS/Android에서 안전한 영역에 표시되도록 합니다.
      <SafeAreaView style={{ flex: 1 }}>
         <Chatbot />
      </SafeAreaView>
   );
};

// App 컴포넌트를 기본 내보내기로 설정하여 다른 파일에서 import할 수 있도록 합니다.
export default App;
