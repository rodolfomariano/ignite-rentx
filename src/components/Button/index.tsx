import React from 'react'

import { ButtonProps } from 'react-native'
import { useTheme } from 'styled-components'

import {
  Container,
  Title
} from './styles'

interface Props extends ButtonProps {
  title: string
  color?: string
  onPress: () => void
}

export function Button({
  title,
  color,
  onPress
}: Props) {
  const theme = useTheme()

  return (
    <Container color={color ? color : theme.colors.main} onPress={onPress} >
      <Title>{title}</Title>
    </Container>
  )
}