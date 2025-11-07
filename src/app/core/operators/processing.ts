import { WritableSignal } from "@angular/core";
import { defer, finalize, Observable } from "rxjs";

function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => defer(() => {
        callback();
        return source;
    });
}

export function processing<T>(indicator: WritableSignal<boolean>): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => source.pipe(
        prepare(() => indicator.set(true)),
        finalize(() => indicator.set(false))
    )
}