import cookies from "js-cookie"
import { aesDecrypter, aesEncrypter } from "../helpers/aes_enc"
import { enc } from "crypto-js"
import { jwtDecode } from "jwt-decode"
import * as _ from "lodash"

export enum ModuleEnum {
    AutoNumberingModule = "AutoNumberingModule",
    AccountModule = "AccountModule",
    CompanyPositionModule = "CompanyPositionModule",
    CountryModule = "CountryModule",
    DepartementModule = "DepartementModule",
    EmployeeModule = "EmployeeModule",
    GroupModule = "GroupModule",
    MenuModule = "MenuModule",
    BranchModule = "BranchModule",
    CityModule = "CityModule",
    CompanyModule = "CompanyModule",
    CompanyGroupModule = "CompanyGroupModule",
    PermissionModule = "PermissionModule",
    UtilityModule = "UtilityModule",
    UserModule = "UserModule",
    CustomerModule = "CustomerModule",
    BusinessEntityModule = "BusinessEntityModule",
    BusinessPermitModule = "BusinessPermitModule",
    LegalDocumentModule = "LegalDocumentModule",
    JobTitleModule = "JobTitleModule",
    VendorModule = "VendorModule",
    BankModule = "BankModule",
    CurrencyModule = "CurrencyModule",
    VendorProductModule = "VendorProductModule",
    ChargeCategoryModule = "ChargeCategoryModule",
    ChargeGroupModule = "ChargeGroupModule",
    ChargeModule = "ChargeModule",
    UnitModule = "UnitModule",
    TaxModule = "TaxModule",
    PeriodMaintenanceModule = "PeriodMaintenanceModule",
    CategoryServiceModule = "CategoryModule",
    ServerStorageModule = "ServerStorageModule",
    ServerLicenseModule = "ServerLicenseModule",
    ServerRamModule = "ServerRamModule",
    ServerCPUModule = "ServerCpuModule",
    ServerPublishModule = "ServerPublishModule",
    ServerBandwidthModule = "ServerBandwidthModule",
    ServerStatusModule = "ServerStatusModule",
    ServerLocationModule = "ServerLocationModule",
    ServerReplicationModule = "ServerReplicationModule",
    AccountTypeModule = "AccountTypeModule",
    TransactionGroupModule = "TransactionGroupModule",
    GroupTypeModule = "GroupTypeModule",
    DomainModule = "DomainModule",
    ServiceModule = "ServiceModule",
    PackageTypeModule = "PackageTypeModule",
    GroupMailModule = "GroupMailModule",
    PackageServiceModule = "PackageServiceModule",
    TariffTypeModule = "TariffTypeModule",
    TariffAccountModule = "TariffAccountModule",
    TariffLicenseModule = "TariffLicenseModule",
    TariffServerModule = "TariffServerModule",
    TAccountRequestModule = "TAccountRequestModule",
    ServerModule = "ServerModule",
    TProformasModule = "TProformasModule",
    BillingTypesModule = "BillingTypesModule",
    BillingSubTypesModule = "BillingSubTypesModule",
    ProjectsModule = "ProjectsModule",
    ProjectGroupsModule = "ProjectGroupsModule",
    TBillingsModule = "TBillingsModule",
    TBudgetsModule = "TBudgetsModule",
    PasswordModule = "PasswordModule",
    DocumentTypeModule = "DocumentTypes"
}

