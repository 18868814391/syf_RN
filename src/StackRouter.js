// StackRouter.js
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, Button} from 'react-native';
const Stack = createNativeStackNavigator();
import {Home} from './pages/home';
import {List} from './pages/list';
import {Detail} from './pages/detail';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
export default function StackRouter() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          }
          if (route.name === 'List') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="List" component={List} />
    </Tab.Navigator>
    // <Stack.Navigator
    //   screenOptions={{
    //     headerStyle: {
    //       backgroundColor: '#f4511e',
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //       fontWeight: 'bold',
    //     },
    //   }}>
    //   <Stack.Screen name="Home">
    //     {props => <Home {...props} extraData={123} />}
    //   </Stack.Screen>
    //   <Stack.Screen name="List">
    //     {props => <List {...props} extraData={'iamData'} />}
    //   </Stack.Screen>
    //   <Stack.Screen name="Detail" component={Detail} />
    // </Stack.Navigator>
  );
}
