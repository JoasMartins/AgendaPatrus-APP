import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator()

//  Página principal
import { Profile } from "../profile";

//  Páginas disponíveis para uso
import { LoginPage } from "../../pages/loginPage";
import { RegisterPage } from "../../pages/registerPage";
import { TaskPage } from "../../pages/taskPage";

export function StackRoutes_Profile() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >


            <Stack.Screen
                name="ProfileIndex"
                component={Profile}
                options={{

                }}
            />

            <Stack.Screen
                name="Login"
                component={LoginPage}
                options={{

                }}
            />

            <Stack.Screen
                name="Register"
                component={RegisterPage}
                options={{

                }}
            />

            <Stack.Screen
                name="Task"
                component={TaskPage}
                options={{

                }}
            />


        </Stack.Navigator>
    )
}