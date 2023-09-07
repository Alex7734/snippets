import useAuthStore from '@auth/auth-store';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

export default function SignIn() {
  const authContext = useAuthStore();

  if (!authContext) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Loading...</Text>
      </View>
    );
  }

  const newToken = { refresh: '', access: '123' };
  const { signIn } = authContext;

  return (
    <Pressable className="bg-blue-500 p-4 rounded-lg" onPress={() => signIn(newToken)}>
      <Text className="text-white">Sign In</Text>
    </Pressable>
  );
}
