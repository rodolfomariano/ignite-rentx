import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated'


import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'

import {
  Container
} from './styles'

export function Splash() {
  const splashAnimation = useSharedValue(0)
  const navigation = useNavigation()

  const brandStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [0, -50], Extrapolate.CLAMP)
        }
      ]
    }
  })

  const logoStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value,
        [0, 25, 50],
        [0, 0.3, 1],
        Extrapolate.CLAMP // respeitar os limites
      ),
      transform: [
        {
          translateX: interpolate(splashAnimation.value, [0, 50], [-50, 0], Extrapolate.CLAMP)
        }
      ]
    }
  })

  function startApp() {
    // @ts-ignore
    navigation.navigate('Home')
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50,
      { duration: 1000 },
      () => {
        'worklet'
        runOnJS(startApp)()
      }
    )

  }, [])

  return (
    <Container>
      <Animated.View style={[brandStyleAnimation, { position: 'absolute' }]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[logoStyleAnimation, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>

    </Container>
  )
}
