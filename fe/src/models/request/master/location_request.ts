// COUNTRY REQUEST
export interface UpsertCountryRequest {
    code: Nullable<string>,
    name: Nullable<string>,
    phone_code? :  Nullable<string>,

}

// CITY REQUEST
export interface UpsertCityRequest {
    code: Nullable<string>,
    name: Nullable<string>,
    country_id: Nullable<string>
}