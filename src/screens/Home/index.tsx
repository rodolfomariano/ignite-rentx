import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { StatusBar, StyleSheet, BackHandler } from 'react-native'
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'

import Logo from '../../assets/logo.svg'
import { CardCar } from '../../components/CardCar'
import { LoadAnimation } from '../../components/LoadAnimation'
import { CarDTO } from '../../dtos/CarDTO'
import api from '../../services/api'

import { Ionicons } from '@expo/vector-icons'

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated'

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CardList,
} from './styles'
import theme from '../styles/theme'

export function Home() {
  const navigation = useNavigation()
  const [carList, setCarList] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)

  const positionButtonX = useSharedValue(0)
  const positionButtonY = useSharedValue(0)

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionButtonX.value },
        { translateY: positionButtonY.value },
      ]
    }
  })

  const onGestureButtonEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionButtonX.value
      ctx.positionY = positionButtonY.value
    },
    onActive(event, ctx: any) {
      positionButtonX.value = ctx.positionX + event.translationX
      positionButtonY.value = ctx.positionY + event.translationY
    },
    onEnd() {
      positionButtonX.value = withSpring(0)
      positionButtonY.value = withSpring(0)
    }

  })

  const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => { return true })
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

      <PanGestureHandler
        onGestureEvent={onGestureButtonEvent}
      >
        <Animated.View
          style={[
            myCarsButtonStyle,
            {
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={styles.button}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>

    </Container>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.main,
  }
})