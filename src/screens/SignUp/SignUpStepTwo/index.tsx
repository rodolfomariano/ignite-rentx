import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'

import { useTheme } from 'styled-components/native'

import api from '../../../services/api'

import * as Yup from 'yup'

import {
  Container,
  Header,
  BulletContainer,
  Title,
  SubTitle,
  Form,
  StepTitle,
} from './styles'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

interface Params {
  user: {
    name: string
    email: string
    driverLicense: string
  }
}

export function SignUpStepTwo() {
  const [userPassword, setUserPassword] = useState('')
  const [confirmUserPassword, setConfirmUserPassword] = useState('')

  const navigation = useNavigation()
  const route = useRoute()

  const theme = useTheme()

  const { user } = route.params as Params
  console.log(user)

  function handleBack() {
    navigation.goBack()
  }

  async function handleRegister() {
    try {
      const schema = Yup.object().shape({
        confirmPassword: Yup.string().required('Confirma sua senha'),
        password: Yup.string().required('A senha é obrigatória!'),
      })

      if (confirmUserPassword !== userPassword) {
        return Alert.alert('As senhas não são iguais')
      }

      await schema.validate({ password: userPassword, confirmPassword: confirmUserPassword })

      await api.post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password: userPassword
      }).then(() => {
        // @ts-ignore
        navigation.navigate('Success', {
          title: 'Conta criada',
          description: `Agora é só logar\n e aproveitar`,
          goTo: 'SignIn'
        })

      }).catch(() => {
        Alert.alert('Opa', 'Não foi possivel cadastrar!')
      })



    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      }
      Alert.alert('Erro na autenticação, virifique as credenciais!')
    }
  }

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />

            <BulletContainer>
              <Bullet />
              <Bullet active />
            </BulletContainer>
          </Header>

          <Title>
            Ultima etapa
          </Title>

          <Form>
            <StepTitle>
              2 - Senha
            </StepTitle>

            <Input
              iconName='lock'
              placeholder='Digite uma senha'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setUserPassword}
              value={userPassword}
              typePassword
            />
            <Input
              iconName='lock'
              placeholder='Repita a senha'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setConfirmUserPassword}
              value={confirmUserPassword}
              typePassword
            />

            <Button
              color={theme.colors.success}
              title='Cadastrar'
              onPress={handleRegister}
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
