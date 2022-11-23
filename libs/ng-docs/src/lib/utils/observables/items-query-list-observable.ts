import { QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { getOriginalArrayFromQueryList } from '../miscellaneous/get-original-array-from-query-list';

/**
 * Converts changes observable of a QueryList to an Observable of arrays
 */
export function itemsQueryListObservable<T>(
  queryList: QueryList<T>
): Observable<ReadonlyArray<T>> {
  return queryList.changes.pipe(
    map(() => getOriginalArrayFromQueryList(queryList)),
    startWith(getOriginalArrayFromQueryList(queryList))
  );
}
