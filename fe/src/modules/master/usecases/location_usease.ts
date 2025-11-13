import { FindDataRequest } from "@/models/request/basic_request";
import { UpsertCityRequest, UpsertCountryRequest } from "@/models/request/master/location_request";
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice";
import { setCityDetail, setCityList, setCountryDetail, setCountryList } from "@/modules/master/slices/location_slice";
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification";
import { Dispatch } from "@reduxjs/toolkit";
import { CityResponse, CountryResponse, UpsertCityResponse, UpsertCountryResponse } from "@/models/response/master/location_response";
import { MainRepository } from "@/shared/repositories/main_repository";
import { MasterRepository } from "../repositories/master_repository";
import { GeneralRepository } from "@/modules/general/repositories/general_repository";
import { UnionRepository } from "@/modules/union/repositories/uni_repository";
import { ModuleEnum } from "@/shared/roles/role";

const countryModuleName = 'countries'
const cityModuleName = 'cities'
export class LocationUseCase {
    // COUNTRY UC
    static GetAllCountries = async (
        s: string, p: number, l: number,
        dispatch: Dispatch<any>, phone_code?: string
    ): Promise<CountryResponse[]> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MasterRepository.FindCountries<CountryResponse[]>({ search: s, p, l, phone_code, moduleName: ModuleEnum.CountryModule })
            dispatch(setCountryList(data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static GetCountryDetail = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<CountryResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MasterRepository.FindCountryDetail<CountryResponse>({ id, moduleName: ModuleEnum.CountryModule })


            dispatch(setCountryDetail(data))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static CreateCountry = async (
        request: UpsertCountryRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertCountryResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.CreateMainData<UpsertCountryResponse>({ body: request, moduleName: ModuleEnum.CountryModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static UpdateCountry = async (

        countryId: string,
        request: UpsertCountryRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertCountryResponse> => {
        dispatch(setBtnLoading(true))
        try {

            const { data } = await UnionRepository.UniversalUpdate<UpsertCountryResponse>({ id: countryId, moduleName: ModuleEnum.CountryModule, body: request, pathApi: 'update' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        }
        finally {
            dispatch(setBtnLoading(false))

        }
    }

    static DeleteCountry = async (
        countryId: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.DeleteMainData({ id: countryId, moduleName: ModuleEnum.CountryModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)

            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    // CITY UC
    static GetAllCities = async (
        request: FindDataRequest,
        dispatch: Dispatch<any>
    ): Promise<CityResponse[]> => {
        dispatch(setContentLoading(true))
        const {
            search,
            page,
            limit,
            countryId
        } = request
        try {
            const { data } = await MasterRepository.FindCities<CityResponse[]>({ search: search, p: page, l: limit, country_id: countryId, moduleName: ModuleEnum.CityModule })
            dispatch(setCityList(data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        }
        finally {
            dispatch(setContentLoading(false))

        }
    }

    static GetCityDetail = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<CityResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MasterRepository.FindCityDetail<CityResponse>({ id, moduleName: ModuleEnum.CityModule })
            dispatch(setCityDetail(data))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static CreateCity = async (
        request: UpsertCityRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertCityResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.CreateMainData<UpsertCityResponse>({ body: request, moduleName: ModuleEnum.CityModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    static UpdateCity = async (

        cityId: string,
        request: UpsertCityRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertCityResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UpsertCityResponse>({ id: cityId, moduleName: ModuleEnum.CityModule, body: request, pathApi: 'update' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    static DeleteCity = async (
        cityId: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.DeleteMainData({ id: cityId, moduleName: ModuleEnum.CityModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }
}