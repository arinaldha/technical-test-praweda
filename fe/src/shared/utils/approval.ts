export const transformApprovalStatusFormat = (value: number) => {
    switch (value) {
        case 0: return "Draft"
        case 1: return "Approved"   
        case 2: return "Approve in Progress"   
        case 7: return "Unblacklist in Progress"   
        case 8: return "Blacklist in Progress"   
        case 9: return "Blacklisted"   
        default: return '-'
    }
}

export const transformStatusWorkflow = (value: number) => {
    switch (value) {
        case 0: return "Draft"
        case 1: return "Approved"   
        case 2: return "Approve in Progress"   
        case 7: return "Unblacklist in Progress"   
        case 8: return "Blacklist in Progress"   
        case 9: return "Blacklisted"   
        default: return ""
    }
}

export const transfromApprovalActionFormat = (value: string) => {
    switch (value) {
        case "submit-approval":
            return "Submit Request for Approval"    
        case "submit-blacklist":
            return "Submit Request for Blacklist"    
        case "submit-unblacklist":
            return "Submit Request for Unblacklist"    
        case "approve-approval":
            return "Approve for Approval"    
        case "approve-blacklist":
            return "Approve for Blacklist"    
        case "approve-unblacklist":
            return "Approve for Unblacklist"    
        case "reject-approval":
            return "Reject for Appoval"    
        case "reject-blacklist":
            return "Reject for Blacklist"    
        case "reject-unblacklist":
            return "Reject for Unblacklist"    
        default:
            return "-";
    }
}

export const submitApprovalAction = (status: number, sequenceNo: number, action: 'approve' | 'reject' = 'approve') => {
        switch (status) {
        case 0:
            return sequenceNo === 0 ? 'submit-approval' : null
        case 2:
            return action === 'approve' ? 'approve-approval' : 'reject-approval'
        case 1:
            return sequenceNo >= 0 ? 'submit-blacklist' : null
        case 7:
            return action === 'approve' ? 'approve-unblacklist' : 'reject-unblacklist'
        case 8:
            return action === 'approve' ? 'approve-blacklist' : 'reject-blacklist'
        case 9:
            return sequenceNo >= 0 ? 'submit-unblacklist' : null
        default:
            return null
    }
}