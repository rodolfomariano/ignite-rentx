import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const { Navigator, Screen } = createStackNavigator()

import { SignIn } from '../screens/SignIn'
import { SignUpStepOne } from '../screens/SignUp/SignUpStepOne'
import { SignUpStepTwo } from '../screens/SignUp/SignUpStepTwo'
import { Home } from '../screens/Home'
import { CarDetails } from '../screens/CarDetails'
import { Scheduling } from '../screens/Scheduling'
import { Success } from '../screens/Success'
import { SchedulingDetails } from '../screens/SchedulingDetails'
import { MyCars } from '../screens/MyCars'
import { Splash } from '../screens/Splash'

export function StackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
      // initialRouteName="Splash"
      initialRouteName="SignIn"
    >
      {/* <Screen
        name="Splash"
        component={Splash}
      /> */}
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
        name="Home"
        component={Home}
        options={{
          gestureEnabled: false
        }}
      />
      <Screen
        name="CarDetails"
        component={CarDetails}
      />
      <Screen
        name="Scheduling"
        component={Scheduling}
      />
      <Screen
        name="Success"
        component={Success}
      />
      <Screen
        name="SchedulingDetails"
        component={SchedulingDetails}
      />
      <Screen
        name="MyCars"
        component={MyCars}
      />
    </Navigator >
  )
}