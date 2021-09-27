import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native'

import { useNavigation } from '@react-navigation/core'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { useAuth } from '../../hooks/auth'

import { useTheme } from 'styled-components'
import { Feather } from '@expo/vector-icons'

import * as ImagePicker from 'expo-image-picker'
import * as Yup from 'yup'

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
  const { user, signOut, updatedUser } = useAuth()

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

  async function handleProfileUpdate() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        name: Yup.string().required('O nome é obrigatório'),
      })

      const data = { name, driverLicense }
      await schema.validate(data)

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        token: user.token,
        name: name,
        driver_license: driverLicense,
        avatar: avatar
      })

      Alert.alert('Perfil atualizado!')

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message)

      } else {
        console.log(error)
        Alert.alert('Não foi possível fazer a atualização')
      }
    }
  }

  function handleUserSignOut() {
    Alert.alert(
      'Quer mesmo sair?',
      'Se você sair, terá que ter internet para conectar-se novamente!',
      [
        {
          text: 'Cancelar',
          onPress: () => { }
        },
        {
          text: 'Sair',
          onPress: () => signOut()

        }
      ]
    )


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
                onPress={handleUserSignOut}>
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
              title='Salvar alterações'
              onPress={handleProfileUpdate}
            />


          </Content>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}