import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';

const Roles = () => {
  const { roles, deleteRole } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Roles Management</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Role</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                <p className="text-sm text-gray-500">{role.description}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-indigo-600 hover:text-indigo-900">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteRole(role.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission) => (
                  <span
                    key={permission.id}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                  >
                    {permission.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roles;