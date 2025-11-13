import { jwtDecode } from "jwt-decode"


const decodeToken = async (val: string) => {
    try {
        const access_token = val.toString()

        return jwtDecode(access_token);
    } catch (error) {
        throw error

    }
}
export default decodeToken