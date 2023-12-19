import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import Pay from './src/Screen/Paypal/Pay';
import Login from './src/Screen/Login/Login';
import Notification from './src/Screen/Notifi/Notification';
import Web from './src/Screen/Web/Web';
import Coment from './src/Screen/Message/Coment';
import Redux from './src/Screen/redux/Redux';
import Icon from 'react-native-vector-icons/FontAwesome'; // Change this to the appropriate icon library
import Address from './src/Screen/Address/Address';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({size}) => {
              let iconName;

              if (route.name === 'Login') {
                iconName = 'user-o';
              } else if (route.name === 'Pay') {
                iconName = 'credit-card';
              } else if (route.name === 'Web') {
                iconName = 'globe';
              } else if (route.name === 'Redux') {
                iconName = 'code';
              } else if (route.name === 'Coment') {
                iconName = 'comments-o';
              } else if (route.name === 'Notification') {
                iconName = 'bell-o';
              }

              return <Icon name={iconName} size={size} color={'black'} />;
            },
          })}>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Address" component={Address} />
          <Tab.Screen name="Pay" component={Pay} />
          <Tab.Screen name="Web" component={Web} />
          <Tab.Screen name="Redux" component={Redux} />
          <Tab.Screen name="Coment" component={Coment} />
          <Tab.Screen name="Notification" component={Notification} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
