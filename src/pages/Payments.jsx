import { useState } from "react";

import { Plus } from "lucide-react";

import paymentsData from "../data/payments";

import SearchFilter from "../components/SearchFilter";
import PaymentsTable from "../components/PaymentsTable";
import PaymentModal from "../components/PaymentsModal";



function Payments(){


    const [payments, setPayments] = useState(paymentsData);


    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [bank, setBank] = useState("");
    
    const [modalOpen, setModalOpen] = useState("");


    const filteredPayments = payments.filter((payment) => {
        const searchMatch = payment.reference.toLowerCase().includes(search.toLowerCase()) || payment.payer.toLowerCase().includes(search.toLowerCase()) || payment.beneficiary.toLowerCase().includes(search.toLowerCase());

        const statusMatch = status === "" || payment.status === status;

        const bankMatch = bank === "" || payment.bank === bank;

        return searchMatch && statusMatch && bankMatch;
    });

    function clearFilters(){

        setSearch("");
        setStatus("");
        setBank("");
    }

    function addPayment(newPayment){
        setPayments((previousPayments)=> [
            newPayment,
            ...previousPayments
        ]);

        setModalOpen(false);
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
                onClick={() => setModalOpen(true)}
                >
                <Plus size={10} />
                Novo Pagamento
                </button>

            </div>

            <SearchFilter
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                bank={bank}
                setBank={setBank}
                onClear={clearFilters}
            />

            <PaymentsTable payments={filteredPayments} />

            {modalOpen && (
                <PaymentModal
                onClose={() => setModalOpen(false)}
                onSave={addPayment}
                />
            )}

        </section>
    );
}

export default Payments;