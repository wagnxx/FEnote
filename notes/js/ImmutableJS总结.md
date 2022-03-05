# ImmutableJS知识点总结

### 基础知识点（计算机）
- a / 2^n  === a >>> n
- a % 2^n === a & (2^n - 1)
```js
// 17 % 8 ==> 1
// 17: 00010001
// 08: 00001000
// 07: 00000111
// ==> 00000001


```
- 位进制转换 n === n / Math.pow(7,x) % 7;
```js
// 假设转 7进制，五位数

function trans7Bit(n) {
  let radix = 7;
  let depth = 5;
  let result = new Array(depth);
  

  for (i = 0;depth>0;depth--) {
    result[i++] = n /  Math.pow(radix,depth-1) % radix;
  }
  

  // for (let size = Math.pow(radix,depth-1),i = 0;size>1;size /= radix) {
  //   result[i++] = n / size % radix;
  // }

  return result;
}



const RADIX = 7;

function find(key) {
  let node = root; // root是根节点，在别的地方定义了

  // depth是当前树的深度。这种计算方式跟上面列出的式子是等价的，但可以避免多次指数计算。这个size就是上面的radix^level - 1
  for (let size = Math.pow(RADIX, (depth - 1)); size > 1; size /= RADIX) {
    node = node[Math.floor(key / size) % RADIX];
  }

  return node[key % RADIX];
}
/**
  大气是风范
  人生不是混日子，也不是熬日子，而是享受每一天

*/
``