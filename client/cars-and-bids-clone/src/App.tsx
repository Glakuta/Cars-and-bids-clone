import SellCarForm from "./components/Cars/SellCarForm";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <SellCarForm car={{}} onSubmit={() => {}} />
    </div>
  );
}

export default App;
