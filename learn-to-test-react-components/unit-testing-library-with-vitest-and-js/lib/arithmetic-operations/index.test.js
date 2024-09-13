import { describe, expect, it } from "vitest";
import { sum, subtract, divide } from ".";

describe("Sum", ()=>{
    it("should add 2+2 as 4", ()=>{
        expect(sum(2,2)).toBe(4);
    });

    it("should throw error for '2'+'2'", ()=>{
        expect(()=>sum('2','2')).toThrow(Error);
    })
})

describe("Subtract", ()=>{
    it("should subtract 2-2 as 0", ()=>{
        expect(subtract(2,2)).toBe(0);
    });

    it("should throw error for '2'+2", ()=>{
        expect(()=>subtract('-2',2)).toThrow(Error);
    })
})

describe("divide", ()=>{
    it("should divide 2/2 as 1", ()=>{
        expect(divide(2,2)).toBe(1);
    });

    it("should divide 3/2 as 1.5", ()=>{
        expect(divide(3,2)).toBe(1.5);
    });

    it("should divide 10/9 as 1.11", ()=>{
        expect(divide(10,9)).toBeCloseTo(1.1111);
    });

    it("should throw error for '2'/2", ()=>{
        expect(()=>divide('-2',2)).toThrow(Error);
    })

    it("should throw error for 2/0", ()=>{
        expect(()=>divide(2,0)).toThrow(Error);
    })
})