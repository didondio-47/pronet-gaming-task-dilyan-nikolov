import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as CharactersActions from './characters.actions';
import { CharactersService } from '../../character/characters-list.service';


@Injectable()
export class CharactersEffects {
    private actions$ = inject(Actions);
    private charactersService = inject(CharactersService);

    loadCharacters$ = createEffect(() =>
        this.actions$.pipe(
            ofType(CharactersActions.loadCharacters),
            switchMap(({ page, pageSize }) =>
                this.charactersService.getCharacters(page, pageSize).pipe(
                    map((characters) =>
                        CharactersActions.loadCharactersSuccess({ characters })
                    ),
                    catchError((error) =>
                        of(
                            CharactersActions.loadCharactersFailure({
                                error: error.message,
                            })
                        )
                    )
                )
            )
        )
    );
}