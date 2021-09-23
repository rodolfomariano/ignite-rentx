import React from 'react'

import LottieView from 'lottie-react-native'

import carAnimate from '../../assets/carAnimate.json'

import {
  Container
} from './styles'

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={carAnimate}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </Container>
  )
}