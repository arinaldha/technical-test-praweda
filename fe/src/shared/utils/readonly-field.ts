import { ModuleResponse } from "@/models/response/general/module_response";
import { ReadyOnlyFieldProps } from "@/models/utils/general";
import * as _ from "lodash";
import React from "react";

const ReadOnlyFieldValue = async (modules: RequestBody<ModuleResponse[]>) => {
    const readOnlyField: ReadyOnlyFieldProps[] = []
    modules.map((value) => {
        if(value.flag_auto_numbering === "Y"){
            readOnlyField.push({
                moduleName: value.alias_name,
                keyField: value.field_name_code,
                readOnly: true,
                placeholder: "AUTO GENERATE"
            })
        }
    })

    return readOnlyField
}

type Props = {
    moduleName: string,
    readOnlyField: ReadyOnlyFieldProps[]
}

export function UseReadyOnlyField(
    props: Props
){
    const {
        moduleName,
        readOnlyField
    } = props

    const readOnlyFieldModule =  React.useMemo(() => {    
        if(!readOnlyField.length) return null
    
        const readOnly: Record<string, any> = []
        readOnlyField.filter((value) => {
          return value.moduleName === moduleName
        })
    
        readOnlyField.map((field) => {
          readOnly[`${field.keyField}`] = field.placeholder
        })
    
         return readOnly
    }, [moduleName, readOnlyField])  
    
    const handleReadOnlyField = ( value: string) => {
        if(_.isEmpty(value)) return false        
        
        return readOnlyFieldModule && readOnlyFieldModule[value] ? true : false
        }

    const handlePlaceHolderField = ( value: string, defaultValue: string) => {
        if(_.isEmpty(value)) return defaultValue

        return readOnlyFieldModule && readOnlyFieldModule[value] ? readOnlyFieldModule[value] : defaultValue
    }

    return {
        readOnlyFieldModule,
        handleReadOnlyField,
        handlePlaceHolderField
    }
}

export {
    ReadOnlyFieldValue
}