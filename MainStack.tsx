import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { MainScreen } from "./MainScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Main"
                component={MainScreen}
                options={{
                    title: "Delivery Estimator"
                }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);