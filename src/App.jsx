import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Payments from "./pages/Payments";
import "./styles/global.css";

function App() {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-layout">
        <Header />

        <main className="page-content">
          <Payments />
        </main>
      </div>

    </div>
  );
}

export default App;