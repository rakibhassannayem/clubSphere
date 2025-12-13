import React from 'react';

const ManagerOverview = () => {
  return (
    <div className="bg-base-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-2xl text-secondary font-bold">Manager Overview</h2>
          <p className="text-accent">
            Manage your clubs and track their performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManagerOverview;