
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import paymentsData from "../data/payments";

import SearchFilters from "../components/SearchFilter";
import PaymentsTable from "../components/PaymentsTable";
import PaymentModal from "../components/PaymentsModal";
import PaymentDetailsModal from "../components/paymentsDetailModal";

function Payments() {

  const [payments, setPayments] = useState(paymentsData);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [bank, setBank] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [modalMode, setModalMode] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  // FILTRAGEM
  const filteredPayments = payments.filter((payment) => {

    const searchMatch =
      payment.reference.toLowerCase().includes(search.toLowerCase()) ||
      payment.payer.toLowerCase().includes(search.toLowerCase()) ||
      payment.beneficiary.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      status === "" || payment.status === status;

    const bankMatch =
      bank === "" || payment.bank === bank;

    return searchMatch && statusMatch && bankMatch;
  });

  // PAGINAÇÃO
  const totalPages = Math.ceil(
    filteredPayments.length / itemsPerPage
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentPayments = filteredPayments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, bank, itemsPerPage]);

  // GARANTIR UMA PÁGINA VÁLIDA
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // LIMPAR FILTROS
  function clearFilters() {
    setSearch("");
    setStatus("");
    setBank("");
  }

  // ABRIR REGISTO
  function openCreateModal() {
    setSelectedPayment(null);
    setModalMode("create");
  }

  // ABRIR EDIÇÃO
  function openEditModal(payment) {
    setDetailsOpen(false);
    setSelectedPayment(payment);
    setModalMode("edit");
  }

  // ABRIR DETALHES
  function openDetails(payment) {
    setSelectedPayment(payment);
    setDetailsOpen(true);
  }

  // GUARDAR PAGAMENTO
  function savePayment(payment) {

    if (modalMode === "edit") {

      setPayments((previous) =>
        previous.map((item) =>
          item.id === payment.id ? payment : item
        )
      );

    } else {

      setPayments((previous) => [
        payment,
        ...previous
      ]);

      setCurrentPage(1);
    }

    setModalMode(null);
    setSelectedPayment(null);
  }

  return (
    <section className="payments-page">

      <div className="page-heading">

        <div>
          <h1>Pagamentos</h1>

          <p>
            Consulte, filtre e gerencie todos os pagamentos do sistema.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openCreateModal}
        >
          <Plus size={19} />
          Novo Pagamento
        </button>

      </div>

      {/* FILTROS */}

      <SearchFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        bank={bank}
        setBank={setBank}
        onClear={clearFilters}
      />

      {/* TABELA */}

      <PaymentsTable
        payments={currentPayments}
        onView={openDetails}
        onEdit={openEditModal}
      />

      {/* PAGINAÇÃO */}

      <div className="pagination">

        <div className="pagination-info">

          Mostrando{" "}
          {filteredPayments.length === 0
            ? 0
            : indexOfFirstItem + 1}

          {" "}a{" "}

          {Math.min(indexOfLastItem, filteredPayments.length)}

          {" "}de {filteredPayments.length} pagamentos

        </div>

        <div className="pagination-controls">

          <select
            value={itemsPerPage}
            onChange={(e) =>
              setItemsPerPage(Number(e.target.value))
            }
          >
            <option value={5}>5 por página</option>
            <option value={10}>10 por página</option>
            <option value={20}>20 por página</option>
            <option value={50}>50 por página</option>
          </select>

          <button
            disabled={currentPage <= 1}
            onClick={() =>
              setCurrentPage((page) => page - 1)
            }
          >
            Anterior
          </button>

          <span>
            Página {totalPages === 0 ? 0 : currentPage} de {totalPages}
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() =>
              setCurrentPage((page) => page + 1)
            }
          >
            Seguinte
          </button>

        </div>

      </div>

      {/* MODAL DE REGISTO / EDIÇÃO */}

      {modalMode && (
        <PaymentModal
          key={selectedPayment?.id || "new"}
          initialData={selectedPayment}
          onClose={() => {
            setModalMode(null);
            setSelectedPayment(null);
          }}
          onSave={savePayment}
        />
      )}

      {/* MODAL DE DETALHES */}

      {detailsOpen && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setDetailsOpen(false)}
          onEdit={openEditModal}
        />
      )}

    </section>
  );
}

export default Payments;
