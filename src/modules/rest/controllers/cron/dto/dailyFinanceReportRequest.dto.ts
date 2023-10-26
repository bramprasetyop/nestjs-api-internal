export class DailyFinanceReportRequest {
  currentDate?: string;
  onlyForOrganizationUserIds?: string[];
  excludeForOrganizationUserIds?: string[];
}

export class DailyFinanceReportUnprocessedRequest {
  startDate?: string;
  endDate?: string;
  onlyForOrganizationUserIds?: string[];
  excludeForOrganizationUserIds?: string[];
}
