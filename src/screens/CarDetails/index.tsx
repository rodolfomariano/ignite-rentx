import React from 'react'
import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'

import { ImageSlider } from '../../components/ImageSlider'

import speedSvg from '../../assets/speed.svg'
import acceleration from '../../assets/acceleration.svg'
import forceSvg from '../../assets/force.svg'
import gasolineSvg from '../../assets/gasoline.svg'
import exchangeSvg from '../../assets/exchange.svg'
import peopleSvg from '../../assets/people.svg'

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

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => { }} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={['https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png']} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <AccessoriesList>
          <Accessory name="380Km/h" icon={speedSvg} />
          <Accessory name="3.2s" icon={acceleration} />
          <Accessory name="800 HP" icon={forceSvg} />
          <Accessory name="Gasolina" icon={gasolineSvg} />
          <Accessory name="Auto" icon={exchangeSvg} />
          <Accessory name="2 pessoas" icon={peopleSvg} />
        </AccessoriesList>

        <About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et maiores cum soluta distinctio reprehenderit deleniti possimus
          totam saepe veritatis quisquam quod laboriosam cupiditate molestias laudantium quos, blanditiis aperiam rerum nostrum?
        </About>
      </Content>

      <Footer>
        <Button onPress={() => { }} title="Confirmar" />
      </Footer>

    </Container>
  )
}