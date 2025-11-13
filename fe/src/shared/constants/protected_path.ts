



export const authenticatedPaths = [
    // HOME
    "/home",

    // COMPANIES - MASTER MODULE
    "/company",
    "/departments",
    "/company_groups",
    "/branches",
    "/departments",

    // LOCATIONS - MASTER MODULE
    "/cities",
    "/countries",

    "/modules",
    "/number-management",
    "/users",
    "/groups",
    "/modules",
    "/menu",

    "/customers",
    "/customers",
    "/customer-blaclist",
    "/customer-unblacklist",
    "/customer-approval",
    "/entities",
    "/legals",
    "/job-title",
    "/permits",
    "/vendor",

    "/vendor-approval",
    "/vendor-blaclist",
    "/vendor-unblacklist",
    "/vendor-products",
    "/currencies",
    "/banks",
    "/charge-categories",
    "/charge-group",
    "/units",
    "/taxes",
    "/currencies",

    "/"

].flatMap(base => [base, `${base}/*`]);


export const guestPaths = [
    "/auth/login"
];
