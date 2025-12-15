import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharactersState, CharactersType } from '../types';

const selectCharactersState = createFeatureSelector<CharactersState>('characters');

export const selectCharacters = createSelector(
    selectCharactersState,
    (state: CharactersState) => {
        const baseCharacters = state.viewMode === 'favorites'
            ? state.characters.filter(character => state.favorites.includes(character.url))
            : [...state.characters];

        let filtered;
        const term = state.searchTerm.toLowerCase().trim();
        if (!term && term.length === 0) {
            filtered = [...baseCharacters];
        } else {
            filtered = [...baseCharacters].filter(character =>
                character.name.toLowerCase().includes(term) ||
                character.gender.toLowerCase().includes(term) ||
                character.born.toLowerCase().includes(term) ||
                character.died.toLowerCase().includes(term)
            );
        }

        return filtered.sort((a: CharactersType, b: CharactersType) => {
            let aValue: string = a[state.sortColumn as keyof CharactersType] as string;
            let bValue: string = b[state.sortColumn as keyof CharactersType] as string;

            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();

            if (aValue < bValue) {
                return state.sortDirection === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return state.sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
);

export const selectFavorites = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.favorites
);

export const selectFavoriteCharacters = createSelector(
    selectCharactersState,
    (state: CharactersState) =>
        state.characters.filter(character =>
            state.favorites.includes(character.url)
        )
);

export const selectIsFavorite = (characterUrl: string) => createSelector(
    selectCharactersState,
    (state: CharactersState) => state.favorites.includes(characterUrl)
);

export const selectViewMode = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.viewMode
);

export const selectError = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.error
);

export const selectPageIndex = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.pageIndex
);

export const selectPageSize = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.pageSize
);

export const selectSearchTerm = createSelector(
    selectCharactersState,
    (state: CharactersState) => state.searchTerm
);

export const selectSort = createSelector(
    selectCharactersState,
    (state: CharactersState) => ({
        column: state.sortColumn,
        direction: state.sortDirection,
    })
);