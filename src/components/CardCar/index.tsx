import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import GasolineSvg from '../../assets/gasoline.svg'
import { CarDTO } from '../../dtos/CarDTO'

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

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

interface CardCarProps extends RectButtonProps {
  data: CarDTO
}

export function CardCar({ data, ...rest }: CardCarProps) {
  const { brand, name, rent, thumbnail } = data

  const MotorIcon = getAccessoryIcon(data.fuel_type)

  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{rent.period}</Period>
            <Price>{`R$ ${rent.price}`}</Price>
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