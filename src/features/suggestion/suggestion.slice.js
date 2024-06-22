import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion = createAsyncThunk(
  'suggestion/fetchSuggestion',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3004/api/suggestion');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data.data; // Assuming the API returns { data: { imageUrl, caption } }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const initialState = {
  suggestion: null,
  loading: false,
  error: true,
};

const suggestionSlice = createSlice({
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear error state on pending
      })
      .addCase(fetchSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestion = action.payload;
        state.error = null; // Clear error state on success
      })
      .addCase(fetchSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error; // Set error state on rejection
      });
  },
});

export default suggestionSlice.reducer;

export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;
