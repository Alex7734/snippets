import {Pressable, Text, View} from 'react-native';
import React from 'react';
import useAuthStore from '@auth/auth-store';

export default function Index() {
  const authContext = useAuthStore();

  if (!authContext) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg">Loading...</Text>
      </View>
    );
  }

  const { signOut } = authContext;

  return (
    <Pressable className="bg-blue-500 p-4 rounded-lg" onPress={() => signOut()}>
      <Text className="text-white">Sign Out</Text>
    </Pressable>
  );
}