import { createAction, props } from '@ngrx/store';
import { CharactersType } from '../types';

export const loadCharacters = createAction(
    'Load Characters',
    props<{ page: number; pageSize: number }>()
);

export const loadCharactersSuccess = createAction(
    'Load Characters Success',
    props<{ characters: CharactersType[] }>()
);

export const loadCharactersFailure = createAction(
    'Load Characters Failure',
    props<{ error: string }>()
);

export const searchCharacters = createAction(
    'Search Characters',
    props<{ searchTerm: string }>()
);

export const sortCharacters = createAction(
    'Sort Characters',
    props<{ column: string; direction: 'asc' | 'desc' }>()
);

export const changePageParams = createAction(
    'Change Page Params',
    props<{ page: number; pageSize: number }>()
);

export const addToFavorites = createAction(
    'Add to Favorites',
    props<{ characterUrl: string }>()
);

export const removeFromFavorites = createAction(
    'Remove from Favorites',
    props<{ characterUrl: string }>()
);

export const toggleFavorite = createAction(
    'Toggle Favorite',
    props<{ characterUrl: string }>()
);

export const toggleViewMode = createAction(
    'Toggle View Mode'
);