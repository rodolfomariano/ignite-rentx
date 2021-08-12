import React from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import { CardCar } from '../../components/CardCar'

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CardList
} from './styles'

export function Home() {
  const carDataOne = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120
    },
    imageUrl: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>
            Total: 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <CardList
        data={[1, 2, 3, 4, 5, 6]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <CardCar data={carDataOne} />}
      />

    </Container>
  )
}