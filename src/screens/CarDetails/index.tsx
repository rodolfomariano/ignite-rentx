import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, Extrapolate, interpolate } from 'react-native-reanimated'

import { Accessory } from '../../components/Accessory'
import { BackButton } from '../../components/BackButton'

import { ImageSlider } from '../../components/ImageSlider'

import { getAccessoryIcon } from '../../utils/getAccessoryIcon'

import {
  Container,
  Header,
  CarImages,
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
  OffLineInfo
} from './styles'
import { Button } from '../../components/Button'
import { CarDTO } from '../../dtos/CarDTO'
import { Car as ModelCar } from '../../database/models/Car'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StatusBar } from 'react-native'
import api from '../../services/api'
import { useNetInfo } from '@react-native-community/netinfo'

interface CarParams {
  car: ModelCar
}

export function CarDetails() {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)

  const netInfo = useNetInfo()
  const navigation = useNavigation()
  const route = useRoute()
  const { car } = route.params as CarParams

  const scrollY = useSharedValue(0)
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 90],
        Extrapolate.CLAMP
      ),
    }
  })

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0]
      )
    }
  })

  function handleScheduling() {
    // @ts-ignore
    navigation.navigate('Scheduling', { car })
  }

  function handleBack() {
    navigation.goBack()
  }

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
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View style={[headerStyleAnimation]}>
        <Header>
          <BackButton onPress={handleBack} />
        </Header>

        <Animated.View style={[sliderCarStyleAnimation]}>
          <CarImages>
            <ImageSlider imagesUrl={
              !!carUpdated.photos
                ? carUpdated.photos
                : [{ id: car.thumbnail, photo: car.thumbnail }]
            } />
          </CarImages>

        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight(),
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netInfo.isConnected === true ? car.price : '---'}</Price>
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

        <About>
          {car.about}
        </About>
      </Animated.ScrollView>

      <Footer>
        <Button
          onPress={handleScheduling}
          title="Escolher períldo do aluguel"
          enabled={netInfo.isConnected === true}
        />

        {
          netInfo.isConnected === false &&
          <OffLineInfo>
            Conecte-se a Internete para ver mais detalhes e agendar!
          </OffLineInfo>
        }
      </Footer>

    </Container>
  )
}