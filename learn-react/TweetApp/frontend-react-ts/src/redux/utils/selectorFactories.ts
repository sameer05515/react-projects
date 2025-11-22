/**
 * Shared Selector Utilities
 * 
 * These factory functions create reusable selectors that can be used across different slices.
 * They help reduce code duplication and ensure consistent selector patterns.
 */

import { createSelector } from '@reduxjs/toolkit';

/**
 * Creates a selector to filter items by IDs
 * 
 * @template T - Type that extends an object with uniqueId property
 * @param selectAllItems - Selector that returns all items
 * @returns A selector that filters items by the provided IDs
 * 
 * @example
 * ```typescript
 * const selectTagsByIds = makeSelectByIds(selectAllFlatTags);
 * const tags = useSelector((state) => selectTagsByIds(state, ['id1', 'id2']));
 * ```
 */
export const makeSelectByIds = <T extends { uniqueId: string }>(
  selectAllItems: (state: any) => T[]
) =>
  createSelector(
    [selectAllItems, (state: any, ids: string[]) => ids],
    (items: T[], ids: string[]) => {
      if (!ids || !Array.isArray(ids) || ids.length === 0) return [];
      return items.filter((item) => ids.includes(item.uniqueId));
    }
  );

/**
 * Creates a selector to find item by ID
 * 
 * @template T - Type that extends an object with uniqueId property
 * @param selectAllItems - Selector that returns all items
 * @returns A selector that finds an item by the provided ID
 * 
 * @example
 * ```typescript
 * const selectTagById = makeSelectById(selectAllFlatTags);
 * const tag = useSelector((state) => selectTagById(state, 'id1'));
 * ```
 */
export const makeSelectById = <T extends { uniqueId: string }>(
  selectAllItems: (state: any) => T[]
) =>
  createSelector(
    [selectAllItems, (state: any, id: string) => id],
    (items: T[], id: string) => {
      if (!id) return null;
      return items.find((item) => item.uniqueId === id) || null;
    }
  );

/**
 * Creates a selector to get children of a parent
 * 
 * @template T - Type that extends an object with uniqueId and optional children property
 * @param selectAllItems - Selector that returns all items (tree structure)
 * @returns A selector that returns children of the specified parent
 * 
 * @example
 * ```typescript
 * const selectChildren = makeSelectChildren(selectAllTreeTopics);
 * const children = useSelector((state) => selectChildren(state, 'parentId'));
 * ```
 */
export const makeSelectChildren = <T extends { uniqueId: string; children?: T[] }>(
  selectAllItems: (state: any) => T[]
) =>
  createSelector(
    [selectAllItems, (state: any, parentId: string) => parentId],
    (items: T[], parentId: string) => {
      if (!parentId) return [];
      const parent = items.find((item) => item.uniqueId === parentId);
      return parent?.children || [];
    }
  );

