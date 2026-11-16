import { useState } from "react";
import { X } from "lucide-react";


function PaymentsModal({ onClose, onSave }) {

  const [form, setForm] = useState({
    payer: "",
    beneficiary: "",
    amount: "",
    bank: "",
    channel: "",
    date: "",
    reference: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (Number(form.amount) <= 0) {
      alert("Introduza um valor válido.");
      return;
    }

    const newPayment = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
      currency: "AOA",
      status: "Pendente"
    };

    onSave(newPayment);
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">
          <h2>Novo Pagamento</h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <label>Referência</label>
          <input
            name="reference"
            value={form.reference}
            onChange={handleChange}
            placeholder="Ex: PGT-2026-0001"
            required
          />

          <label>Pagador</label>
          <input
            name="payer"
            value={form.payer}
            onChange={handleChange}
            placeholder="Nome do pagador"
            required
          />

          <label>Beneficiário</label>
          <input
            name="beneficiary"
            value={form.beneficiary}
            onChange={handleChange}
            placeholder="Nome do beneficiário"
            required
          />

          <label>Valor (AOA)</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <label>Banco do pagador</label>
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
            type="datetime-local"
            name="date"
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
              Registar Pagamento
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

export default PaymentsModal;