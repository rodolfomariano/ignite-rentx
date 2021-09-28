import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { useNetInfo } from '@react-native-community/netinfo'

import { Car as ModelCar } from '../../database/models/Car'
import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from './styles'


interface CardCarProps extends RectButtonProps {
  data: ModelCar
}

export function CardCar({ data, ...rest }: CardCarProps) {
  const { brand, name, period, price, thumbnail } = data

  const MotorIcon = getAccessoryIcon(data.fuel_type)
  const netInfo = useNetInfo()

  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>{`R$ ${netInfo.isConnected === true ? price : '---'}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: `${thumbnail}` }} resizeMode="contain" />
    </Container>
  )
}