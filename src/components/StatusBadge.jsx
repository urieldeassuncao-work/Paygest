function StatusBadge({ status }) {
  const statusClasses = {
    "Confirmado": "confirmed",
    "Conciliado": "confirmed",
    "Pendente": "pending",
    "Em Validação": "pending",
    "Em Investigação": "investigation",
    "Rejeitado": "rejected"
  };

  return (
    <span className={`status-badge ${statusClasses[status] || ""}`}>
      {status}
    </span>
  );
}

export default StatusBadge;