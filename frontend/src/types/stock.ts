export type Stock = {
    ticker: string,
    quantity: number,
    purchasePrice: number,
    createdAt: Date
}

export type GetMyStocksResponse = {
    stocks: Stock[]
}

export type CreateStockDto = {
    ticker: string,
    quantity: number,
    purchasePrice: number
}

export type CreateStockResponse = {
    id: string
}