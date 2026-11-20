
import { useState } from "react";
import * as XLSX from "xlsx";

function ExcellReader({ onImport }) {

  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

      const reader = await file.arrayBuffer();

      const workbook = XLSX.read(reader, {
        type: "array"
      });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        defval: ""
      });

      setData(parsedData);
      setFileName(file.name);

    } catch (error) {

      console.error("Erro ao ler Excel:", error);

      alert("Não foi possível ler o ficheiro.");

    }

  };

  function handleImport() {

    if (data.length === 0) {
      alert("Nenhum registo encontrado.");
      return;
    }

    onImport(data);

    setData([]);
    setFileName("");
  }

  return (

    <div className="exportXls">

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
      />

      {fileName && (
        <p>Ficheiro selecionado: {fileName}</p>
      )}

      {data.length > 0 && (

        <div>

          <h3>Pré-visualização dos dados</h3>

          <div className="table-container">

            <table className="table">

              <thead>
                <tr>

                  {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}

                </tr>
              </thead>

              <tbody>

                {data.map((row, index) => (

                  <tr key={index}>

                    {Object.keys(data[0]).map((key) => (
                      <td key={key}>{String(row[key] ?? "")}</td>
                    ))}

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          <button
            type="button"
            className="primary-button"
            onClick={handleImport}
          >
            Confirmar importação ({data.length})
          </button>

        </div>

      )}

    </div>

  );
}

export default ExcellReader;
