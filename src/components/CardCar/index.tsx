import React from 'react'

import GasolineSvg from '../../assets/gasoline.svg'

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

interface CardData {
  brand: string
  name: string
  rent: {
    period: string
    price: number
  },
  imageUrl: string
}

interface CardCarProps {
  data: CardData
}

export function CardCar({ data }: CardCarProps) {
  const { brand, name, rent, imageUrl } = data

  return (
    <Container>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{rent.period}</Period>
            <Price>{`R$ ${rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage source={{ uri: `${imageUrl}` }} resizeMode="contain" />
    </Container>
  )
}