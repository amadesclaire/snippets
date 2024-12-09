/*
 * Map based access control
 *
 * more suited if you anticipate:
 * - Adding resource-specific rules.
 * - Supporting dynamic or hierarchical roles.
 * - Needing more complex permission logic (e.g., wildcards, conditions)
 * - Needing to store additional metadata with permissions.
 *
 */
type Resource = string;
type Permission = "view" | "create" | "update" | "delete";
type Role = "ADMIN" | "MODERATOR" | "USER";
type RolePermission = Map<Permission, Resource[]>;
type Permissions = Map<Role, RolePermission>;

const ADMIN_PERMISSIONS: RolePermission = new Map([
  ["view", ["comments"]],
  ["create", ["comments"]],
  ["update", ["comments"]],
  ["delete", ["comments"]],
]);
const MODERATOR_PERMISSIONS: RolePermission = new Map([
  ["view", ["comments"]],
  ["update", ["comments"]],
  ["create", ["comments"]],
]);
const USER_PERMISSIONS: RolePermission = new Map([
  ["view", ["comments"]],
  ["create", ["comments"]],
]);

const PERMISSIONS: Permissions = new Map([
  ["ADMIN", ADMIN_PERMISSIONS],
  ["MODERATOR", MODERATOR_PERMISSIONS],
  ["USER", USER_PERMISSIONS],
]);

type USER = {
  id: string; // uuidv4
  role: Role;
};

export class RBAC {
  private PERMISSIONS: Permissions;

  constructor(permissions: Permissions) {
    this.PERMISSIONS = permissions;
  }
  /**
   * Evaluates if a user has permission to perform an action on a resource.
   * @param user
   * @param permission
   * @param resource
   * @returns
   */
  can(user: USER, permission: Permission, resource: Resource): boolean {
    const userPermissions = this.PERMISSIONS.get(user.role);
    if (!userPermissions) return false;
    const allowedResources = userPermissions.get(permission);
    if (!allowedResources) return false;
    return allowedResources.includes(resource);
  }
}

const rbac = new RBAC(PERMISSIONS);
const user: USER = { id: "789", role: "USER" };
console.log(rbac.can(user, "view", "comments")); // true
console.log(rbac.can(user, "delete", "comments")); // false

/*
 * Simple Role based access control
 *
 * more suited if you anticipate:
 * - A fixed set of permissions.
 * - A small number of roles.
 * - A simple permission logic (e.g., no wildcards, conditions)
 *
 */

type Permission2 =
  | "view:comments"
  | "create:comments"
  | "update:comments"
  | "delete:comments";
type Role2 = "ADMIN" | "MODERATOR" | "USER";

const ROLES: Record<Role2, Permission2[]> = {
  ADMIN: [
    "view:comments",
    "create:comments",
    "update:comments",
    "delete:comments",
  ],
  MODERATOR: ["view:comments", "update:comments", "create:comments"],
  USER: ["view:comments", "create:comments"],
} as const;

function can(role: Role2, permission: Permission2): boolean {
  return ROLES[role].includes(permission);
}

console.log(can("USER", "view:comments")); // true
console.log(can("USER", "delete:comments")); // false
