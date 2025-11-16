export interface ResponseInterface<T> {
    count: number,
    next?: string,
    previous?: string,
    results: Array<T>
}