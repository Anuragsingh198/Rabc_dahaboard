import React from 'react';
import { useStore } from '../store/useStore';
import { Shield } from 'lucide-react';

const Permissions = () => {
  const { permissions } = useStore();

  // Group permissions by module
  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, typeof permissions>);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Permissions Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(groupedPermissions).map(([module, modulePermissions]) => (
          <div key={module} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-indigo-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{module}</h2>
            </div>

            <div className="space-y-4">
              {modulePermissions.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {permission.name}
                    </h3>
                    <p className="text-sm text-gray-500">{permission.description}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked
                      readOnly
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Permissions;