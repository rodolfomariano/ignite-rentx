import React from 'react'

import { ButtonProps, ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components'

import {
  Container,
  Title
} from './styles'

interface Props extends ButtonProps {
  title: string
  color?: string
  onPress: () => void
  enabled?: boolean
  loading?: boolean
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false
}: Props) {
  const theme = useTheme()

  return (
    <Container
      color={color ? color : theme.colors.main}
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: (enabled === false || loading === true) ? 0.5 : 1 }}
    >
      {loading === true
        ? <ActivityIndicator color={theme.colors.shape} />
        : <Title>{title}</Title>
      }


    </Container>
  )
}