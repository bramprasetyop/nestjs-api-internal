export class ReconcileHubsterOrderRequest {
  limit?: number;
  start?: string; //days-1 (daily) or weeks-1 (unprocessed)
  startDate?: string;
  endDate?: string;
  isDummy?: boolean;
  dummyEvents: any[];
}