export const roleAPI = [
    {
        "moduleName": "PasswordModule",
        "parentPath": "auth",
        "paths": [
            {
                "pathKey": "forgotPassword",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "resetPassword",
                "role": "update",
                "type": "patch"
            },

        ]

    },
    {
        "moduleName": "ChargeModule",
        "parentPath": "charge",
        "paths": [
            {
                "pathKey": "createCharge",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateCharge",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeCharge",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findCharge",
                "role": "view",
                "type": "get"
            }
        ]

    },

    {
        "moduleName": "ServerModule",
        "parentPath": "server",
        "paths": [
            {
                "pathKey": "createServer",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateServer",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeServer",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findServer",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findDashboard",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findListUserByService",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "AccountModule",
        "parentPath": "account",
        "paths": [
            {
                "pathKey": "createAccount",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateAccountt",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeAccount",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findAccount",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findDashboard",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findListUserByService",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findReportCostByService",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "TAccountRequestModule",
        "parentPath": "account-request",
        "paths": [
            {
                "pathKey": "createAccountRequest",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateAccountRequest",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeAccountRequest",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findAccountRequest",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findFollowUpAccountRequest",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "setFollowUpAccountRequest",
                "role": "view",
                "type": "patch"
            },
            {
                "pathKey": "findAccountRequestDetailById",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "cancelAccountRequest",
                "role": "cancel",
                "type": "patch"
            }

        ]
    },
    {
        "moduleName": "TariffServerModule",
        "parentPath": "tariff-server",
        "paths": [
            {
                "pathKey": "createTariffServer",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateTariffServer",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeTariffServer",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findTariffServer",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findTariffServerRequest",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findTariffServerDetail",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "createTariffServerDetail",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateTariffServerDetail",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeTariffServerDetail",
                "role": "delete",
                "type": "delete"
            }
        ]
    },
    {
        "moduleName": "TariffLicenseModule",
        "parentPath": "tariff-license",
        "paths": [
            {
                "pathKey": "createTariffLicense",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateTariffLicense",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeTariffLicense",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findTariffLicense",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findTariffLicenseDetail",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "createTariffLicenseDetail",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateTariffLicenseDetail",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeTariffLicenseDetail",
                "role": "delete",
                "type": "delete"
            }
        ]
    },
    {
        "moduleName": "TariffAccountModule",
        "parentPath": "tariff-account",
        "paths": [
            {
                "pathKey": "createTariffAccount",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateTariffAccount",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeTariffAccount",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findTariffAccount",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findTariffAccountDetail",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "createTariffAccountDetail",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateTariffAccountDetail",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeTariffAccountDetail",
                "role": "delete",
                "type": "delete"
            }
        ]
    },
    {
        "moduleName": "TariffTypeModule",
        "parentPath": "tariff-type",
        "paths": [
            {
                "pathKey": "createTariffType",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateTariffType",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeTariffType",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findTariffType",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "PackageServiceModule",
        "parentPath": "package-type",
        "paths": [
            {
                "pathKey": "createPackageService",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updatePackageService",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removePackageService",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findPackageService",
                "role": "view",
                "type": "get"
            },
            {
                "pathKey": "findListServiceByGroupType",
                "role": "view",
                "type": "get"
            }
        ]
    },

    {
        "moduleName": "GroupMailModule",
        "parentPath": "group-mail",
        "paths": [
            {
                "pathKey": "createGroupMail",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateGroupMail",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeGroupMail",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findGroupMail",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "PackageTypeModule",
        "parentPath": "package-type",
        "paths": [
            {
                "pathKey": "createPackageType",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updatePackageType",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removePackageType",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findPackageType",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "ServiceModule",
        "parentPath": "service",
        "paths": [
            {
                "pathKey": "createService",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateService",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeService",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findService",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "DomainModule",
        "parentPath": "domain",
        "paths": [
            {
                "pathKey": "createDomain",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateDomain",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeDomain",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findDomain",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "GroupTypeModule",
        "parentPath": "group-type",
        "paths": [
            {
                "pathKey": "createGroupType",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateGroupType",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeGroupType",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findGroupType",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "TransactionGroupModule",
        "parentPath": "transaction-group",
        "paths": [
            {
                "pathKey": "createTransactionGroup",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateTransactionGroup",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeTransactionGroup",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findTransactionGroup",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "AccountTypeModule",
        "parentPath": "account-type",
        "paths": [
            {
                "pathKey": "createAccountType",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateAccountType",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeAccountType",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findAccountType",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "ServerReplicationModule",
        "parentPath": "server-replication",
        "paths": [
            {
                "pathKey": "createServerReplication",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateServerReplication",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeServerReplication",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findServerReplication",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "ServerLocationModule",
        "parentPath": "server-location",
        "paths": [
            {
                "pathKey": "createServerLocation",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateServerLocation",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeServerLocation",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findServerLocation",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "ServerStatusModule",
        "parentPath": "server-status",
        "paths": [
            {
                "pathKey": "createServerStatus",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateServerStatus",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeServerStatus",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findServerStatus",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "ServerBandwidthModule",
        "parentPath": "server-bandwidth",
        "paths": [
            {
                "pathKey": "createServerBandwidth",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateServerBandwidth",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeServerBandwidth",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findServerBandwidth",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "ServerPublishModule",
        "parentPath": "server-publish",
        "paths": [
            {
                "pathKey": "createServerPublish",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateServerPublish",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeServerPublish",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findServerPublish",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "ServerCpuModule",
        "parentPath": "server-cpu",
        "paths": [
            {
                "pathKey": "createServerCpu",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateServerCpu",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeServerCpu",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findServerCpu",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        "moduleName": "ServerRamModule",
        "parentPath": "server-ram",
        "paths": [
            {
                "pathKey": "createServerRam",
                "role": "create",
                "type": "post"
            },
            {
                "pathKey": "updateServerRam",
                "role": "update",
                "type": "patch"
            },
            {
                "pathKey": "removeServerRam",
                "role": "delete",
                "type": "delete"
            },
            {
                "pathKey": "findServerRam",
                "role": "view",
                "type": "get"
            }
        ]
    },
    {
        moduleName: "ServerLicenseModule",
        parentPath: "server-license",
        paths: [
            {
                pathKey: "createServerLicense",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateServerLicense",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeServerLicense",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findServerLicense",
                role: "view",
                type: "get"
            },
        ]
    },
    {
        moduleName: "ServerStorageModule",
        parentPath: "server-storage",
        paths: [
            {
                pathKey: "createServerStorage",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateServerStorage",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeServerStorage",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findServerStorage",
                role: "view",
                type: "get"
            },
        ]
    },

    {
        moduleName: "CategoryModule",
        parentPath: "category",
        paths: [
            {
                pathKey: "createCategory",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateCategory",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeCategory",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findCategory",
                role: "view",
                type: "get"
            },
        ]
    },
    {
        moduleName: "PeriodMaintenanceModule",
        parentPath: "period-maintenance",
        paths: [
            {
                pathKey: "createPeriodMaintenance",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updatePeriodMaintenance",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removePeriodMaintenance",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findPeriodMaintenance",
                role: "view",
                type: "get"
            },
            {
                pathKey: "createPeriodMaintenanceDetail",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updatePeriodMaintenanceDetail",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removePeriodMaintenanceDetail",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findPeriodMaintenanceDetail",
                role: "view",
                type: "get"
            }

        ]
    },
    {
        moduleName: "TaxModule",
        parentPath: "tax",
        paths: [
            {
                pathKey: "createTax",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateTax",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeTax",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findTax",
                role: "view",
                type: "get"
            },
        ]
    },
    {
        moduleName: "UnitModule",
        parentPath: "unit",
        paths: [
            {
                pathKey: "createUnit",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateUnit",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeUnit",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findUnit",
                role: "view",
                type: "get"
            },
        ]
    },
    {
        moduleName: "ChargeGroupModule",
        parentPath: "charge",
        paths: [
            {
                pathKey: "createChargeGroup",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateChargeGroup",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeChargeGroup",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findChargeGroup",
                role: "view",
                type: "get"
            },
        ]
    },
    {
        moduleName: "ChargeCategoryModule",
        parentPath: "charge",
        paths: [
            {
                pathKey: "createChargeCategory",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateChargeCategory",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeChargeCategory",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findChargeCategory",
                role: "view",
                type: "get"
            },
        ]
    },
    {
        moduleName: "BankModule",
        parentPath: "bank",
        paths: [
            {
                pathKey: "createBank",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateBank",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeBank",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findBank",
                role: "view",
                type: "get"
            },
            {
                pathKey: "findBankMapping",
                role: "view-bank-mapping",
                type: "get"
            },
            {
                pathKey: "setBankMapping",
                role: "set-bank-mapping",
                type: "post"
            },
            {
                pathKey: "removeBankMapping",
                role: "remove-bank-mapping",
                type: "delete"
            },
            {
                pathKey: "updateBankMapping",
                role: "update-bank-mapping",
                type: "post"
            },
            {
                pathKey: "createBankMapping",
                role: "create-bank-mapping",
                type: "post"
            }

        ]
    },
    {
        moduleName: "CurrencyModule",
        parentPath: "currency",
        paths: [
            {
                pathKey: "createCurrency",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateCurrency",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeCurrency",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findCurrency",
                role: "view",
                type: "get"
            },
            {
                pathKey: "findExchangeRate",
                role: "view-exchange-rate",
                type: "get"
            },
            {
                pathKey: "createExchangeRate",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateExchangeRate",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeExchangeRate",
                role: "delete",
                type: "delete"
            }

        ]
    },
    {
        moduleName: "VendorModule",
        parentPath: "vendor",
        paths: [
            {
                pathKey: "createVendor",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateVendor",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeVendor",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findVendor",
                role: "view",
                type: "get"
            },
            {
                pathKey: "approveVendor",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "findBlacklist",
                role: "view-blacklist",
                type: "get"
            },

            {
                pathKey: "findUnblacklist",
                role: "view-unblacklist",
                type: "get"
            },
            {
                pathKey: "findApproval",
                role: "view-approval",
                type: "get"
            },
        ]
    },
    {
        moduleName: "VendorProductModule",
        parentPath: "vendor",
        paths: [{
            pathKey: "findVendorProduct",
            role: "view",
            type: "get"
        },
        {
            pathKey: "createVendorProduct",
            role: "create",
            type: "post"
        },
        {
            pathKey: "updateVendorProduct",
            role: "update",
            type: "patch"
        },
        {
            pathKey: "removeVendorProduct",
            role: "delete",
            type: "delete"
        }]

    },
    {
        moduleName: "BusinessEntityModule",
        parentPath: "business-entity",
        paths: [
            {
                pathKey: "createBusinessEntry",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateBusinessEntry",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeBusinessEntry",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findBusinessEntry",
                role: "view",
                type: "get"
            },
            {
                pathKey: "approveVendor",
                role: "update",
                type: "patch"
            },
        ]
    }, {
        moduleName: "BusinessPermitModule",
        parentPath: "business-permit",
        paths: [
            {
                pathKey: "createBusinessPermit",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateBusinessPermit",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeBusinessPermit",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findBusinessPermit",
                role: "view",
                type: "get"
            },

        ]
    }, {
        moduleName: "JobTitleModule",
        parentPath: "job-title",
        paths: [
            {
                pathKey: "createJobTitle",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateJobTitle",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeJobTitle",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findJobTitle",
                role: "view",
                type: "get"
            },

        ]
    },
    {
        moduleName: "LegalDocumentModule",
        parentPath: "legal-document",
        paths: [
            {
                pathKey: "createLegalDocument",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateLegalDocument",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeLegalDocument",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findLegalDocument",
                role: "view",
                type: "get"
            },

        ]
    },
    {
        moduleName: "CustomerModule",
        parentPath: "customer",
        paths: [
            {
                pathKey: "createCustomer",
                role: "create",
                type: "post"
            },
            {
                pathKey: "updateCustomer",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "removeCustomer",
                role: "delete",
                type: "delete"
            },
            {
                pathKey: "findCustomer",
                role: "view",
                type: "get"
            },
            {
                pathKey: "approveCustomer",
                role: "update",
                type: "patch"
            },
            {
                pathKey: "findBlacklist",
                role: "view-blacklist",
                type: "get"
            },

            {
                pathKey: "findUnblacklist",
                role: "view-unblacklist",
                type: "get"
            },
            {
                pathKey: "findApproval",
                role: "view-approval",
                type: "get"
            },
        ]
    },
    {
        moduleName: "AutoNumberingModule",
        parentPath: "general",
        paths: [
            {
                pathKey: 'createAutoNumbering',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateAutoNumbering',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'removeAutoNumbering',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findAutoNumbering',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "CompanyPositionModule",
        parentPath: "company-positions",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findCompanyPosition',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "CountryModule",
        parentPath: "countries",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findCountry',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "DepartementModule",
        parentPath: "departements",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findDepartement',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "EmployeeModule",
        parentPath: "employees",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findEmployee',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "GroupModule",
        parentPath: "groups",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findGroup',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "MenuModule",
        parentPath: "menus",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findMenu',
                role: 'view',
                type: 'GET'
            },
            {
                pathKey: 'findGroupMenu',
                role: 'view-menu-group',
                type: 'GET'
            },
            {
                pathKey: 'createOrUpdateMenuGroupAccess',
                role: 'set-menu-group',
                type: 'POST'
            }
        ]
    },
    {
        moduleName: "BranchModule",
        parentPath: "branches",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findBranch',
                role: 'view',
                type: 'GET'
            },

        ]
    },
    {
        moduleName: "CityModule",
        parentPath: "cities",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findCity',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "CompanyModule",
        parentPath: "companies",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findCompany',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "CompanyGroupModule",
        parentPath: "company-groups",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findCompanyGroup',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "PermissionModule",
        parentPath: "permissions",
        paths: [
            {
                pathKey: 'create',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findPermission',
                role: 'view',
                type: 'GET'
            },
            {
                pathKey: 'setGroupPermissionModule',
                role: 'set-group-permission',
                type: 'POST'
            },
            {
                pathKey: 'findGroupPermission',
                role: 'view-group-permission',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "UtilityModule",
        parentPath: "general",
        paths: [
            {
                pathKey: 'createModule',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateModule',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'removeModule',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findModule',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "UserModule",
        parentPath: "users",
        paths: [
            {
                pathKey: 'createUser',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateUser',
                role: 'update',
                type: 'PATCH'
            }, {
                pathKey: 'update',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'remove',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findUser',
                role: 'view',
                type: 'GET'
            },
            {
                pathKey: 'changePassword',
                role: 'change-password',
                type: 'PATCH'
            },
            {
                pathKey: 'forgotPassword',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "BillingTypesModule",
        parentPath: "billing-type",
        paths: [
            {
                pathKey: 'createBillingType',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateBillingType',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'removeBillingType',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findBillingType',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "BillingSubTypesModule",
        parentPath: "billing-sub-type",
        paths: [
            {
                pathKey: 'createBillingSubType',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateBillingSubType',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'removeBillingSubType',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findBillingSubType',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "TProformasModule",
        parentPath: "transaction/proforma",
        paths: [
            {
                pathKey: 'createProforma',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateProforma',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'duplicateProforma',
                role: 'duplicate-proforma',
                type: 'PATCH'
            },
            {
                pathKey: 'generateBillingProforma',
                role: 'create-proforma-billing',
                type: 'POST'
            },
            {
                pathKey: 'findProforma',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "TBillingsModule",
        parentPath: "transaction/billing",
        paths: [
            {
                pathKey: 'createBilling',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'createBillingByProforma',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'sendInvoiceBilling',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateBilling',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'updateBillingDocument',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'findBilling',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "TBudgetsModule",
        parentPath: "transaction/budget",
        paths: [
            {
                pathKey: 'createBudget',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'generateBilling',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateBudget',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'findBudget',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "ProjectGroupsModule",
        parentPath: "project-group",
        paths: [
            {
                pathKey: 'createProjectGroup',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateProjectGroup',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'removeProjectGroup',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findProjectGroup',
                role: 'view',
                type: 'GET'
            }
        ]
    },
    {
        moduleName: "ProjectsModule",
        parentPath: "project",
        paths: [
            {
                pathKey: 'createProject',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateProject',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'removeProject',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findProject',
                role: 'view',
                type: 'GET'
            },
            {
                pathKey: 'findProjectMapping',
                role: 'view',
                type: 'GET'
            }
        ]

    },
    {
        moduleName: "ProjectsModule",
        parentPath: "project",
        paths: [
            {
                pathKey: 'createProject',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateProject',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'removeProject',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findProjectMapping',
                role: 'view',
                type: 'GET'
            },
            {
                pathKey: 'createProjectMapping',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateProjectMapping',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'removeProjectMapping',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findProjectMapping',
                role: 'view',
                type: 'GET'
            }

        ]

    },
    {
        moduleName: "DocumentTypes",
        parentPath: "document-type",
        paths: [
            {
                pathKey: 'createDocumentType',
                role: 'create',
                type: 'POST'
            },
            {
                pathKey: 'updateDocumentType',
                role: 'update',
                type: 'PATCH'
            },
            {
                pathKey: 'removeDocumentType',
                role: 'delete',
                type: 'DELETE'
            },
            {
                pathKey: 'findDocumentType',
                role: 'view',
                type: 'GET'
            }
        ]

    }
]

export const findRoleModule = async (
    moduleName: string,
    path: string
) => {
    const findRole = roleAPI.filter((value) => {
        const findPath = value.paths.filter((pathRole) => {
            return pathRole.pathKey === path
        })

        return value.moduleName === moduleName && findPath.length > 0
    })
    if (!findRole.length) return {
        moduleName: moduleName,
        parentPath: null,
        role: null,
        typePath: null
    }

    const roleApi = findRole[0].paths.find((value) => value.pathKey === path)

    return {
        moduleName: findRole[0].moduleName,
        parentPath: findRole[0].parentPath,
        role: roleApi!.role,
        typePath: roleApi!.type
    }
}

type TokenProps = {
    key_token: string
}


export const getRolePermission = async (
    moduleName: Nullable<string>,
    rule: Nullable<string>
) => {

    const roles = localStorage.getItem('roles')
    const token = cookies.get('access_token')

    if (!roles || !token) {
        return {
            status: false,
            rule: ""
        }
    }

    if (!moduleName || !rule) {
        return {
            status: false,
            rule: ""
        }
    }

    // const descryptRole = JSON.parse(aesDecrypter(roles.toString()))
    // if (!Object.keys(descryptRole).includes(`${moduleName}_${rule}`)) {
    //     return {
    //         status: false,
    //         rule: ""
    //     }
    // }

    // const decodeToken: TokenProps = jwtDecode(token.toString())
    // const encryptRule = aesEncrypter(
    //     JSON.stringify(
    //         {
    //             key_token_login: decodeToken.key_token,
    //             permission_module: {
    //                 module_name: moduleName,
    //                 role_name: rule
    //             }
    //         }
    //     )
    // )

    // return {
    //     status: true,
    //     rule: encryptRule
    // }
}

export const accessPage = (
    moduleName: string
) => {
    const roles = localStorage.getItem('roles')

    let accessPage = {
        moduleName: moduleName,
        access: [""]
    }

    if (!roles) {
        return accessPage
    }
    // const descryptRole = JSON.parse(aesDecrypter(roles.toString()))
    // Object.keys(descryptRole).map(value => {
    //     if (!_.isEmpty(value)) {
    //         const valueModule = value.split('_')
    //         if (valueModule.length) {
    //             if (valueModule[0] === moduleName && accessPage.moduleName) {
    //                 accessPage.access.push(valueModule[1])
    //             }
    //         }
    //     }
    // })

    // return accessPage
}