const cloneArray = require('../src/clone-array');

test('properly clones array,', ()=>{
    const arr=[1,2];
    expect(cloneArray(arr)).not.toBe(arr);
    expect(cloneArray(arr)).toEqual(arr);
})