import { greet } from ".";
import { describe, expect, it } from "vitest";

describe("greet", ()=>{
    it("should return Hello User!!, if name not provided", ()=>{
        expect(greet()).toBe('Hello User!!');
    });

    it("should return Hello Ajay!!, if name 'Ajay' provided", ()=>{
        expect(greet('Ajay')).toBe('Hello Ajay!!');
    })

    it("should throw error for non-string values", ()=>{
        expect(()=>greet(122)).toThrow(Error);
    })
})