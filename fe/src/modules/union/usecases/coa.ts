import { Dispatch } from "@reduxjs/toolkit"
import { UnionRepository } from "../repositories/uni_repository"
import { SingleResponse } from "@/models/response/basic_response"

export class CoaUseCase {


    static FindCoa = async(coa_module : string) => {
        try {
            const {data} : any =  await UnionRepository.FindCoa(coa_module)
            return data.data

        } catch (error) {
            throw error
        }
    }
}