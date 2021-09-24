import React from 'react'
import { StatusBar, useWindowDimensions } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { ConfirmButton } from '../../components/ConfirmButton'

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles'

interface SuccessProps {
  title: string
  description: string
  goTo: string
}

export function Success() {
  const { width } = useWindowDimensions()

  const navigation = useNavigation()
  const route = useRoute()

  const { title, description, goTo } = route.params as SuccessProps

  function handleOK() {
    // @ts-ignore
    navigation.navigate(goTo)
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor='transparent'
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>
          {description}
        </Message>

      </Content>

      <Footer>
        <ConfirmButton title='OK' onPress={handleOK} />
      </Footer>

    </Container>
  )
}