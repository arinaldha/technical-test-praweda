import { validate as isValidUUID } from "uuid";

export default function isUUID(value: string) {
    const isValid = isValidUUID(value)
    if (isValid) {
        return "-"
    }

    else return value
}