import { createStyles, getTabOptions } from '../styles/TabNavigator.styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import BasicsScreen from '../screens/BasicsScreen';
import InputsScreen from '../screens/InputsScreen';
import ListScreen from '../screens/ListScreen';
import DateHeader from '../components/DateHeader';
import { useAppTheme } from '../theme/ThemeContext';

// arma las pestañas (tabs) de abajo 

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <NavigationContainer>
      <View style={styles.screen}>
        <DateHeader />
        <Tab.Navigator
          screenOptions={getTabOptions(theme)}
        >
          <Tab.Screen name="Básicos" component={BasicsScreen} />
          <Tab.Screen name="Inputs" component={InputsScreen} />
          <Tab.Screen name="Listas" component={ListScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
