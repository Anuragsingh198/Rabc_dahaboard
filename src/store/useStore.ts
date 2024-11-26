import { create } from 'zustand';
import { User, Role, Permission } from '../types';

interface Store {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Role) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
}

// Mock initial data
const mockPermissions: Permission[] = [
  { id: '1', name: 'View Users', description: 'Can view users list', module: 'Users' },
  { id: '2', name: 'Create Users', description: 'Can create new users', module: 'Users' },
  { id: '3', name: 'Edit Users', description: 'Can edit existing users', module: 'Users' },
  { id: '4', name: 'Delete Users', description: 'Can delete users', module: 'Users' },
  { id: '5', name: 'View Roles', description: 'Can view roles list', module: 'Roles' },
  { id: '6', name: 'Manage Roles', description: 'Can manage roles', module: 'Roles' },
];

const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: mockPermissions,
  },
  {
    id: '2',
    name: 'User Manager',
    description: 'Can manage users',
    permissions: mockPermissions.filter(p => p.module === 'Users'),
  },
];

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: mockRoles[0],
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

export const useStore = create<Store>((set) => ({
  users: mockUsers,
  roles: mockRoles,
  permissions: mockPermissions,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
  addRole: (role) => set((state) => ({ roles: [...state.roles, role] })),
  updateRole: (id, updatedRole) =>
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === id ? { ...role, ...updatedRole } : role
      ),
    })),
  deleteRole: (id) =>
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    })),
}));