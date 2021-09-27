import styled, { css } from 'styled-components/native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'
import theme from '../styles/theme'

interface OptionProps {
  active: boolean
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`

export const Header = styled.View`
  width: 100%;
  height: 227px;
  background-color: ${({ theme }) => theme.colors.header};
  padding: 0 24px;

  align-items: center;
  
`

export const HeaderTop = styled.View`
  width: 100%;
  margin-top: ${getStatusBarHeight() + 32}px;

  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`

export const HeaderTitle = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: ${({ theme }) => theme.fonts.secondary_600};
  color: ${({ theme }) => theme.colors.background_secondary};
`

export const LogoutButton = styled(BorderlessButton)`

`

export const PhotoContainer = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;

  background-color: ${({ theme }) => theme.colors.shape};
  margin-top: 32px;
`

export const Photo = styled.Image`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 90px;
`

export const PhotoButton = styled(RectButton)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.main};
  border-radius: 8px;

  align-items: center;
  justify-content: center;
`

export const Content = styled.View`
  padding: 0 24px;
  margin-top: 122px;
`

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  margin-bottom: 24px;

  justify-content: space-around;
  flex-direction: row;
`

export const Option = styled.TouchableOpacity<OptionProps>`
  padding-bottom: 14px;
  width: 50%;

  align-items: center;

  ${({ active }) => active && css`
    border-bottom-width: 2px;
    border-bottom-color: ${({ theme }) => theme.colors.main};
  `}
`

export const OptionTitle = styled.Text<OptionProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme, active }) =>
    active ? theme.fonts.secondary_600 : theme.fonts.secondary_500
  };
  color: ${({ theme, active }) =>
    active ? theme.colors.text : theme.colors.text_detail
  };
`

export const Section = styled.View``