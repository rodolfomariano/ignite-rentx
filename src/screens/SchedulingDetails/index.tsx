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

  const theme = useTheme()

  const navigation = useNavigation()

  const route = useRoute()
  const { car, dates } = route.params as CarParams

  const rentTotal = Number(car.rent.price * dates.length)

  async function handleConfirm() {
    const response = await api.get(`/schedules_bycars/${car.id}`)

    const unavailable_dates = [
      ...response.data.unavailable_dates,
      ...dates
    ]

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates
    })
      // @ts-ignore
      .then(() => navigation.navigate('SchedulingComplete'))
      .catch(() => Alert.alert('Erro ao cadastrar o agendamento'))
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

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand} </Brand>
            <Name>{car.name} </Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{car.rent.price} </Price>
          </Rent>
        </Details>

        <AccessoriesList>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)} />

          ))}
        </AccessoriesList>

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
            <RentalPriceQuota>R$ {car.rent.price} x {dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>

      </Content>

      <Footer>
        <Button onPress={handleConfirm} title="Agendar agora" color={theme.colors.success} />
      </Footer>

    </Container>
  )
}