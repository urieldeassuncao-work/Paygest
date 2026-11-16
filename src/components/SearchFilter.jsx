import { Search, RefreshCw } from "lucide-react";

function SearchFilter({
  search,
  setSearch,
  status,
  setStatus,
  bank,
  setBank,
  onClear
}){

    return(

        <div className="filters">

            <div className="filter-field">
                <label htmlFor="">Pesquisar</label>

                <div className="filter-input">
                    <Search size={17}/>

                    <input type="text" placeholder="Nome, referência, NIF..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>


            <div className="filter-field">
                <label > Estado </label>

                <select value={status} onChange={(e) => setStatus(e.target.value)}>

                    <option value="">Todos</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Conciliado">Conciliado</option>
                    <option value="Em Validação">Em Validação</option>
                    <option value="Rejeitado">Rejeitado</option>
                </select>
            </div>

            <div className="filter-field">
                <label>Banco</label>

                <select value={bank} onChange={(e) => setBank(e.target.value)}>
                    <option value="">Todos</option>
                    <option value="BAI">BAI</option>
                    <option value="BFA">BFA</option>
                    <option value="BNA">BNA</option>
                    <option value="BCI">BCI</option>
                    <option value="BCA">BCA</option>
                </select>
            </div>

            <button className="clear-button" onClick={onClear}>
                <RefreshCw size={16} />
                Limpar
            </button>

        </div>
    );
}

export default SearchFilter;