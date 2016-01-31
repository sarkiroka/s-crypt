# s-scrypt

```
var sCrypt=require('s-crypt')('Passw0rd');

var original = 'árvíztűrő tükörfúrógép';
var encoded = sCrypt.encode(original);
var decoded = sCrypt.decode(encoded);

console.log('original:\t', original);
console.log('encoded:\t', encoded);
console.log('decoded:\t', decoded);
console.log('is equal:\t', original === decoded ? 'true' : 'false');
```
