import { apiClient } from '../apiClient';
import type {
    GetMyStocksResponse,
    CreateStockDto,
    CreateStockResponse
} from '../../types/stock';

export function getMyStocks(token: string) {
    return apiClient<GetMyStocksResponse>('/stock', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export function createStock(dto: CreateStockDto, token: string) {
    return apiClient<CreateStockResponse>('/stock', {
        method: 'POST',
        body: JSON.stringify(dto),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}