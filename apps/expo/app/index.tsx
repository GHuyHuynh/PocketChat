import { HomeScreen } from 'app/features/home/screen'
import { Stack } from 'expo-router'
import { LoginScreen } from 'app/features/login/login'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Home',
        }}
      />
      <LoginScreen />
    </>
  )
}
