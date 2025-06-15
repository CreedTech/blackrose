import React from 'react'

export default function StatusFilters({ filterStatus, setFilterStatus }) {
  const statuses = [
    'all',
    'Pending',
    'Processing',
    'Shipped',
    'Delivered',
    'Cancelled',
  ]

  return (
    <>
      <div className="sm:hidden mb-4">
        <label htmlFor="status" className="sr-only">
          Filter orders by status
        </label>
        <select
          id="status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="
            block w-full
            rounded-lg border border-gray-300
            bg-white py-2 px-3
            text-gray-900 shadow-sm
            focus:border-primary focus:ring-1 focus:ring-primary
            transition
          "
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="hidden sm:flex gap-2 mb-6 overflow-x-auto">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`
              inline-block px-4 py-2 rounded-lg capitalize transition whitespace-nowrap
              ${
                filterStatus === s
                  ? 'bg-primary text-light'
                  : 'bg-light hover:bg-gray-800'
              }
            `}
          >
            {s}
          </button>
        ))}
      </div>
    </>
  )
}