import { StockTable } from "./Stock/StockTable";
import { useNavigate } from '@tanstack/react-router'


export function DashboardPage() {
  const navigate = useNavigate();

  const onAddStockClick = () => {
    navigate({
      to: '/add-stock',
    })
  }

  return (
    <section className="p-5">

      <StockTable />

      <button onClick={onAddStockClick} className="absolute bottom-10 right-10 bg-sky-400 text-white p-5 rounded-sm cursor-pointer hover:bg-sky-700">Add Stock</button>
    </section>
  );
}
