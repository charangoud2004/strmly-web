import React from 'react';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white flex justify-around items-center py-3 border-t border-gray-700 z-50">
      <NavItem label="Home" />
      <NavItem label="Shorts" />
      <NavItem label="Add" />
      <NavItem label="Search" />
      <NavItem label="Profile" />
    </div>
  );
};

const NavItem = ({ label }) => (
  <div className="flex flex-col items-center text-xs hover:text-red-500 transition-all cursor-pointer">
    <div className="text-lg">⬤</div> {/* Replace with icon later */}
    {label}
  </div>
);

export default BottomNav;
