export const formatCreditLimit = (value: any) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseCreditLimit = (value: any) => {
    return value.replace(/,/g, "");
};