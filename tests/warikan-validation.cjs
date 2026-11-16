const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(__dirname+'/../tools/warikan/index.html','utf8').split('<script>')[1].split('</script>')[0];
new vm.Script(source);
const ctx=vm.createContext({});
vm.runInContext(source.slice(source.indexOf('function roundTo'),source.indexOf('function update')),ctx);
const g=(count=1,fixed='',weight=1)=>({name:'test',count,fixed,weight});
const calc=(t,gs,u=100,m='up')=>ctx.calc(t,gs,u,m);
let n=0;
for(const [t,gs] of [[1000,[g(1.9)]],[1000.9,[g()]],[1000,[g(1,'-100')]],[1000,[g(1,'1.5')]],[1000,[g(-1)]],[Infinity,[g()]],[1000,[g(1,'',Infinity)]],[0,[g()]],[Number.MAX_SAFE_INTEGER+1,[g()]]]){assert(calc(t,gs).error);n++;}
assert.equal(calc(1000,[g()]).collected,1000); n++;
assert.equal(calc(30000,[g(2,'',1.5),g(5)]).collected,30400);n++;
assert.equal(calc(1000,[g(1,'0'),g()]).rows[0].per,0);n++;
assert.equal(calc(1000,[g(3)],100,'down').collected,900);n++;
assert.equal(calc(1000,[g(3)],100,'near').collected,900);n++;
assert(calc(1000,[g()],0).error);n++;
assert(calc(1000,[g()],100,'unknown').error);n++;
console.log(n+' focused calc assertions passed; full script syntax passed');
