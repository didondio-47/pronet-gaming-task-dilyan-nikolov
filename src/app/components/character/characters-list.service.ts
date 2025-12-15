import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CharactersType } from "../shared/types";

@Injectable({
    providedIn: 'root',
})
export class CharactersService {
    constructor(private http: HttpClient) { }

    public getCharacters(page: number = 1, pageSize: number = 10): Observable<CharactersType[]> {
        let params = new HttpParams();
        params = params.set('page', page.toString());
        params = params.set('pageSize', pageSize.toString());

        return this.http.get<CharactersType[]>('https://anapioficeandfire.com/api/characters', { params });
    }

    public getCharacterDetails(characterId: string): Observable<CharactersType> {
        return this.http.get<CharactersType>(`https://anapioficeandfire.com/api/characters/${characterId}`);
    }
}