import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenType } from './utils';

const STORAGE_KEY = 'authToken';

export interface AuthStore {
  token: TokenType | null;
  signIn: (token: TokenType) => void;
  signOut: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: null,

  init: async () => {
    try {
      const tokenString = await AsyncStorage.getItem(STORAGE_KEY);
      if (tokenString) {
        set({ token: JSON.parse(tokenString) });
      }
    } catch (error) {
      console.error('Error loading token from AsyncStorage:', error);
    }
  },

  signIn: async (token: TokenType) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(token));
      set({ token: token });
    } catch (error) {
      console.error('Error saving token to AsyncStorage:', error);
    }
  },

  signOut: async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      set({ token: null });
    } catch (error) {
      console.error('Error removing token from AsyncStorage:', error);
    }
  },
}));

export default useAuthStore;