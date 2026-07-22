import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { CreateStockDto } from '../../types/stock';
import { createStock } from '../../lib/api/stock';
import { useAuth } from '../../providers/useAuth';

export function AddStock() {
    const navigate = useNavigate();
    const {token} = useAuth();

    const [ticker, setTicker] = useState<string>('AAPL');
    const [quantity, setQuantity] = useState<number>(0);
    const [purchasePrice, setPurchasePrice] = useState<number>(0);

    const backToDashboard = () => {
        navigate({
            to: '/dashboard',
        })
    }

    const {
        mutate,
        error,
        isPending,
        isError,
    } = useMutation({
        mutationFn: (data: CreateStockDto) => createStock(data, token!),
        onSuccess: (response) => {
            console.log("Success", response);
        }
    })

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        mutate({
            ticker,
            quantity,
            purchasePrice
        })
    }

    return (
        <section className="p-8 flex justify-center item-center relative">
            <button onClick={backToDashboard} className="absolute top-5 left-5 bg-sky-400 text-white p-2 rounded-sm cursor-pointer hover:bg-sky-700">Back</button>
            <form onSubmit={onSubmit} className="flex flex-col w-md border-1 p-3 rounded-md">
                <h2 className="mb-3">Add stock</h2>
                <label htmlFor="ticker">Ticker</label>
                <select
                    className="border-1"
                    name='ticker'
                    value={ticker}
                    onChange={(event) => setTicker(event.target.value)}>
                    <option value="AAPL">AAPL — Apple</option>
                    <option value="MSFT">MSFT — Microsoft</option>
                    <option value="NVDA">NVDA — NVIDIA</option>
                </select>
                <label htmlFor="quantity">Quantity</label>
                <input
                    className="border-1"
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(parseFloat(event.target.value))} />
                <label htmlFor="purchase-price">Purchase price</label>
                <input
                    className="border-1"
                    type="number"
                    name='purchase-price'
                    value={purchasePrice}
                    onChange={(event) => setPurchasePrice(parseFloat(event.target.value))} />
                {
                    isPending ?
                        <button type="submit" disabled className="bg-sky-400 text-white p-2 mt-2 rounded-sm cursor-pointer hover:bg-sky-700">Please wait...</button>
                        :
                        <button type="submit" className="bg-sky-400 text-white p-2 mt-2 rounded-sm cursor-pointer hover:bg-sky-700">Add</button>
                }
                {isError ?? <h1>Something went wrong {error}</h1>}
            </form>
        </section>
    );
}