export const getStatusInfo = (statusCode: StatusCode): StatusInfo => {
    const statusMap: Record<StatusCode, StatusInfo> = {
      0: { label: "Draft", color: "#808080" },
      1: { label: "Final / Approved", color: "#008000" },
      2: { label: "Approval in Progress", color: "#FFA500" },
      7: { label: "Unblacklist in Progress", color: "#1E90FF" },
      8: { label: "Blacklist in Progress", color: "#1E90FF" },
      9: { label: "Blacklisted", color: "#FF0000" },
    };

    return statusMap[statusCode] || { label: "Unknown", color: "#000000" };
};

export type StatusCode = 0 | 1 | 2 | 7 | 8 | 9;

export interface StatusInfo {
  label: string;
  color: string;
}

export function Raise(error: string): never {
  throw new Error(error);
}