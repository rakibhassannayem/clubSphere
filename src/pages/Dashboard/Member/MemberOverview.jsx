import React from "react";

const MemberOverview = () => {
  return (
    <div className="bg-base-200 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-2xl text-secondary font-bold">
            Welcome back, Club!
          </h2>
          <p className="text-accent">
            Here's what's happening with your clubs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberOverview;
