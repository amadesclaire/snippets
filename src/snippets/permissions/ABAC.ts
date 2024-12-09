type Attributes = Record<string, any>; // Generic key-value pair for attributes
type Action = "view" | "create" | "update" | "delete"; // Allowed actions
type Resource = string; // Resource identifier

interface AccessRequest {
  subject: Attributes; // Attributes of the user
  resource: Attributes; // Attributes of the resource
  action: Action; // Requested action
  context?: Attributes; // Additional context (e.g., time, location)
}

type Policy = (request: AccessRequest) => boolean;

export class ABAC {
  private policies: Policy[];

  constructor() {
    this.policies = [];
  }

  addPolicy(policy: Policy): void {
    this.policies.push(policy);
  }

  canAccess(request: AccessRequest): boolean {
    return this.policies.some((policy) => policy(request));
  }
}

const isAdminPolicy: Policy = (request) => request.subject.role === "ADMIN";

const isResourceOwnerPolicy: Policy = (request) =>
  request.resource.ownerId === request.subject.userId;

const isModeratorForCommentsPolicy: Policy = (request) =>
  request.subject.role === "MODERATOR" &&
  request.resource.type === "comment" &&
  ["view", "update"].includes(request.action);

const isBusinessHoursPolicy: Policy = (request) => {
  const currentHour = new Date().getHours();
  return currentHour >= 9 && currentHour <= 17; // Access allowed only during business hours
};

const abac = new ABAC();

// Add policies
abac.addPolicy(isAdminPolicy);
abac.addPolicy(isResourceOwnerPolicy);
abac.addPolicy(isModeratorForCommentsPolicy);
abac.addPolicy(isBusinessHoursPolicy);

const accessRequest1: AccessRequest = {
  subject: { userId: 1, role: "ADMIN" },
  resource: { type: "comment", ownerId: 2 },
  action: "delete",
};

console.log(abac.canAccess(accessRequest1)); // true (Admin can access all)

const accessRequest2: AccessRequest = {
  subject: { userId: 2, role: "USER" },
  resource: { type: "comment", ownerId: 2 },
  action: "update",
};

console.log(abac.canAccess(accessRequest2)); // true (User is the owner of the comment)

const accessRequest3: AccessRequest = {
  subject: { userId: 3, role: "MODERATOR" },
  resource: { type: "comment", ownerId: 2 },
  action: "delete",
};

console.log(abac.canAccess(accessRequest3)); // false (Moderator cannot delete comments)

const and =
  (...policies: Policy[]): Policy =>
  (request) =>
    policies.every((policy) => policy(request));

const or =
  (...policies: Policy[]): Policy =>
  (request) =>
    policies.some((policy) => policy(request));

// Composed policy
const complexPolicy = and(
  isBusinessHoursPolicy,
  or(isAdminPolicy, isResourceOwnerPolicy)
);
abac.addPolicy(complexPolicy);
