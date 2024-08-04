import PocketBase from "pocketbase";
import { create } from 'zustand';

interface AuthState {
  currentUser: any;
  setCurrentUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));


export const pb = new PocketBase(' http://172.105.15.81:8080');

const setCurrentUser = useAuthStore.getState().setCurrentUser;
setCurrentUser(pb.authStore.model);

pb.authStore.onChange((auth) => {
  console.log('authStore changed', auth);
  setCurrentUser(pb.authStore.model);
});

export const currentUser = useAuthStore.getState().currentUser;