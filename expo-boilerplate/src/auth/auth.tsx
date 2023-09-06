import { router, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import {TokenType} from "./utils";
import useAuthStore from './auth-store';
import {View} from "react-native";

function useProtectedRoute(token: TokenType| null): void {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!token && !inAuthGroup) {
      router.replace('/sign-in');
    } else if (token && inAuthGroup) {
      router.replace('/');
    }
  }, [token, segments]);
}

export function Provider(props: { children: React.ReactNode }): JSX.Element {
  const { token, signIn, signOut } = useAuthStore();
  useProtectedRoute(token);

  return (
    <View className="flex-1 justify-center items-center">
      {props.children}
    </View>
  );
}
