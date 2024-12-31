[
    undefined, 
    null, 
    [], 
    {}, 
    "", 
    0, 
    -1, 
    NaN, 
    Infinity, 
    -Infinity, 
    true, 
    false, 
    " ", 
    "0", 
    [], 
    [1], 
    {}
  ].forEach((val) => 
    console.log(`'${val}'===null  : ${val === null}`)
  );

  console.log('\n\n\n');
  
  [
    undefined, 
    null, 
    [], 
    {}, 
    "", 
    0, 
    -1, 
    NaN, 
    Infinity, 
    -Infinity, 
    true, 
    false, 
    " ", 
    "0", 
    [], 
    [1], 
    {}
  ].forEach((val) => 
    console.log(`'!${val}'  : ${!val}`)
  );
  