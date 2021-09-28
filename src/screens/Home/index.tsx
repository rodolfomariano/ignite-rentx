import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { StatusBar } from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import { useNetInfo } from '@react-native-community/netinfo'

import { synchronize } from '@nozbe/watermelondb/sync'
import { database } from '../../database'
import api from '../../services/api'
import { Car as ModelCar } from '../../database/models/Car'

import Logo from '../../assets/logo.svg'
import { CardCar } from '../../components/CardCar'
import { LoadAnimation } from '../../components/LoadAnimation'
import { CarDTO } from '../../dtos/CarDTO'

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CardList,
} from './styles'

export function Home() {
  const navigation = useNavigation()
  const [carList, setCarList] = useState<ModelCar[]>([])
  const [loading, setLoading] = useState(true)

  const netInfo = useNetInfo()

  function handleCarDetails(car: CarDTO) {
    // @ts-ignore
    navigation.navigate('CarDetails', { car })
  }

  async function offLineSynchronize() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => { // Busca atualizações do backend
        const response = await api
          .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

        const { changes, latestVersion } = response.data

        return {
          changes,
          timestamp: latestVersion
        }
      },
      pushChanges: async ({ changes }) => { // Envia as mudanças para o backend
        const user = changes.users
        await api.post('/users/sync', user).catch(console.log)

        console.log('APP PARA BACKEND');
        console.log(user);

      }
    })
  }

  useEffect(() => {
    let isMounted = true

    async function fetchCars() {

      try {
        const carCollection = database.get<ModelCar>('cars')
        const cars = await carCollection.query().fetch()

        console.log(cars)

        isMounted && setCarList(cars)

      } catch (error) {
        console.log(error)
      } finally {
        isMounted && setLoading(false)
      }
    }

    fetchCars()

    return () => {
      isMounted = false
    }

  }, [])

  useEffect(() => {
    if (netInfo.isConnected === true) {
      offLineSynchronize()
    }

  }, [netInfo.isConnected])

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
            {!loading && `Total de ${carList.length} carros`}

          </TotalCars>
        </HeaderContent>
      </Header>

      {loading
        ? <LoadAnimation />
        : <CardList
          data={carList}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <CardCar data={item} onPress={() => handleCarDetails(item)} />}
        />
      }

    </Container>
  )
}