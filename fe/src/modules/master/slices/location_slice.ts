import { CityResponse, CountryResponse } from '@/models/response/master/location_response';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
    countries: CountryResponse[] | null;
    country: CountryResponse | null;
    cities: CityResponse[] | null;
    city: CityResponse | null;
}

const initialState: LocationState = {
    countries: null,
    country: null,
    cities: null,
    city: null,
}

const location = createSlice({
    name: "location",
    initialState,
    reducers: {
        setCountryList(state: any, action: PayloadAction<any>) {
            state.countries = action.payload.data
        },
        setCountryDetail(state: any, action: PayloadAction<any>) {
            state.country = action.payload.data
        },
        setCityList(state: any, action: PayloadAction<any>) {
            state.cities = action.payload.data
        },
        setCityDetail(state: any, action: PayloadAction<any>) {
            state.city = action.payload.data
        },
    },
})

export default location.reducer;
export const {
    setCountryList,
    setCountryDetail,
    setCityList,
    setCityDetail,
} = location.actions;