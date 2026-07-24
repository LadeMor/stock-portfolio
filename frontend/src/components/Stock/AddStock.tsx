import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { CreateStockDto } from '../../types/stock';
import { createStock } from '../../lib/api/stock';
import { useAuth } from '../../providers/useAuth';
import { getTickers } from '../../lib/api/ticker';

export function AddStock() {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [ticker, setTicker] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [purchasePrice, setPurchasePrice] = useState<number>(0);

    const [showList, setShowList] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [submittedSearch, setSubmittedSearch] = useState('');

    const { data } = useQuery({
        queryKey: ['tickers', submittedSearch],
        queryFn: () => getTickers(submittedSearch, token!),
        enabled: Boolean(token) && submittedSearch.length >= 2,
    })

    const onSearch = () => {
        setSubmittedSearch(search.trim());
        setShowList(true);
    }

    const hideList = () => {
        setShowList(false);
    }

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
        onSuccess: () => {
            setTicker("");
            setQuantity(0);
            setPurchasePrice(0);
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
                <div className='flex flex-row'>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        className="border-1" />
                    <button
                        type='button'
                        className='border-1 p-1 hover:bg-gray-200 cursor-pointer'
                        onClick={onSearch}>Search</button>
                </div>
                {
                    data && showList ?
                        <div className='border-1 max-h-[300px] overflow-y-scroll flex flex-col '>
                            {
                                data.tickers.result.map((t) => (
                                    <button onClick={() => {
                                        setTicker(t.displaySymbol)
                                        setSearch(t.displaySymbol);
                                        hideList();
                                    }} className='text-left border-1 p-1 hover:bg-gray-200 cursor-pointer'>{t.displaySymbol}</button>
                                ))
                            }
                        </div>
                        :
                        null
                }
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