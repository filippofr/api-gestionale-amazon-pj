export interface Item {
    id?: string;             // id mongo
    asin: string;               // codice di amazon
    title?: string;
    giacenza?: number;
    categoriaID?: number;
}