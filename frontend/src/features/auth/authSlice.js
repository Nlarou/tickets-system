import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";

// Get user data from localStorage
const user = JSON.parse(localStorage.getItem("user"));
const role = JSON.parse(localStorage.getItem("role"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  role: role ? role : "regular",
  staffMembers: [],
};

//Register new user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//get role of user
export const getRole = createAsyncThunk("auth/getRole", async (_, thunkAPI) => {
  try {
    //get the token from the auth state for the protected route
    const token = thunkAPI.getState().auth.user.token;
    return await authService.getRole(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
});
//set role of user
export const setRole = createAsyncThunk(
  "auth/setRole",
  async (info, thunkAPI) => {
    try {
      //get the token from the auth state for the protected route
      const token = thunkAPI.getState().auth.user.token;
      return await authService.setRole(info, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get role of user
export const getStaffMembers = createAsyncThunk(
  "auth/getStaffMembers",
  async (_, thunkAPI) => {
    try {
      //get the token from the auth state for the protected route
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getStaffMembers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//logout user

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(getRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.role = action.payload;
      })
      .addCase(getRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(setRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStaffMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStaffMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.staffMembers = action.payload;
      })
      .addCase(getStaffMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
