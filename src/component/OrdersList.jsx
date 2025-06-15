function OrdersList({ statusFilter }) {
  const allOrders = [
    /* … */
  ];
  const filtered = allOrders.filter((o) =>
    statusFilter === 'all' ? true : o.status === statusFilter
  );

  return (
    <ul>
      {filtered.map((o) => (
        <li key={o.id}>
          {o.id} – {o.status}
        </li>
      ))}
    </ul>
  );
}
