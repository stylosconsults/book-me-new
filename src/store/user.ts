import { IUser } from '@/types/user.schema'
import { create } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'

export interface ITokenData {
  token: string;
  expires: number;
}

export interface IUserState {
  user: IUser | undefined,
  accessToken: ITokenData|undefined;
  refreshToken: ITokenData|undefined;
  signIn: (user: IUser, accessToken: ITokenData, refreshToken: ITokenData)  => void;
  logout: ()=>void;
}

const storage: StateStorage = localStorage;

export const useUserStore = create<IUserState>()(
  persist(
    (set) => ({
        user: undefined,
        refreshToken: undefined,
        accessToken: undefined,
        signIn: (user: IUser, accessToken: ITokenData, refreshToken: ITokenData) => set({ accessToken,  refreshToken, user}),
        logout: ()=> set({ user: undefined, accessToken: undefined, refreshToken: undefined }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => storage),
      partialize: (state) => ({ refreshToken: state.refreshToken, accessToken: state.accessToken, user: state.user }),
    }
  )
)