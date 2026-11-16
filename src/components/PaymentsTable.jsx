import { FileText, ChevronDown } from "lucide-react";
import StatusBadge from "./StatusBadge";

function PaymentsTable({payments}){

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
                        <th>Data do Pagamento</th>
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

                            <td>
                                {formatMoney(payment.amount)}
                            </td>

                            <td>{payment.currency}</td>

                            <td>{payment.date}</td>

                            <td>{payment.bank}</td>

                            <td>{payment.channel}</td>

                            <td>
                                <StatusBadge status={payment.status} />
                            </td>

                            <td>
                                <button className="action-button">
                                Acções
                                <ChevronDown size={10} />
                                </button>
                            </td>

                        </tr>

                    ))}

                </tbody>
            </table>
        </div>
    );

}

export default PaymentsTable;