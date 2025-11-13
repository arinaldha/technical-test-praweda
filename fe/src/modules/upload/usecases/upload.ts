import { Dispatch } from "@reduxjs/toolkit"
import uploadFileRepository from "../action/upload"
import { set } from "lodash"
import { setImageUrl } from "@/redux/basic_slice"
import { UploadFile } from "antd"
import { useAppDispatch } from "@/redux/store"
import { UploadFileResponse } from "@/models/response/basic_response"


export default async function uploadFile(file: object, dispatch: Dispatch<any>) {
    try {
        const { data } = await uploadFileRepository(file)
        const response = data.data as UploadFileResponse
        dispatch(setImageUrl(response))
        return data.data

    } catch (error) {
        throw error
    }
}