import { Component } from "@angular/core";
import { CharactersService } from "../characters-list.service";
import { AsyncPipe } from "@angular/common";
import { BehaviorSubject, map, Observable } from "rxjs";
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule, MatPrefix } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CharactersDetailsComponent } from "../character-details/character-details.component";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { PageContainerComponent } from "../../shared/app-container/app-container.component";
import { getCharacterIdFromUrl } from "../../shared/helper";
import { AppState, CharactersType, PageOptions, SortParams } from "../../shared/types";
import { FormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import * as CharactersSelectors from "../../shared/state/characters.selectors";
import * as CharactersActions from "../../shared/state/characters.actions";
import { MatButton, MatIconButton } from "@angular/material/button";

@Component({
    selector: 'app-characters-list',
    templateUrl: './characters-list.component.html',
    styleUrls: ['./characters-list.component.scss'],
    standalone: true,
    providers: [CharactersService],
    imports: [AsyncPipe, FormsModule, MatPrefix, MatIcon, MatIconButton, MatButton, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, CharactersDetailsComponent, PageContainerComponent],
})
export class CharactersListComponent {
    protected readonly characters$: Observable<CharactersType[]>;
    protected readonly displayedColumns: string[] = ['name', 'gender', 'born', 'died', 'favorite'];
    protected readonly pageOptions$: BehaviorSubject<PageOptions> = new BehaviorSubject({ pageSize: 10, pageIndex: 0 });
    protected readonly selectedCharacter$: Observable<string | null> | undefined;
    protected readonly getCharacterIdFromUrl = getCharacterIdFromUrl;
    protected readonly searchTerm$: Observable<string>;
    protected readonly viewMode$: Observable<string>;
    protected readonly sortDirection$: BehaviorSubject<SortParams> = new BehaviorSubject({ column: 'name', direction: 'asc' });

    constructor(private store: Store<AppState>, public activatedRoute: ActivatedRoute, public router: Router) {

        this.characters$ = this.store.select(CharactersSelectors.selectCharacters);
        this.searchTerm$ = this.store.select(CharactersSelectors.selectSearchTerm);
        this.viewMode$ = this.store.select(CharactersSelectors.selectViewMode);

        this.store.dispatch(CharactersActions.loadCharacters({ page: 1, pageSize: 10 }));

        this.selectedCharacter$ = this.activatedRoute.queryParams.pipe(
            map((params: Params) => (params['characterId']) ?? null)
        );
    }

    protected toggleFavorite(characterUrl: string): void {
        this.store.dispatch(CharactersActions.toggleFavorite({ characterUrl }));
    }

    protected isFavorite(characterUrl: string): Observable<boolean> {
        return this.store.select(CharactersSelectors.selectIsFavorite(characterUrl));
    }

    protected filterCharacters(searchTerm: string): void {
        this.store.dispatch(CharactersActions.searchCharacters({ searchTerm }));
    }

    protected toggleViewMode(): void {
        this.store.dispatch(CharactersActions.toggleViewMode());
    }

    /**
* Change to 'asc' | 'desc' order
* @param sort - Sort
*/
    protected onSortChange(event: Sort): void {
        this.store.dispatch(
            CharactersActions.sortCharacters({
                column: event.active,
                direction: event.direction as 'asc' | 'desc',
            })
        );
    }

    /**
 * Open character details
 * @param id - ID of the character
 */
    protected async navigateTo(url?: string): Promise<void> {
        const characterId = url ? getCharacterIdFromUrl(url) : undefined;
        await this.router.navigate([], { queryParams: { characterId }, queryParamsHandling: 'merge' });
    }

    /**
* Change page size or page index
* @param event - PageEvent
*/
    protected onParamChange(event: PageEvent): void {
        this.store.dispatch(
            CharactersActions.changePageParams({
                page: event.pageIndex + 1,
                pageSize: event.pageSize,
            })
        );
    }
}