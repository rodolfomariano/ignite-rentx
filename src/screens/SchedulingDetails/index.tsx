import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation, useRoute } from '@react-navigation/native'

import { format } from 'date-fns'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'
import { ImageSlider } from '../../components/ImageSlider'
import { Button } from '../../components/Button'

import { useTheme } from 'styled-components'

import { CarDTO } from '../../dtos/CarDTO'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'


import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  AccessoriesList,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from './styles'
import { useEffect } from 'react'
import { getPlatformDate } from '../../utils/getPlatformDate'
import api from '../../services/api'
import { Alert } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'

interface CarParams {
  car: CarDTO
  dates: string[]
}

interface RentalPeriodProps {
  startFormatted: string
  endFormatted: string
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriodProps>({} as RentalPeriodProps)
  const [loading, setLoading] = useState(false)

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)

  const netInfo = useNetInfo()

  const theme = useTheme()

  const navigation = useNavigation()

  const route = useRoute()
  const { car, dates } = route.params as CarParams

  const rentTotal = Number(car.price * dates.length)

  async function handleConfirm() {
    setLoading(true)

    await api.post('rentals', {
      user_id: 1,
      car_id: car.id,
      start_date: new Date(dates[0]),
      end_date: new Date(dates[dates.length - 1]),
      total: rentTotal
    })
      // @ts-ignore
      .then(() => navigation.navigate('Success', {
        title: 'Carro alugado!',
        description: `Agora voc?? precisa ir\n at?? uma cocession??ria da RENTX\n pegar o seu autom??vel!`,
        goTo: 'Home'
      }))
      .catch(() => {
        Alert.alert('Erro ao cadastrar o agendamento')
        setLoading(false)
      })

  }

  function handleBack() {
    navigation.goBack()
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    })
  }, [])

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`)
      setCarUpdated(response.data)

    }
    if (netInfo.isConnected === true) {
      fetchCarUpdated()
    }

  }, [netInfo.isConnected])

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={
          !!carUpdated.photos
            ? carUpdated.photos
            : [{ id: car.thumbnail, photo: car.thumbnail }]
        } />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand} </Brand>
            <Name>{car.name} </Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{car.price} </Price>
          </Rent>
        </Details>

        {
          carUpdated.accessories &&
          <AccessoriesList>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </AccessoriesList>
        }

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name='calendar'
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right'
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {car.price} x {dates.length} di??rias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button
          onPress={handleConfirm}
          title="Agendar agora"
          color={theme.colors.success}
          enabled={!loading}
          loading={loading}
        />
      </Footer>

    </Container>
  )
}