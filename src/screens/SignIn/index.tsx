import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  StatusBar
} from 'react-native'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'

import * as Yup from 'yup'
import theme from '../styles/theme'
import { useAuth } from '../../hooks/auth'

import { database } from '../../database'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Actions,
  Form
} from './styles'


export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()

  const navigation = useNavigation()


  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório!').email('Digite um email valido'),
        password: Yup.string().required('A senha é obrigatória!')
      })

      await schema.validate({ email: email, password: password })

      signIn({ email: email, password: password })

    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert('Opa', error.message)
      }
      Alert.alert('Erro na autenticação, virifique as credenciais!')
    }
  }

  function handleNewAccount() {
    // @ts-ignore
    navigation.navigate('SignUpStepOne')
  }

  useEffect(() => {
    async function loadData() {
      const userCollection = database.get('users')
      const users = await userCollection.query().fetch()
      console.log(users)
    }
    loadData()
  }, [])

  return (
    <KeyboardAvoidingView behavior='position' enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>
              Estamos{'\n'}
              quase lá.
            </Title>
            <SubTitle>
              Faça seu login para começar{'\n'}
              uma experiência incrível.
            </SubTitle>
          </Header>

          <Actions>
            <Form>
              <Input
                iconName='mail'
                placeholder='E-mail'
                keyboardType='email-address'
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={setEmail}
                value={email}
              />

              <Input
                iconName='lock'
                placeholder='Password'
                typePassword
                autoCorrect={false}
                autoCapitalize='none'
                onChangeText={setPassword}
                value={password}
              />

            </Form>
            <Button
              title='Login'
              onPress={handleSignIn}
              // enabled={email && password ? true : false}
              loading={false}
            />
            <Button
              title='Criar conta gratuita'
              onPress={handleNewAccount}
              loading={false}
              color={theme.colors.background_primary}
              light
            />
          </Actions>

        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
