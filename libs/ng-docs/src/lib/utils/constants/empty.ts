import { QueryList } from '@angular/core';

/**
 * For type safety when using @ContentChildren and @ViewChildren
 *
 * NOTE: Be careful subscribing to 'changes'
 */
export const EMPTY_QUERY = new QueryList<any>();
