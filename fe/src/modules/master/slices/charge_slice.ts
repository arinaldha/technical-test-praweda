import { BranchApprovalResponse } from "@/models/response/master/branch_response";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AnyObject } from "antd/es/_util/type";


export interface ChargeCategoryResponse {
    id?: Nullable<string>
    charge_group_id: Nullable<string>
    charge_category_code: Nullable<string>
    charge_category_name: Nullable<string>
    coda_service_code: Nullable<string>
    product_service_flag: Nullable<string>
    charge: AnyObject[]
    charge_group: ChargeGroup
}


export interface Unit {
    unit_code: string
    unit_name: string
}




export type ChargeGroupResponse = {
    id: Nullable<string>;
    company_id: Nullable<string>;
    charge_group_code: Nullable<string>;
    charge_group_name: Nullable<string>;
    company: {
        company_code: Nullable<string>;
        company_name: Nullable<string>;
    }
}

export type ChargeGroup = {
    charge_group_code: string
    charge_group_name: string
}

export interface UnitResponse {
    id: string
    unit_code: string
    unit_name: string
    product_service_flag: string
}


interface InitialStateProps {
    listChargeCategory: ChargeCategoryResponse[]
    listChargeGroup: ChargeGroupResponse[],
    chargeCategory: ChargeCategoryResponse | null,
    chargeGroup: ChargeGroupResponse | null;
    listUnit: UnitResponse[];
    unit: UnitResponse | null
}

const initialState: InitialStateProps = {
    listChargeCategory: [],
    listChargeGroup: [],
    chargeCategory: null,
    chargeGroup: null,
    listUnit: [],
    unit: null

}

const charge = createSlice({
    name: 'charge',
    initialState,
    reducers: {
        setChargeCategoryList(state: {
            listChargeCategory: ChargeCategoryResponse[]
        }, action: PayloadAction<ChargeCategoryResponse[]>) {
            state.listChargeCategory = action.payload
        },
        setChargeCategoryDetail(state: {
            chargeCategory: Nullable<ChargeCategoryResponse>
        }, action: PayloadAction<ChargeCategoryResponse>) {
            state.chargeCategory = action.payload
        },
        setChargeGroupList(state: {
            listChargeGroup: ChargeGroupResponse[]
        }, action: PayloadAction<ChargeGroupResponse[]>) {
            state.listChargeGroup = action.payload
        },
        setChargeGroupDetail(state: {
            chargeGroup: Nullable<ChargeGroupResponse>
        }, action: PayloadAction<ChargeGroupResponse>) {
            state.chargeGroup = action.payload
        },
        setUnitList(state: {
            listUnit: UnitResponse[]
        }, action: PayloadAction<UnitResponse[]>) {
            state.listUnit = action.payload
        },
        setUnitDetail(state: {
            unit: Nullable<UnitResponse>
        }, action: PayloadAction<UnitResponse>) {
            state.unit = action.payload
        }
    }
});


export const {
    setChargeCategoryList,
    setChargeGroupList,
    setChargeCategoryDetail,
    setChargeGroupDetail,
    setUnitList,
    setUnitDetail
} = charge.actions

export default charge.reducer