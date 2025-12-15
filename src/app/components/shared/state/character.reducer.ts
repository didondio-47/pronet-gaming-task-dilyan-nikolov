import { createReducer, on } from '@ngrx/store';
import * as CharactersActions from './characters.actions';
import { CharactersState } from '../types';

const initialState: CharactersState = {
    characters: [],
    favorites: [],
    error: null,
    pageIndex: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: 'name',
    sortDirection: 'asc',
    viewMode: 'all',
};

export const charactersReducer = createReducer(
    initialState,
    on(CharactersActions.loadCharacters, (state) => ({
        ...state,
    })),
    on(CharactersActions.loadCharactersSuccess, (state, { characters }) => ({
        ...state,
        characters,

    })),
    on(CharactersActions.searchCharacters, (state, { searchTerm }) => ({
        ...state,
        searchTerm,
    })),
    on(CharactersActions.sortCharacters, (state, { column, direction }) => ({
        ...state,
        sortColumn: column,
        sortDirection: direction,
    })),
    on(CharactersActions.changePageParams, (state, { page, pageSize }) => ({
        ...state,
        pageIndex: page,
        pageSize,
    })),
    on(CharactersActions.toggleFavorite, (state, { characterUrl }) => ({
        ...state,
        favorites: state.favorites.includes(characterUrl)
            ? state.favorites.filter(url => url !== characterUrl)
            : [...state.favorites, characterUrl],
    })),
    on(CharactersActions.toggleViewMode, (state) => ({
        ...state,
        viewMode: state.viewMode === 'all' ? 'favorites' : 'all',
    }))
);