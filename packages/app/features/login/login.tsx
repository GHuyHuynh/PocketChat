import { pb, currentUser } from '../../pocketbase/pockbase';
import { YStack, Text, Button, Input } from '@my/ui';
import { useState } from 'react';

export function LoginScreen () {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  async function login() {
    await pb.collection("users").authWithPassword(username, password);
  }


  if (currentUser) {
    return (
      <YStack f={1} jc="center" ai="center" bg="$background">
        <Text fow="700" col="$blue10">You are already logged in</Text>
      </YStack>
    )
  }

  async function signup() {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
      };
      const createdUser = await pb.collection("users").create(data);
      await login();
    } catch (e) {
      console.error(e);
    }
  };

  async function signout() {
    pb.authStore.clear();
  };



  return (
    <YStack f={1} jc="center" ai="center" gap="$4" bg="$background" >
      <Input
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none"
        size="$4"
        width="$20"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        size="$4"
        width="$20"
      />

      <YStack gap="$4" marginTop="$10" width="$20">
        <Button
          onPress={() => {
            login();
          }}
          color="white"
          style={{ backgroundColor: 'blue/' }}
        >
          Login
        </Button>
        <Button
          onPress={() => {
            signup();
          }}
          variant="outlined"
        >
          Signup
        </Button>
      </YStack>
    </YStack>
  )

}