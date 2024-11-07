// App.js

// React와 필요한 컴포넌트들을 import합니다.
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chatbot from './components/Chatbot'; // Chatbot 컴포넌트를 import합니다.
import Battle from './screens/Battle';   // 새로운 Battle 컴포넌트를 import합니다.
import Setting from './screens/Setting'; // 새로운 Setting 컴포넌트를 import합니다.

const Tab = createBottomTabNavigator();

const App = () => {
   return (
      <NavigationContainer>
         {/* // SafeAreaView를 사용하여 iOS/Android에서 안전한 영역에 표시되도록 합니다. */}
         <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator>
               <Tab.Screen name="Chatbot" component={Chatbot} />
               <Tab.Screen name="Battle" component={Battle} />
               <Tab.Screen name="Setting" component={Setting} />
            </Tab.Navigator>
         </SafeAreaView>
      </NavigationContainer>
   );
};

// App 컴포넌트를 기본 내보내기로 설정하여 다른 파일에서 import할 수 있도록 합니다.
export default App;
