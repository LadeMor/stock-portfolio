export type Ticker = {
    description: string,
    displaySymbol: string,
    symbol: string,
    type: string
}

export type GetTickerResponse = {
    tickers: {
        count: number,
        result: Ticker[]
    }
}