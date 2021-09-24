import React, { ComponentProps, useState } from 'react'
import { TextInputProps } from 'react-native'

import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import {
  Container,
  IconContainer,
  InputContainer,
  InputText
} from './styles'
import { BorderlessButton } from 'react-native-gesture-handler'

interface InputProps extends TextInputProps {
  iconName: ComponentProps<typeof Feather>['name']
  typePassword?: boolean
  value?: string
}

export function Input({
  iconName,
  typePassword = false,
  value,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const [hiddenPassword, setHiddenPassword] = useState(true)

  const theme = useTheme()

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!!value)
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text_detail}
        />
      </IconContainer>

      <InputContainer isFocused={isFocused}>
        {typePassword
          ? (
            <InputText
              secureTextEntry={hiddenPassword && true}
              onFocus={handleInputFocus} // entra no input
              onBlur={handleInputBlur} // sai do input
              {...rest}
            />
          )
          : (
            <InputText

              onFocus={handleInputFocus} // entra no input
              onBlur={handleInputBlur} // sai do input
              {...rest}
            />
          )
        }

        {typePassword && (
          <BorderlessButton>
            <Feather
              name={hiddenPassword ? 'eye' : 'eye-off'}
              size={24}
              color={theme.colors.text_detail}
              onPress={() => setHiddenPassword(!hiddenPassword)}
            />
          </BorderlessButton>
        )}
      </InputContainer>


    </Container>
  )
}
