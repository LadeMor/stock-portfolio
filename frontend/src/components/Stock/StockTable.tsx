import { useQuery } from "@tanstack/react-query";
import { getMyStocks } from "../../lib/api/stock";
import { useAuth } from "../../providers/useAuth";

export function StockTable() {
    const { token } = useAuth()

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['stocks'],
        queryFn: () => getMyStocks(token!),
        enabled: Boolean(token),
    })

    const isTableLoading = Boolean(token) && isPending;

    if (isTableLoading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    const isTableError = Boolean(token) && isError;

    if (isTableError) {
        return (
            <div>
                <h1>Error loading table {error.message}</h1>
            </div>
        );
    }

    if (!data) return <h1>Something went wrong</h1>

    return (
        <div>
            {
                data.stocks.length < 0
                    ?
                    <h1>You don`t have any stock</h1>
                    :
                    <table className="table-auto">
                        <thead>
                            <tr className="text-sm font-medium text-gray-800 [&>th]:px-4 [&>th]:py-3 [&>th]:text-left [&>th]:border">
                                <th>Stock</th>
                                <th>Quantity</th>
                                <th>Purchase price</th>
                                <th>Current price</th>
                                <th>Current value</th>
                                <th>Profit/Loss</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.stocks.map(stock => {
                                    const { ticker, quantity, purchasePrice } = stock;

                                    return (
                                        <tr className="[&>td]:px-4 [&>td]:py-3 [&>td]:text-left [&>td]:border odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                                            <td>{ticker}</td>
                                            <td>{quantity}</td>
                                            <td>${purchasePrice}</td>
                                            <td>$195</td>
                                            <td>$975</td>
                                            <td>+$75</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    );
}