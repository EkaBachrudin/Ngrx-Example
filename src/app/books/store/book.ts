export interface BookInterface {
    id: number
    title: string
    author: string
    cost: number
}

export interface bookState{
    books:BookInterface[],
}
