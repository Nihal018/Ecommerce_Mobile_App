import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Browse from "./screens/Browse";
import Favourites from "./screens/Favourites";
import Cart from "./screens/Cart";
import Profile from "./screens/Profile";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import All from "./screens/HomeOverview/All";
import Audio from "./screens/HomeOverview/Audio";
import Drones from "./screens/HomeOverview/Drones";
import Gaming from "./screens/HomeOverview/Gaming";
import PC from "./screens/HomeOverview/PC";
import Video from "./screens/HomeOverview/Video";

const bottomTab = createBottomTabNavigator();
const topTab = createMaterialTopTabNavigator();

function HomeTabs() {
  return (
    <topTab.Navigator
      initialRouteName="All"
      style={{
        backgroundColor: "white",
      }}
      screenOptions={{
        tabBarInactiveTintColor: "grey",

        tabBarActiveTintColor: "black",
        tabBarIndicatorStyle: {
          backgroundColor: "black", // Black bottom border for focused tab
          height: 3, // Height of the bottom border
        },
        tabBarAndroidRipple: { borderless: true },
        tabBarItemStyle: {
          width: 90,
        },
        tabBarStyle: {
          backgroundColor: "white", // Background color of the tab bar
        },
        tabBarLabelStyle: {
          textTransform: "capitalize",
        },

        tabBarScrollEnabled: true,
        tabBarGap: 10,
        tabBarAllowFontScaling: true,
      }}
    >
      <topTab.Screen name="All" component={All} options={{}} />
      <topTab.Screen name="Audio" component={Audio} options={{}} />
      <topTab.Screen name="Drones" component={Drones} options={{}} />

      <topTab.Screen name="Gaming" component={Gaming} options={{}} />
      <topTab.Screen name="PC" component={PC} options={{}} />
      <topTab.Screen name="Video" component={Video} options={{}} />
    </topTab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <bottomTab.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          tabBarLabelPosition: "below-icon",
        }}
      >
        <bottomTab.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name="home-outline" size={size} color={color} />;
            },
            tabBarLabel: "Home",
            headerTitle: "Hello XYZ",
          }}
        />
        <bottomTab.Screen
          name="Browse"
          component={Browse}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <AntDesign name="search1" size={size} color={color} />;
            },
            tabBarLabel: "Browse",
            headerShown: false,
          }}
        />
        <bottomTab.Screen
          name="Favourites"
          component={Favourites}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <AntDesign name="hearto" size={size} color={color} />;
            },
            tabBarLabel: "Favourites",
          }}
        />
        <bottomTab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <AntDesign name="shoppingcart" size={size} color={color} />
              );
            },
            tabBarLabel: "Cart",
          }}
        />
        <bottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => {
              return (
                <Ionicons name="person-outline" size={size} color={color} />
              );
            },
            tabBarLabel: "Profile",
          }}
        />
      </bottomTab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
