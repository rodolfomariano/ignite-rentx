import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { BackButton } from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet'

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


export function SignUpStepOne() {
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userDriverLicense, setUserDriverLicense] = useState('')

  const navigation = useNavigation()

  function handleBack() {
    navigation.goBack()
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('Digite sua CNH!'),
        email: Yup.string().required('Email obrigatório!').email('Digite um email valido'),
        name: Yup.string().required('Nome obrigatório!'),
      })

      const data = { name: userName, email: userEmail, driverLicense: userDriverLicense }

      await schema.validate(data)

      // @ts-ignore
      navigation.navigate('SignUpStepTwo', { user: data })

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
              <Bullet active />
              <Bullet />
            </BulletContainer>
          </Header>

          <Title>
            Crie sua{'\n'}conta
          </Title>

          <SubTitle>
            Faça seu cadastro de{'\n'}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <StepTitle>
              1 - Dados Pessoais
            </StepTitle>

            <Input
              iconName='user'
              placeholder='Digite seu nome'
              autoCorrect={false}
              // autoCapitalize='none'
              onChangeText={setUserName}
              value={userName}
            />
            <Input
              iconName='mail'
              placeholder='Digite seu email'
              keyboardType='email-address'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setUserEmail}
              value={userEmail}

            />
            <Input
              iconName='credit-card'
              placeholder='Digite sua CNH'
              keyboardType='numeric'
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={setUserDriverLicense}
              value={userDriverLicense}
            />


            <Button
              title='Próximo'
              onPress={handleNextStep}
            />
          </Form>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
