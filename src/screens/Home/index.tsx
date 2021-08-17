import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { StatusBar } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import { CardCar } from '../../components/CardCar'
import { Load } from '../../components/Load'
import { CarDTO } from '../../dtos/CarDTO'
import api from '../../services/api'

import { Ionicons } from '@expo/vector-icons'

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CardList,
  MyCarsButton
} from './styles'
import theme from '../styles/theme'

export function Home() {
  const navigation = useNavigation()
  const [carList, setCarList] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  function handleCarDetails(car: CarDTO) {
    // @ts-ignore
    navigation.navigate('CarDetails', { car })
  }

  function handleOpenMyCars() {
    // @ts-ignore
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars')
        setCarList(response.data)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCars()

  }, [])

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
            {carList.length}
          </TotalCars>
        </HeaderContent>
      </Header>

      {loading
        ? <Load />
        : <CardList
          data={carList}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <CardCar data={item} onPress={() => handleCarDetails(item)} />}
        />
      }

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
        />
      </MyCarsButton>

    </Container>
  )
}