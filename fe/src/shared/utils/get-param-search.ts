import { UseCaseRepositoryRequest } from "@/models/utils/request"
import * as _ from "lodash"

export async function getParamSearch(params: {additionalParam?: Record<string, any>} & Partial<UseCaseRepositoryRequest>) : Promise<string> {    
    let paramQuery = ''
    Object.entries(params).forEach(([key, value], index) => {
        if(key === "additionalParam" && value){
            Object.entries(value).forEach(([keyAddition, valueAdditional], indexAdditional) => {
                if (Object.entries(params).length === 1) {
                    if (!_.isEmpty(valueAdditional)) {
                        paramQuery += `?${keyAddition}=${valueAdditional}`
                    }
                } else {
                    if (typeof valueAdditional !== "undefined" && valueAdditional !== null && valueAdditional !== '') {
                        if (_.isEmpty(paramQuery)) {
                            paramQuery += `?${keyAddition}=${valueAdditional}`
                        } else {
                            paramQuery += `&${keyAddition}=${valueAdditional}`
                        }
                    }
                }
            })
        } else {
            if (Object.entries(params).length === 1) {
                if (!_.isEmpty(value)) {
                    paramQuery += `?${key}=${value}`
                }
            } else {                
                if (typeof value !== "undefined" && value !== null && value !== ''){                    
                    if (_.isEmpty(paramQuery)) {                        
                        paramQuery += `?${key}=${value}`
                    } else {
                        paramQuery += `&${key}=${value}`
                    }
                }
            }
        } 
    })
    return paramQuery
}