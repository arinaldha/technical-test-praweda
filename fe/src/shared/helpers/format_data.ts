import dayjs from "dayjs";

function getFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}

export function handleFormatDate(value: dayjs.Dayjs){
    if(!value) return ""

    let date = value.date()
    let month = value.month().toFixed().length === 1 ?  `0${value.month()+1}` : value.month()+1
    let year = value.year()

    return `${year}-${month}-${date}`
}

export default getFormData