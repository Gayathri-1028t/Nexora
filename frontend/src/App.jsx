import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <Navbar />

        <Dashboard />
      </div>
    </div>
  );
}

export default App;
