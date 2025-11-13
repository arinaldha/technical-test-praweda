// COUNTRY RESPONSE
export interface CountryResponse {
    id: string;
    country_code: string;
    country_name: string;
    phone_code: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string | null;
    deleted_at: Date | null;
    deleted_by: string | null;
}

export interface UpsertCountryResponse {
    country_id: string;
}


// CITY RESPONSE
export interface CityResponse {
    id: string;
    city_code: string;
    city_name: string;
    country_id: string;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string | null;
    deleted_at: Date | null;
    deleted_by: string | null;
}

export interface UpsertCityResponse {
    city_id: string;
}