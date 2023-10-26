export class TransferDailyFinanceReportRequest {
  currentDate?: string;
  onlyForOrganizationUserIds?: string[];
  excludeForOrganizationUserIds?: string[];
}

export class TransferDailyFinanceReportUnprocessedRequest {
  startDate?: string;
  endDate?: string;
  onlyForOrganizationUserIds?: string[];
  excludeForOrganizationUserIds?: string[];
}
