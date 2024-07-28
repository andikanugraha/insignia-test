import { ROOT_BREADCRUMB } from "@/lib/constants";
import { BreadcrumbInterface } from "@/lib/types/breadcrumb";
import { UserInterface } from "@/lib/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
export interface UserState {
  user: UserInterface,
  breadcrumbs: BreadcrumbInterface[]
}

// Define the initial state using that type
const initialState: UserState = {
  user: {} as UserInterface,
  breadcrumbs: [ROOT_BREADCRUMB]
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<UserInterface>) => {
      state.user = action.payload
    },
    setBreadcrumbs: (state: any, action: PayloadAction<BreadcrumbInterface[]>) => {
      state.breadcrumbs = action.payload
    },
    resetBreadcrumbs: (state: any) => {
      state.breadcrumbs = [ROOT_BREADCRUMB]
    },
    pushBreadcrumb: (state: any, action: PayloadAction<BreadcrumbInterface>) => {
      state.breadcrumbs.push(action.payload)
    },

  },
})

// Action creators are generated for each case reducer function
export const { setUser, setBreadcrumbs, resetBreadcrumbs, pushBreadcrumb } = userSlice.actions

export default userSlice.reducer