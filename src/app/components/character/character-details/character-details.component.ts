import { Component, EventEmitter, input, Output } from "@angular/core";
import { CharactersService } from "../characters-list.service";
import { forkJoin, Observable, of, switchMap } from "rxjs";
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from "@angular/common";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { getCharacterIdFromUrl } from "../../shared/helper";
import { CharacterDetailsType, CharactersType } from "../../shared/types";

@Component({
    selector: 'app-characters-details',
    templateUrl: './character-details.component.html',
    styleUrls: ['./character-details.component.scss'],
    standalone: true,
    providers: [CharactersService],
    imports: [AsyncPipe, MatIcon, MatIconButton],
})
export class CharactersDetailsComponent {
    public readonly characterId = input<string | null>(null);
    protected readonly character$: Observable<CharacterDetailsType | null>;
    @Output()
    public closeDetails: EventEmitter<any> = new EventEmitter<any>();

    constructor(private charactersService: CharactersService) {
        this.character$ = toObservable(this.characterId).pipe(
            switchMap((characterId: string | null) => {
                if (!characterId) return of(null);

                return charactersService.getCharacterDetails(characterId).pipe(
                    switchMap((character: CharactersType) => {
                        if (!character) return of(null);

                        const motherId: string = getCharacterIdFromUrl(character.mother);
                        const fatherId: string = getCharacterIdFromUrl(character.father);
                        const spouseId: string = getCharacterIdFromUrl(character.spouse);

                        return forkJoin({
                            character: of(character),
                            mother: motherId ? charactersService.getCharacterDetails(motherId) : of(null),
                            father: fatherId ? charactersService.getCharacterDetails(fatherId) : of(null),
                            spouse: spouseId ? charactersService.getCharacterDetails(spouseId) : of(null),
                        });
                    })
                );
            })
        );
    }
} 