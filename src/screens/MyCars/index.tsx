import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FlatList, StatusBar } from 'react-native'
import { useTheme } from 'styled-components'
import { AntDesign } from '@expo/vector-icons'

import { BackButton } from '../../components/BackButton'
import { CardCar } from '../../components/CardCar'
import { LoadAnimation } from '../../components/LoadAnimation'
import { CarDTO } from '../../dtos/CarDTO'

import api from '../../services/api'

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'

interface CarProps {
  id: string
  user_id: string
  car: CarDTO
  startFormatted: string
  endFormatted: string
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()

  const navigation = useNavigation()

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/schedules_byuser?user_id=2')
        setCars(response.data)

      } catch (error) {
        console.log(error)

      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  function handleBack() {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          onPress={handleBack}
          color={theme.colors.shape}
        />

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade
        </SubTitle>

      </Header>
      {loading
        ? <LoadAnimation />
        : <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <CardCar data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startFormatted}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endFormatted}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />

        </Content>
      }

    </Container>
  )
}