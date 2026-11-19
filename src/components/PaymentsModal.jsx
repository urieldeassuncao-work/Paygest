
import { useState } from "react";
import { X } from "lucide-react";

function PaymentsModal({ onClose, onSave, initialData }) {

  const isEditing = Boolean(initialData);

  const [form, setForm] = useState(() => ({
    reference: initialData?.reference || "",
    payer: initialData?.payer || "",
    beneficiary: initialData?.beneficiary || "",
    amount: initialData?.amount || "",
    bank: initialData?.bank || "",
    channel: initialData?.channel || "",
    date: initialData?.date || ""
  }));

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Number(form.amount) <= 0) {
      alert("Introduza um valor válido.");
      return;
    }

    const payment = {
      ...initialData,
      ...form,
      id: initialData?.id || Date.now(),
      amount: Number(form.amount),
      currency: initialData?.currency || "AOA",
      status: initialData?.status || "Pendente"
    };

    onSave(payment);
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <div>
            <h2>
              {isEditing ? "Editar Pagamento" : "Novo Pagamento"}
            </h2>

            <p>
              {isEditing
                ? "Atualize os dados do pagamento."
                : "Preencha os dados do pagamento."}
            </p>
          </div>

          <button type="button" onClick={onClose}>
            <X />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <label>Referência</label>
          <input
            name="reference"
            value={form.reference}
            onChange={handleChange}
            required
          />

          <label>Pagador</label>
          <input
            name="payer"
            value={form.payer}
            onChange={handleChange}
            required
          />

          <label>Beneficiário</label>
          <input
            name="beneficiary"
            value={form.beneficiary}
            onChange={handleChange}
            required
          />

          <label>Valor (AOA)</label>
          <input
            type="number"
            name="amount"
            min="0.01"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <label>Banco</label>
          <select
            name="bank"
            value={form.bank}
            onChange={handleChange}
            required
          >
            <option value="">Selecionar banco</option>
            <option value="BAI">BAI</option>
            <option value="BFA">BFA</option>
            <option value="BIC">BIC</option>
            <option value="BCA">BCA</option>
            <option value="BCI">BCI</option>
            <option value="BNA">BNA</option>
          </select>

          <label>Canal de pagamento</label>
          <select
            name="channel"
            value={form.channel}
            onChange={handleChange}
            required
          >
            <option value="">Selecionar canal</option>
            <option value="Transferência">Transferência</option>
            <option value="Multicaixa">Multicaixa</option>
            <option value="POS">POS</option>
            <option value="Internet Banking">Internet Banking</option>
          </select>

          <label>Data do pagamento</label>
          <input
            type="text"
            name="date"
            placeholder="Ex: 16/11/2026 14:30"
            value={form.date}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button type="submit" className="primary-button">
              {isEditing ? "Guardar alterações" : "Registar pagamento"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default PaymentsModal;
