// StackRouter.js
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, Button} from 'react-native';
const Stack = createNativeStackNavigator();
import {Home} from './pages/home';
import {List} from './pages/list';
import {Detail} from './pages/detail';
import ScanQRCode from './pages/ScanQRCode';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
const ListStack = createNativeStackNavigator();
function ListStackScreen() {
  return (
    <ListStack.Navigator>
      <ListStack.Screen name="List">
        {props => <List {...props} extraData={'iamData'} />}
      </ListStack.Screen>
      <ListStack.Screen name="Detail" component={Detail} />
    </ListStack.Navigator>
  );
}
function IndexStackScreen() {
  return (
    <ListStack.Navigator>
      <ListStack.Screen name="Home">
        {props => <Home {...props} extraData={123} />}
      </ListStack.Screen>
      <ListStack.Screen name="ScanQRCode" component={ScanQRCode} />
    </ListStack.Navigator>
  );
}
export default function StackRouter() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'IndexStack') {
            iconName = focused ? 'home' : 'home-outline';
          }
          if (route.name === 'ListStack') {
            iconName = focused ? 'list-circle' : 'list-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="IndexStack"
        options={{
          headerShown: false,
        }}
        component={IndexStackScreen}>
        {/* {props => <Home {...props} extraData={123} />} */}
      </Tab.Screen>
      <Tab.Screen
        name="ListStack"
        options={{
          headerShown: false,
        }}
        component={ListStackScreen}
      />
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
