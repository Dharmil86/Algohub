import React from "react";

const SortDropdown = ({ sortOption, setSortOption }) => {
  return (
    <div className="flex justify-end mb-4">
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="p-2 border rounded-lg"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        {/* we can add more like difficulty */}
      </select>
    </div>
  );
};

export default SortDropdown;
