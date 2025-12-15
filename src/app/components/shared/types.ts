export type CharactersType = {
    url: string;
    name: string;
    gender: string;
    aliases: string[];
    titles: string[];
    playedBy: string;
    born: string;
    died: string;
    father: string;
    mother: string;
    spouse: string;
}

export type CharacterDetailsType = {
    character: CharactersType | null;
    mother: CharactersType | null;
    father: CharactersType | null;
    spouse: CharactersType | null;
}

export type PageOptions = {
    pageSize: number;
    pageIndex: number;
}

export type SortParams = {
    column: string;
    direction: string;
}

export interface CharactersState {
    characters: CharactersType[];
    favorites: string[];
    error: string | null;
    pageIndex: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: 'asc' | 'desc';
    viewMode: string;
}

export interface AppState {
    characters: CharactersState;
}