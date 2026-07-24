import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteStock, getMyStocks } from "../../lib/api/stock";
import { useAuth } from "../../providers/useAuth";
import { useState } from "react";

type StockToDelete = {
    id: string,
    ticker: string
}

export function StockTable() {
    const { token } = useAuth();
    const queryClient = useQueryClient();

    const [open, setOpen] = useState<boolean>(false);
    const [selectedForDeleteStock, setSelectedForDeleteStock] = useState<StockToDelete>({
        id: '',
        ticker: ''
    })

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['stocks'],
        queryFn: () => getMyStocks(token!),
        enabled: Boolean(token),
    })

    const { mutate } = useMutation({
        mutationFn: (stockId: string) => deleteStock(stockId, token!),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['stocks'],
            })
        }
    })

    const onStockDelete = (stockId: string) => {
        mutate(stockId);
    }

    const openModal = () => {
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
        setSelectedForDeleteStock({
            id: '',
            ticker: ''
        })
    }

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
                data.stocks.length === 0
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
                                    const { id, ticker, quantity, purchasePrice } = stock;

                                    return (
                                        <tr className="[&>td]:px-4 [&>td]:py-3 [&>td]:text-left [&>td]:border odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                                            <td>{ticker}</td>
                                            <td>{quantity}</td>
                                            <td>${purchasePrice}</td>
                                            <td>$195</td>
                                            <td>$975</td>
                                            <td>+$75</td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        setSelectedForDeleteStock({
                                                            id,
                                                            ticker
                                                        })
                                                        openModal();
                                                    }}
                                                    className="bg-red-500 mt-2 rounded-md text-white p-1 hover:bg-red-800 cursor-pointer">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
            }
            {
                open ?
                    <div
                        className="w-full h-full bg-black absolute top-0 left-0 z-1 opacity-50 flex justify-center items-center"
                        onClick={(event) => {
                            if (event.target === event.currentTarget) {
                                closeModal()
                            }
                        }}>
                        <div className="border rounded-md p-3 z-2 bg-white">
                            <h2>Are you sure you want to delete this {selectedForDeleteStock.ticker} stock?</h2>
                            <div className="flex justify-center items-center gap-1">
                                <button onClick={() => {
                                    onStockDelete(selectedForDeleteStock.id);
                                    closeModal();
                                }} className="bg-green-500 mt-2 rounded-md text-white p-1 hover:bg-green-800 cursor-pointer px-3 py-2 text-lg">Yes</button>
                                <button onClick={closeModal} className="bg-red-500 mt-2 rounded-md text-white p-1 hover:bg-red-800 cursor-pointer px-3 py-2 text-lg">No</button>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </div>
    );
}