import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'

import { useNavigation } from '@react-navigation/core'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { useAuth } from '../../hooks/auth'

import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker'

import { BackButton } from '../../components/BackButton'
import { Input } from '../../components/Input'
import { Button } from '../../components/Button'

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles'


export function Profile() {
  const { user, signOut } = useAuth()

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit')
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [driverLicense, setDriverLicense] = useState(user.driver_license)

  const theme = useTheme()
  const navigation = useNavigation()


  function handleBack() {
    navigation.goBack()
  }

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    })

    if (result.cancelled) {
      return
    }

    if (result.uri) {
      setAvatar(result.uri)
    }
  }

  function handleOptionChange(option: 'dataEdit' | 'passwordEdit') {
    setOption(option)
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton
                onPress={handleBack}
                color={theme.colors.shape}
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton
                onPress={signOut}>
                <Feather name='power' size={24} color={theme.colors.main} />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={handleAvatarSelect}>
                <Feather name='camera' size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>

            {option === 'dataEdit'
              ? (
                <Section>
                  <Input
                    iconName='user'
                    placeholder='Nome'
                    defaultValue={user.name}
                    autoCorrect={false}
                    onChangeText={setName}
                  />
                  <Input
                    iconName='mail'
                    defaultValue={user.email}
                    editable={false}
                    style={{ color: theme.colors.shape }}
                  />
                  <Input
                    iconName='credit-card'
                    placeholder='CNH'
                    defaultValue={user.driver_license}
                    keyboardType='numeric'
                    onChangeText={setDriverLicense}
                  />
                </Section>
              )
              : (
                <Section>
                  <Input
                    iconName='lock'
                    placeholder='Senha atual'
                    autoCorrect={false}
                    typePassword
                  />
                  <Input
                    iconName='lock'
                    placeholder='Nova senha'
                    autoCorrect={false}
                    typePassword
                  />
                  <Input
                    iconName='lock'
                    placeholder='Confirme a nova senha'
                    autoCorrect={false}
                    typePassword
                  />
                </Section>
              )
            }

            <Button
              title='Editar'
            />


          </Content>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}