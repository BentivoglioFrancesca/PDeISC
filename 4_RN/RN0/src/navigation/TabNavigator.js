import tabOptions from '../styles/TabNavigator.styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StyledScreen from '../screens/StyledScreen';

const Tab = createBottomTabNavigator();

// arma las dos pestañas (tabs) de abajo

export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={tabOptions}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Estilo" component={StyledScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
