// Permission System - Inspired by https://github.com/WebDevSimplified/permission-system

// Data Types
type Comment = {
  id: string;
  body: string;
  authorId: string;
  createdAt: Date;
};

type Todo = {
  id: string;
  title: string;
  userId: string;
  completed: boolean;
  invitedUsers: string[];
};

type Role = "ADMIN" | "MODERATOR" | "USER";

type User = {
  id: string;
  roles: Role[];
  blockedBy: string[];
};

// Permission Check Type
type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]["dataType"]) => boolean);

// Roles with Permissions Type
type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Key>;
    }>;
  }>;
};

// Permissions Definition
type Permissions = {
  comments: {
    dataType: Comment;
    action: "view" | "create" | "update";
  };
  todos: {
    dataType: Todo;
    action: "view" | "create" | "update" | "delete";
  };
};

// Role Definitions
const ROLES = {
  ADMIN: {
    comments: {
      view: true,
      create: true,
      update: true,
    },
    todos: {
      view: true,
      create: true,
      update: true,
      delete: true,
    },
  },
  MODERATOR: {
    comments: {
      view: true,
      create: true,
      update: true,
    },
    todos: {
      view: true,
      create: true,
      update: true,
      delete: (user, todo) => todo.completed, // Moderators can delete only completed todos
    },
  },
  USER: {
    comments: {
      view: (user, comment) => !user.blockedBy.includes(comment.authorId),
      create: true,
      update: (user, comment) => comment.authorId === user.id,
    },
    todos: {
      view: (user, todo) => !user.blockedBy.includes(todo.userId),
      create: true,
      update: (user, todo) =>
        todo.userId === user.id || todo.invitedUsers.includes(user.id),
      delete: (user, todo) =>
        (todo.userId === user.id || todo.invitedUsers.includes(user.id)) &&
        todo.completed, // Users can delete their own completed todos or those they're invited to
    },
  },
} as const satisfies RolesWithPermissions;

// Permission Check Function
export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: Permissions[Resource]["dataType"]
): boolean {
  return user.roles.some((role) => {
    const rolePermissions = (ROLES as RolesWithPermissions)[role][resource];
    if (!rolePermissions) return false;

    const permission = rolePermissions[action];
    if (permission == null) return false;

    if (typeof permission === "boolean") return permission;
    return data != null && permission(user, data);
  });
}

// USAGE EXAMPLES
const user: User = { id: "1", roles: ["USER"], blockedBy: ["2"] };

const todo: Todo = {
  id: "3",
  title: "Test Todo",
  userId: "1",
  completed: false,
  invitedUsers: [],
};

// Example permission checks
console.log(hasPermission(user, "comments", "create")); // Can the user create a comment?
console.log(hasPermission(user, "todos", "view", todo)); // Can the user view this specific todo?
console.log(hasPermission(user, "todos", "view")); // Can the user view todos in general?
