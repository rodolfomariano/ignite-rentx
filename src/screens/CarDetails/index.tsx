import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'

import { ImageSlider } from '../../components/ImageSlider'

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
  About,
  Footer,
} from './styles'
import { Button } from '../../components/Button'
import { CarDTO } from '../../dtos/CarDTO'

interface CarParams {
  car: CarDTO
}

export function CarDetails() {
  const navigation = useNavigation()
  const route = useRoute()

  const { car } = route.params as CarParams

  function handleScheduling() {
    // @ts-ignore
    navigation.navigate('Scheduling', { car })
  }

  function handleBack() {
    navigation.goBack()
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={[car.photos[0]]} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <AccessoriesList>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </AccessoriesList>

        <About>
          {car.about}
        </About>
      </Content>

      <Footer>
        <Button
          onPress={handleScheduling}
          title="Escolher períldo do aluguel"
        />
      </Footer>

    </Container>
  )
}