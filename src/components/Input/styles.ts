import styled, { css } from 'styled-components/native'
import { TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import theme from '../../screens/styles/theme'


interface Props {
  isFocused: boolean
}

export const Container = styled.View`
  width: 100%;
  /* background-color: ${({ theme }) => theme.colors.background_secondary}; */
  margin-bottom: 8px;

  

  flex-direction: row;
  align-items: center;
  
`

export const IconContainer = styled.View<Props>`
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.background_secondary};
  
  margin-right: 2px;

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
    
  `}
`

export const InputContainer = styled.View<Props>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-right: 24px;
  background-color: ${({ theme }) => theme.colors.background_secondary};

  ${({ isFocused, theme }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `}
`

export const InputText = styled(TextInput)`
  flex: 1;
  padding: 11px;

  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
`
