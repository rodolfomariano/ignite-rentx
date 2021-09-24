import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import { SignIn } from '../screens/SignIn'
import { SignUpStepOne } from '../screens/SignUp/SignUpStepOne'
import { SignUpStepTwo } from '../screens/SignUp/SignUpStepTwo'
import { Success } from '../screens/Success'
import { Splash } from '../screens/Splash'

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName="Splash"
    >
      <Screen
        name="Splash"
        component={Splash}
      />
      <Screen
        name="SignIn"
        component={SignIn}
      />
      <Screen
        name="SignUpStepOne"
        component={SignUpStepOne}
      />
      <Screen
        name="SignUpStepTwo"
        component={SignUpStepTwo}
      />
      <Screen
        name="Success"
        component={Success}
      />

    </Navigator >
  )
}