import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator()

//  Página principal
import { LoginOrRegisterPage } from "./index";

//  Páginas disponíveis para uso
import { LoginPage } from "../../pages/loginPage";
import { RegisterPage } from "../../pages/registerPage";

export function LoginOrRegister_StackRoutes() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >


            <Stack.Screen
                name="LoginOrRegister"
                component={LoginOrRegisterPage}
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

        </Stack.Navigator>
    )
}