import { expect, it, test } from "vitest";
import {sum} from '.';

test("sum of 2+2 is 4", ()=>{
    expect(sum(2,2)).toBe(4);
})