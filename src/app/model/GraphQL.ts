export interface GraphQLResponse<T> {
    data: T, 
    loading: boolean, 
    networkStatus: number
}

export interface ErrorGraphQLResponse {
    errors : string[]
}