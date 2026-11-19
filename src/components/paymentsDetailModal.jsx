
import { X, FileText, CalendarDays, Landmark } from "lucide-react";
import StatusBadge from "./StatusBadge";

function PaymentDetailsModal({ payment, onClose, onEdit }) {

  if (!payment) return null;

  const formatMoney = (amount, currency) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: currency || "AOA",
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="modal-overlay">

      <div className="details-modal">

        <div className="modal-header">

          <div>
            <h2>Detalhes do Pagamento</h2>
            <p>Informações completas da operação.</p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="details-reference">
          <div className="details-icon">
            <FileText size={25} />
          </div>

          <div>
            <small>Referência do pagamento</small>
            <h3>{payment.reference}</h3>
          </div>

          <StatusBadge status={payment.status} />
        </div>

        <div className="details-section">

          <h3>Informações da operação</h3>

          <div className="details-grid">

            <div className="detail-item">
              <small>Pagador</small>
              <strong>{payment.payer}</strong>
            </div>

            <div className="detail-item">
              <small>Beneficiário</small>
              <strong>{payment.beneficiary}</strong>
            </div>

            <div className="detail-item">
              <small>Valor</small>
              <strong>
                {formatMoney(payment.amount, payment.currency)}
              </strong>
            </div>

            <div className="detail-item">
              <small>Moeda</small>
              <strong>{payment.currency}</strong>
            </div>

          </div>

        </div>

        <div className="details-section">

          <h3>Informações bancárias</h3>

          <div className="details-grid">

            <div className="detail-item">
              <small>Banco do pagamento</small>
              <strong className="strongLandMark">
                <Landmark size={15} />
                {payment.bank}
              </strong>
            </div>

            <div className="detail-item">
              <small>Canal</small>
              <strong>{payment.channel}</strong>
            </div>

          </div>

        </div>

        <div className="details-section">

          <h3>Data e registo</h3>

          <div className="details-grid">

            <div className="detail-item">
              <small>Data do pagamento</small>
              <strong>
                <CalendarDays size={15} />
                {payment.date}
              </strong>
            </div>

            <div className="detail-item">
              <small>Identificador interno</small>
              <strong>#{payment.id}</strong>
            </div>

          </div>

        </div>

        <div className="details-actions">

          <button
            className="cancel-button"
            onClick={onClose}
          >
            Fechar
          </button>

          <button
            className="primary-button"
            onClick={() => onEdit(payment)}
          >
            Editar pagamento
          </button>

        </div>

      </div>

    </div>
  );
}

export default PaymentDetailsModal;
