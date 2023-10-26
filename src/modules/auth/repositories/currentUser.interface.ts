export interface ICurrentUserArgs {
  id: string;
  roles: [string];
  permissions: [string];
  businessPermissions: [string];
  outletPermissions: [string];
  organizationLevel: number;
  businessOutletIds: [string];
  organizationId: string;
  businessIds: [string];
}
