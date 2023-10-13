import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator()

//  Página principal
import { Home } from "../home";

//  Páginas disponíveis para uso
import { LoadingPage } from "../../pages/loadingPage";
import { TaskPage } from "../../pages/taskPage";

export function StackRoutes_Home() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >


            <Stack.Screen
                name="HomeIndex"
                component={Home}
                options={{

                }}
            />

            <Stack.Screen
                name="Loading"
                component={LoadingPage}
                options={{

                }}
            />

            <Stack.Screen
                name="TaskPage"
                component={TaskPage}
                options={{
                    
                }}
            />

        </Stack.Navigator>
    )
}