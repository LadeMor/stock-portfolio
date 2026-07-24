import { apiClient } from '../apiClient';
import type { GetTickerResponse } from '../../types/ticker';

export function getTickers(search: string, token: string) {

    const params = new URLSearchParams({
        q: search,
    })

    return apiClient<GetTickerResponse>(`/finnhub/tickers?${params.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}
