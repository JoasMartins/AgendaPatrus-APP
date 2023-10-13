import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Image, View } from "react-native";
//  TELAS
import { StackRoutes_Home } from "./screens/home/routesStack"
import { PastTasks } from "./screens/pastTasks"
import { CreateTask } from "./screens/createTask"
import { Statistics } from "./screens/statistics"
import { StackRoutes_Profile } from "./screens/profile/routesStack" // profile

const Tab = createBottomTabNavigator()

export function Routes() {    
    return (
        
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#949494",
                tabBarStyle: {
                    backgroundColor: "#073ace",
                    borderTopWidth: 0
                },
                
            }}
        >
            <Tab.Screen
                name="Home"
                component={StackRoutes_Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return <Image source={require("./assets/icons/home.png")} style={{ height: 27, width: 27 }} />
                        } else {
                            return <Image source={require("./assets/icons/home-outline.png")} style={{ height: 27, width: 27 }} />
                        }
                    }
                }}
            />

            <Tab.Screen
                name="PastTasks"
                component={PastTasks}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return <Image source={require("./assets/icons/history.png")} style={{ height: 27, width: 27 }} />
                        } else {
                            return <Image source={require("./assets/icons/history-outline.png")} style={{ height: 27, width: 27 }} />
                        }
                    }
                }}
            />

            <Tab.Screen
                name="CreateTask"
                component={CreateTask}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return (
                                <View style={{
                                    backgroundColor: "#215aff",
                                    bottom: 24,
                                    padding: 20,
                                    borderRadius: 50
                                }}>
                                    <Image source={require("./assets/icons/more.png")} style={{ height: 27, width: 27 }} />
                                </View>
                            )
                        } else {
                            return (
                                <View style={{
                                    backgroundColor: "#4776ff",
                                    bottom: 24,
                                    padding: 20,
                                    borderRadius: 50
                                }}>
                                    <Image source={require("./assets/icons/more.png")} style={{ height: 27, width: 27, opacity: 0.6 }} />
                                </View>
                            )
                        }
                    }
                }}
            />

            <Tab.Screen
                name="Statistics"
                component={Statistics}
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return <Image source={require("./assets/icons/statistics.png")} style={{ height: 27, width: 27 }} />
                        } else {
                            return <Image source={require("./assets/icons/statistics-outline.png")} style={{ height: 27, width: 27 }} />
                        }
                    }
                }}
            />

            <Tab.Screen
                name="Profile"
                component={StackRoutes_Profile}
                
                options={{
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return <Image source={require("./assets/icons/profile.png")} style={{ height: 27, width: 27 }} />
                        } else {
                            return <Image source={require("./assets/icons/profile-outline.png")} style={{ height: 27, width: 27 }} />
                        }
                    }
                }}
            />
        </Tab.Navigator>
    )
}