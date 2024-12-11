const {sum, divide}=require('../../src/01-matchers/sum');

it('should add 1 + 2 to equal 3', ()=>{
    const result= sum(1,2);
    expect(result).toBe(3);
});

it('should add 2 / 2 to equal 1', ()=>{
    const result= divide(2,2);
    expect(result).toBe(1);
});