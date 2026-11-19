
import { Eye, Pencil, FileText } from "lucide-react";
import StatusBadge from "./StatusBadge";

function PaymentsTable({ payments, onView, onEdit }) {

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("pt-AO").format(amount);
  };

  return (
    <div className="table-container">

      <table>

        <thead>
          <tr>
            <th>Referência</th>
            <th>Pagador</th>
            <th>Beneficiário</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Data</th>
            <th>Banco</th>
            <th>Canal</th>
            <th>Estado</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>

          {payments.map((payment) => (

            <tr key={payment.id}>

              <td>
                <div className="reference">
                  <FileText size={17} />
                  {payment.reference}
                </div>
              </td>

              <td>{payment.payer}</td>
              <td>{payment.beneficiary}</td>

              <td>{formatMoney(payment.amount)}</td>
              <td>{payment.currency}</td>
              <td>{payment.date}</td>
              <td>{payment.bank}</td>
              <td>{payment.channel}</td>

              <td>
                <StatusBadge status={payment.status} />
              </td>

              <td>
                <div className="table-actions">

                  <button
                    title="Ver detalhes"
                    onClick={() => onView(payment)}
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    title="Editar pagamento"
                    onClick={() => onEdit(payment)}
                  >
                    <Pencil size={17} />
                  </button>

                </div>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {payments.length === 0 && (
        <p className="empty-state">
          Nenhum pagamento encontrado.
        </p>
      )}

    </div>
  );
}

export default PaymentsTable;
