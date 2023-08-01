import { IUser } from '@/types/user.schema'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

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
      storage: createJSONStorage(() => localStorage),
    }
  )
)