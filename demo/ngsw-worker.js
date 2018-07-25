(function(){'use strict';class Adapter{newRequest(input,init){return new Request(input,init)}
newResponse(body,init){return new Response(body,init)}
newHeaders(headers){return new Headers(headers)}
isClient(source){return(source instanceof Client)}
get time(){return Date.now()}
parseUrl(url,relativeTo){const parsed=new URL(url,relativeTo);return{origin:parsed.origin,path:parsed.pathname}}
timeout(ms){return new Promise(resolve=>{setTimeout(()=>resolve(),ms)})}}
class NotFound{constructor(table,key){this.table=table;this.key=key}}
class CacheDatabase{constructor(scope,adapter){this.scope=scope;this.adapter=adapter;this.tables=new Map()}
'delete'(name){if(this.tables.has(name)){this.tables.delete(name)}
return this.scope.caches.delete(`ngsw:db:${name}`)}
list(){return this.scope.caches.keys().then(keys=>keys.filter(key=>key.startsWith('ngsw:db:')))}
open(name){if(!this.tables.has(name)){const table=this.scope.caches.open(`ngsw:db:${name}`).then(cache=>new CacheTable(name,cache,this.adapter));this.tables.set(name,table)}
return this.tables.get(name)}}
class CacheTable{constructor(table,cache,adapter){this.table=table;this.cache=cache;this.adapter=adapter}
request(key){return this.adapter.newRequest('/'+key)}
'delete'(key){return this.cache.delete(this.request(key))}
keys(){return this.cache.keys().then(requests=>requests.map(req=>req.url.substr(1)))}
read(key){return this.cache.match(this.request(key)).then(res=>{if(res===undefined){return Promise.reject(new NotFound(this.table,key))}
return res.json()})}
write(key,value){return this.cache.put(this.request(key),this.adapter.newResponse(JSON.stringify(value)))}}
var UpdateCacheStatus;(function(UpdateCacheStatus){UpdateCacheStatus[UpdateCacheStatus.NOT_CACHED=0]="NOT_CACHED";UpdateCacheStatus[UpdateCacheStatus.CACHED_BUT_UNUSED=1]="CACHED_BUT_UNUSED";UpdateCacheStatus[UpdateCacheStatus.CACHED=2]="CACHED"})(UpdateCacheStatus||(UpdateCacheStatus={}));class SwCriticalError extends Error{constructor(){super(...arguments);this.isCritical=!0}}
function sha1(str){const utf8=str;const words32=stringToWords32(utf8,Endian.Big);return _sha1(words32,utf8.length*8)}
function sha1Binary(buffer){const words32=arrayBufferToWords32(buffer,Endian.Big);return _sha1(words32,buffer.byteLength*8)}
function _sha1(words32,len){const w=new Array(80);let[a,b,c,d,e]=[0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0];words32[len>>5]|=0x80<<(24-len%32);words32[((len+64>>9)<<4)+15]=len;for(let i=0;i<words32.length;i+=16){const[h0,h1,h2,h3,h4]=[a,b,c,d,e];for(let j=0;j<80;j++){if(j<16){w[j]=words32[i+j]}
else{w[j]=rol32(w[j-3]^w[j-8]^w[j-14]^w[j-16],1)}
const[f,k]=fk(j,b,c,d);const temp=[rol32(a,5),f,e,k,w[j]].reduce(add32);[e,d,c,b,a]=[d,c,rol32(b,30),a,temp]}[a,b,c,d,e]=[add32(a,h0),add32(b,h1),add32(c,h2),add32(d,h3),add32(e,h4)]}
return byteStringToHexString(words32ToByteString([a,b,c,d,e]))}
function add32(a,b){return add32to64(a,b)[1]}
function add32to64(a,b){const low=(a&0xffff)+(b&0xffff);const high=(a>>>16)+(b>>>16)+(low>>>16);return[high>>>16,(high<<16)|(low&0xffff)]}
function rol32(a,count){return(a<<count)|(a>>>(32-count))}
var Endian;(function(Endian){Endian[Endian.Little=0]="Little";Endian[Endian.Big=1]="Big"})(Endian||(Endian={}));function fk(index,b,c,d){if(index<20){return[(b&c)|(~b&d),0x5a827999]}
if(index<40){return[b^c^d,0x6ed9eba1]}
if(index<60){return[(b&c)|(b&d)|(c&d),0x8f1bbcdc]}
return[b^c^d,0xca62c1d6]}
function stringToWords32(str,endian){const words32=Array((str.length+3)>>>2);for(let i=0;i<words32.length;i++){words32[i]=wordAt(str,i*4,endian)}
return words32}
function arrayBufferToWords32(buffer,endian){const words32=Array((buffer.byteLength+3)>>>2);const view=new Uint8Array(buffer);for(let i=0;i<words32.length;i++){words32[i]=wordAt(view,i*4,endian)}
return words32}
function byteAt(str,index){if(typeof str==='string'){return index>=str.length?0:str.charCodeAt(index)&0xff}
else{return index>=str.byteLength?0:str[index]&0xff}}
function wordAt(str,index,endian){let word=0;if(endian===Endian.Big){for(let i=0;i<4;i++){word+=byteAt(str,index+i)<<(24-8*i)}}
else{for(let i=0;i<4;i++){word+=byteAt(str,index+i)<<8*i}}
return word}
function words32ToByteString(words32){return words32.reduce((str,word)=>str+word32ToByteString(word),'')}
function word32ToByteString(word){let str='';for(let i=0;i<4;i++){str+=String.fromCharCode((word>>>8*(3-i))&0xff)}
return str}
function byteStringToHexString(str){let hex='';for(let i=0;i<str.length;i++){const b=byteAt(str,i);hex+=(b>>>4).toString(16)+(b&0x0f).toString(16)}
return hex.toLowerCase()}
var __awaiter=(undefined&&undefined.__awaiter)||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}
function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}
function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}
step((generator=generator.apply(thisArg,_arguments||[])).next())})};class AssetGroup{constructor(scope,adapter,idle,config,hashes,db,prefix){this.scope=scope;this.adapter=adapter;this.idle=idle;this.config=config;this.hashes=hashes;this.db=db;this.prefix=prefix;this.inFlightRequests=new Map();this.patterns=[];this.name=config.name;this.patterns=this.config.patterns.map(pattern=>new RegExp(pattern));this.cache=this.scope.caches.open(`${this.prefix}:${this.config.name}:cache`);this.metadata=this.db.open(`${this.prefix}:${this.config.name}:meta`);this.origin=this.adapter.parseUrl(this.scope.registration.scope,this.scope.registration.scope).origin}
cacheStatus(url){return __awaiter(this,void 0,void 0,function*(){const cache=yield this.cache;const meta=yield this.metadata;const res=yield cache.match(this.adapter.newRequest(url));if(res===undefined){return UpdateCacheStatus.NOT_CACHED}
try{const data=yield meta.read(url);if(!data.used){return UpdateCacheStatus.CACHED_BUT_UNUSED}}
catch(_){}
return UpdateCacheStatus.CACHED})}
cleanup(){return __awaiter(this,void 0,void 0,function*(){yield this.scope.caches.delete(`${this.prefix}:${this.config.name}:cache`);yield this.db.delete(`${this.prefix}:${this.config.name}:meta`)})}
handleFetch(req,ctx){return __awaiter(this,void 0,void 0,function*(){const url=this.getConfigUrl(req.url);if(this.config.urls.indexOf(url)!==-1||this.patterns.some(pattern=>pattern.test(url))){const cache=yield this.cache;const cachedResponse=yield cache.match(req);if(cachedResponse!==undefined){if(this.hashes.has(url)){return cachedResponse}
else{if(yield this.needToRevalidate(req,cachedResponse)){this.idle.schedule(`revalidate(${this.prefix}, ${this.config.name}): ${req.url}`,()=>__awaiter(this,void 0,void 0,function*(){yield this.fetchAndCacheOnce(req)}))}
return cachedResponse}}
const res=yield this.fetchAndCacheOnce(this.adapter.newRequest(req.url));return res.clone()}
else{return null}})}
getConfigUrl(url){const parsed=this.adapter.parseUrl(url,this.scope.registration.scope);if(parsed.origin===this.origin){return parsed.path}
else{return url}}
needToRevalidate(req,res){return __awaiter(this,void 0,void 0,function*(){if(res.headers.has('Cache-Control')){const cacheControl=res.headers.get('Cache-Control');const cacheDirectives=cacheControl.split(',').map(v=>v.trim()).map(v=>v.split('='));cacheDirectives.forEach(v=>v[0]=v[0].toLowerCase());const cacheAge=cacheDirectives.filter(v=>v[0]==='max-age').map(v=>v[1])[0];if(cacheAge.length===0){return!0}
try{const maxAge=1000*parseInt(cacheAge);let ts;try{const metaTable=yield this.metadata;ts=(yield metaTable.read(req.url)).ts}
catch(e){const date=res.headers.get('Date');if(date===null){return!0}
ts=Date.parse(date)}
const age=this.adapter.time-ts;return age<0||age>maxAge}
catch(e){return!0}}
else if(res.headers.has('Expires')){const expiresStr=res.headers.get('Expires');try{return this.adapter.time>Date.parse(expiresStr)}
catch(e){return!0}}
else{return!0}})}
fetchFromCacheOnly(url){return __awaiter(this,void 0,void 0,function*(){const cache=yield this.cache;const metaTable=yield this.metadata;const response=yield cache.match(this.adapter.newRequest(url));if(response===undefined){return null}
let metadata=undefined;try{metadata=yield metaTable.read(url)}
catch(e){}
return{response,metadata}})}
unhashedResources(){return __awaiter(this,void 0,void 0,function*(){const cache=yield this.cache;return(yield cache.keys()).map(request=>request.url).filter(url=>!this.hashes.has(url))})}
fetchAndCacheOnce(req,used=!0){return __awaiter(this,void 0,void 0,function*(){if(this.inFlightRequests.has(req.url)){return this.inFlightRequests.get(req.url)}
const fetchOp=this.fetchFromNetwork(req);this.inFlightRequests.set(req.url,fetchOp);try{const res=yield fetchOp;if(!res.ok){throw new Error(`Response not Ok (fetchAndCacheOnce): request for ${req.url} returned response ${res.status} ${res.statusText}`)}
const cache=yield this.scope.caches.open(`${this.prefix}:${this.config.name}:cache`);yield cache.put(req,res.clone());if(!this.hashes.has(req.url)){const meta={ts:this.adapter.time,used};const metaTable=yield this.metadata;yield metaTable.write(req.url,meta)}
return res}
finally{this.inFlightRequests.delete(req.url)}})}
fetchFromNetwork(req,redirectLimit=3){return __awaiter(this,void 0,void 0,function*(){const res=yield this.cacheBustedFetchFromNetwork(req);if(res.redirected&&!!res.url){if(redirectLimit===0){throw new SwCriticalError(`Response hit redirect limit (fetchFromNetwork): request redirected too many times, next is ${res.url}`)}
return this.fetchFromNetwork(this.adapter.newRequest(res.url),redirectLimit-1)}
return res})}
cacheBustedFetchFromNetwork(req){return __awaiter(this,void 0,void 0,function*(){const url=this.getConfigUrl(req.url);if(this.hashes.has(url)){const canonicalHash=this.hashes.get(url);const networkResult=yield this.safeFetch(req);let makeCacheBustedRequest=networkResult.ok;if(makeCacheBustedRequest){const fetchedHash=sha1Binary(yield networkResult.clone().arrayBuffer());makeCacheBustedRequest=(fetchedHash!==canonicalHash)}
if(makeCacheBustedRequest){const cacheBustReq=this.adapter.newRequest(this.cacheBust(req.url));const cacheBustedResult=yield this.safeFetch(cacheBustReq);if(!cacheBustedResult.ok){throw new SwCriticalError(`Response not Ok (cacheBustedFetchFromNetwork): cache busted request for ${req.url} returned response ${cacheBustedResult.status} ${cacheBustedResult.statusText}`)}
const cacheBustedHash=sha1Binary(yield cacheBustedResult.clone().arrayBuffer());if(canonicalHash!==cacheBustedHash){throw new SwCriticalError(`Hash mismatch (cacheBustedFetchFromNetwork): ${req.url}: expected ${canonicalHash}, got ${cacheBustedHash} (after cache busting)`)}
return cacheBustedResult}
return networkResult}
else{return this.safeFetch(req)}})}
maybeUpdate(updateFrom,req,cache){return __awaiter(this,void 0,void 0,function*(){const url=this.getConfigUrl(req.url);const meta=yield this.metadata;if(this.hashes.has(url)){const hash=this.hashes.get(url);const res=yield updateFrom.lookupResourceWithHash(url,hash);if(res!==null){yield cache.put(req,res);yield meta.write(req.url,{ts:this.adapter.time,used:!1});return!0}}
return!1})}
cacheBust(url){return url+(url.indexOf('?')===-1?'?':'&')+'ngsw-cache-bust='+Math.random()}
safeFetch(req){return __awaiter(this,void 0,void 0,function*(){try{return yield this.scope.fetch(req)}
catch(err){return this.adapter.newResponse('',{status:504,statusText:'Gateway Timeout',})}})}}
class PrefetchAssetGroup extends AssetGroup{initializeFully(updateFrom){return __awaiter(this,void 0,void 0,function*(){const cache=yield this.cache;yield this.config.urls.reduce((previous,url)=>__awaiter(this,void 0,void 0,function*(){yield previous;const req=this.adapter.newRequest(url);const alreadyCached=(yield cache.match(req))!==undefined;if(alreadyCached){return}
if(updateFrom!==undefined&&(yield this.maybeUpdate(updateFrom,req,cache))){return}
yield this.fetchAndCacheOnce(req,!1)}),Promise.resolve());if(updateFrom!==undefined){const metaTable=yield this.metadata;yield(yield updateFrom.previouslyCachedResources()).filter(url=>this.config.urls.some(cacheUrl=>cacheUrl===url)||this.patterns.some(pattern=>pattern.test(url))).reduce((previous,url)=>__awaiter(this,void 0,void 0,function*(){yield previous;const req=this.adapter.newRequest(url);const alreadyCached=((yield cache.match(req))!==undefined);if(alreadyCached){return}
const res=yield updateFrom.lookupResourceWithoutHash(url);if(res===null||res.metadata===undefined){return}
yield cache.put(req,res.response);yield metaTable.write(url,Object.assign({},res.metadata,{used:!1}))}),Promise.resolve())}})}}
class LazyAssetGroup extends AssetGroup{initializeFully(updateFrom){return __awaiter(this,void 0,void 0,function*(){if(updateFrom===undefined){return}
const cache=yield this.cache;yield this.config.urls.reduce((previous,url)=>__awaiter(this,void 0,void 0,function*(){yield previous;const req=this.adapter.newRequest(url);const alreadyCached=(yield cache.match(req))!==undefined;if(alreadyCached){return}
const updated=yield this.maybeUpdate(updateFrom,req,cache);if(this.config.updateMode==='prefetch'&&!updated){const cacheStatus=yield updateFrom.recentCacheStatus(url);if(cacheStatus!==UpdateCacheStatus.CACHED){return}
yield this.fetchAndCacheOnce(req,!1)}}),Promise.resolve())})}}
var __awaiter$1=(undefined&&undefined.__awaiter)||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}
function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}
function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}
step((generator=generator.apply(thisArg,_arguments||[])).next())})};class LruList{constructor(state){if(state===undefined){state={head:null,tail:null,map:{},count:0,}}
this.state=state}
get size(){return this.state.count}
pop(){if(this.state.tail===null){return null}
const url=this.state.tail;this.remove(url);return url}
remove(url){const node=this.state.map[url];if(node===undefined){return!1}
if(this.state.head===url){if(node.next===null){this.state.head=null;this.state.tail=null;this.state.map={};this.state.count=0;return!0}
const next=this.state.map[node.next];next.previous=null;this.state.head=next.url;node.next=null;delete this.state.map[url];this.state.count--;return!0}
const previous=this.state.map[node.previous];previous.next=node.next;if(node.next!==null){this.state.map[node.next].previous=node.previous}
else{this.state.tail=node.previous}
node.next=null;node.previous=null;delete this.state.map[url];this.state.count--;return!0}
accessed(url){if(this.state.head===url){return}
const node=this.state.map[url]||{url,next:null,previous:null};if(this.state.map[url]!==undefined){this.remove(url)}
if(this.state.head!==null){this.state.map[this.state.head].previous=url}
node.next=this.state.head;this.state.head=url;if(this.state.tail===null){this.state.tail=url}
this.state.map[url]=node;this.state.count++}}
class DataGroup{constructor(scope,adapter,config,db,prefix){this.scope=scope;this.adapter=adapter;this.config=config;this.db=db;this.prefix=prefix;this._lru=null;this.patterns=this.config.patterns.map(pattern=>new RegExp(pattern));this.cache=this.scope.caches.open(`${this.prefix}:dynamic:${this.config.name}:cache`);this.lruTable=this.db.open(`${this.prefix}:dynamic:${this.config.name}:lru`);this.ageTable=this.db.open(`${this.prefix}:dynamic:${this.config.name}:age`)}
lru(){return __awaiter$1(this,void 0,void 0,function*(){if(this._lru===null){const table=yield this.lruTable;try{this._lru=new LruList(yield table.read('lru'))}
catch(e){this._lru=new LruList()}}
return this._lru})}
syncLru(){return __awaiter$1(this,void 0,void 0,function*(){if(this._lru===null){return}
const table=yield this.lruTable;return table.write('lru',this._lru.state)})}
handleFetch(req,ctx){return __awaiter$1(this,void 0,void 0,function*(){if(!this.patterns.some(pattern=>pattern.test(req.url))){return null}
const lru=yield this.lru();switch(req.method){case 'OPTIONS':return null;case 'GET':case 'HEAD':switch(this.config.strategy){case 'freshness':return this.handleFetchWithFreshness(req,ctx,lru);case 'performance':return this.handleFetchWithPerformance(req,ctx,lru);default:throw new Error(`Unknown strategy: ${this.config.strategy}`)}
default:const wasCached=lru.remove(req.url);if(wasCached){yield this.clearCacheForUrl(req.url)}
yield this.syncLru();return this.safeFetch(req)}})}
handleFetchWithPerformance(req,ctx,lru){return __awaiter$1(this,void 0,void 0,function*(){let res=null;const fromCache=yield this.loadFromCache(req,lru);if(fromCache!==null){res=fromCache.res;if(this.config.refreshAheadMs!==undefined&&fromCache.age>=this.config.refreshAheadMs){ctx.waitUntil(this.safeCacheResponse(req,this.safeFetch(req)))}}
if(res!==null){return res}
const[timeoutFetch,networkFetch]=this.networkFetchWithTimeout(req);res=yield timeoutFetch;if(res===undefined){res=this.adapter.newResponse(null,{status:504,statusText:'Gateway Timeout'});ctx.waitUntil(this.safeCacheResponse(req,networkFetch))}
yield this.cacheResponse(req,res,lru);return res})}
handleFetchWithFreshness(req,ctx,lru){return __awaiter$1(this,void 0,void 0,function*(){const[timeoutFetch,networkFetch]=this.networkFetchWithTimeout(req);let res;try{res=yield timeoutFetch}
catch(e){res=undefined}
if(res===undefined){ctx.waitUntil(this.safeCacheResponse(req,networkFetch));const fromCache=yield this.loadFromCache(req,lru);res=(fromCache!==null)?fromCache.res:null}
else{yield this.cacheResponse(req,res,lru,!0)}
if(res!==null){return res}
res=yield networkFetch;yield this.cacheResponse(req,res,lru,!0);return res})}
networkFetchWithTimeout(req){if(this.config.timeoutMs!==undefined){const networkFetch=this.scope.fetch(req);const safeNetworkFetch=(()=>__awaiter$1(this,void 0,void 0,function*(){try{return yield networkFetch}
catch(err){return this.adapter.newResponse(null,{status:504,statusText:'Gateway Timeout',})}}))();const networkFetchUndefinedError=(()=>__awaiter$1(this,void 0,void 0,function*(){try{return yield networkFetch}
catch(err){return undefined}}))();const timeout=this.adapter.timeout(this.config.timeoutMs);return[Promise.race([networkFetchUndefinedError,timeout]),safeNetworkFetch]}
else{const networkFetch=this.safeFetch(req);return[networkFetch,networkFetch]}}
safeCacheResponse(req,res){return __awaiter$1(this,void 0,void 0,function*(){try{yield this.cacheResponse(req,yield res,yield this.lru())}
catch(e){}})}
loadFromCache(req,lru){return __awaiter$1(this,void 0,void 0,function*(){const cache=yield this.cache;let res=yield cache.match(req);if(res!==undefined){try{const ageTable=yield this.ageTable;const age=this.adapter.time-(yield ageTable.read(req.url)).age;if(age<=this.config.maxAge){lru.accessed(req.url);return{res,age}}}
catch(e){}
lru.remove(req.url);yield this.clearCacheForUrl(req.url);yield this.syncLru()}
return null})}
cacheResponse(req,res,lru,okToCacheOpaque=!1){return __awaiter$1(this,void 0,void 0,function*(){if(!res.ok||(okToCacheOpaque&&res.type==='opaque')){return}
if(lru.size>=this.config.maxSize){const evictedUrl=lru.pop();if(evictedUrl!==null){yield this.clearCacheForUrl(evictedUrl)}}
lru.accessed(req.url);yield(yield this.cache).put(req,res.clone());const ageTable=yield this.ageTable;yield ageTable.write(req.url,{age:this.adapter.time});yield this.syncLru()})}
cleanup(){return __awaiter$1(this,void 0,void 0,function*(){yield Promise.all([this.scope.caches.delete(`${this.prefix}:dynamic:${this.config.name}:cache`),this.db.delete(`${this.prefix}:dynamic:${this.config.name}:age`),this.db.delete(`${this.prefix}:dynamic:${this.config.name}:lru`),])})}
clearCacheForUrl(url){return __awaiter$1(this,void 0,void 0,function*(){const[cache,ageTable]=yield Promise.all([this.cache,this.ageTable]);yield Promise.all([cache.delete(this.adapter.newRequest(url,{method:'GET'})),cache.delete(this.adapter.newRequest(url,{method:'HEAD'})),ageTable.delete(url),])})}
safeFetch(req){return __awaiter$1(this,void 0,void 0,function*(){try{return this.scope.fetch(req)}
catch(err){return this.adapter.newResponse(null,{status:504,statusText:'Gateway Timeout',})}})}}
var __awaiter$2=(undefined&&undefined.__awaiter)||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}
function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}
function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}
step((generator=generator.apply(thisArg,_arguments||[])).next())})};class AppVersion{constructor(scope,adapter,database,idle,manifest,manifestHash){this.scope=scope;this.adapter=adapter;this.database=database;this.idle=idle;this.manifest=manifest;this.manifestHash=manifestHash;this.hashTable=new Map();this._okay=!0;Object.keys(this.manifest.hashTable).forEach(url=>{this.hashTable.set(url,this.manifest.hashTable[url])});this.assetGroups=(manifest.assetGroups||[]).map(config=>{const prefix=`ngsw:${this.manifestHash}:assets`;switch(config.installMode){case 'prefetch':return new PrefetchAssetGroup(this.scope,this.adapter,this.idle,config,this.hashTable,this.database,prefix);case 'lazy':return new LazyAssetGroup(this.scope,this.adapter,this.idle,config,this.hashTable,this.database,prefix)}});this.dataGroups=(manifest.dataGroups||[]).map(config=>new DataGroup(this.scope,this.adapter,config,this.database,`ngsw:${config.version}:data`));const includeUrls=manifest.navigationUrls.filter(spec=>spec.positive);const excludeUrls=manifest.navigationUrls.filter(spec=>!spec.positive);this.navigationUrls={include:includeUrls.map(spec=>new RegExp(spec.regex)),exclude:excludeUrls.map(spec=>new RegExp(spec.regex)),}}
get okay(){return this._okay}
initializeFully(updateFrom){return __awaiter$2(this,void 0,void 0,function*(){try{yield this.assetGroups.reduce((previous,group)=>__awaiter$2(this,void 0,void 0,function*(){yield previous;return group.initializeFully(updateFrom)}),Promise.resolve())}
catch(err){this._okay=!1;throw err}})}
handleFetch(req,context){return __awaiter$2(this,void 0,void 0,function*(){const asset=yield this.assetGroups.reduce((potentialResponse,group)=>__awaiter$2(this,void 0,void 0,function*(){const resp=yield potentialResponse;if(resp!==null){return resp}
return group.handleFetch(req,context)}),Promise.resolve(null));if(asset!==null){return asset}
const data=yield this.dataGroups.reduce((potentialResponse,group)=>__awaiter$2(this,void 0,void 0,function*(){const resp=yield potentialResponse;if(resp!==null){return resp}
return group.handleFetch(req,context)}),Promise.resolve(null));if(data!==null){return data}
if(req.url!==this.manifest.index&&this.isNavigationRequest(req)){return this.handleFetch(this.adapter.newRequest(this.manifest.index),context)}
return null})}
isNavigationRequest(req){if(req.mode!=='navigate'){return!1}
if(!this.acceptsTextHtml(req)){return!1}
const urlPrefix=this.scope.registration.scope.replace(/\/$/,'');const url=req.url.startsWith(urlPrefix)?req.url.substr(urlPrefix.length):req.url;const urlWithoutQueryOrHash=url.replace(/[?#].*$/,'');return this.navigationUrls.include.some(regex=>regex.test(urlWithoutQueryOrHash))&&!this.navigationUrls.exclude.some(regex=>regex.test(urlWithoutQueryOrHash))}
lookupResourceWithHash(url,hash){return __awaiter$2(this,void 0,void 0,function*(){if(!this.hashTable.has(url)){return null}
if(this.hashTable.get(url)!==hash){return null}
const cacheState=yield this.lookupResourceWithoutHash(url);return cacheState&&cacheState.response})}
lookupResourceWithoutHash(url){return this.assetGroups.reduce((potentialResponse,group)=>__awaiter$2(this,void 0,void 0,function*(){const resp=yield potentialResponse;if(resp!==null){return resp}
return group.fetchFromCacheOnly(url)}),Promise.resolve(null))}
previouslyCachedResources(){return this.assetGroups.reduce((resources,group)=>__awaiter$2(this,void 0,void 0,function*(){return(yield resources).concat(yield group.unhashedResources())}),Promise.resolve([]))}
recentCacheStatus(url){return __awaiter$2(this,void 0,void 0,function*(){return this.assetGroups.reduce((current,group)=>__awaiter$2(this,void 0,void 0,function*(){const status=yield current;if(status===UpdateCacheStatus.CACHED){return status}
const groupStatus=yield group.cacheStatus(url);if(groupStatus===UpdateCacheStatus.NOT_CACHED){return status}
return groupStatus}),Promise.resolve(UpdateCacheStatus.NOT_CACHED))})}
cleanup(){return __awaiter$2(this,void 0,void 0,function*(){yield Promise.all(this.assetGroups.map(group=>group.cleanup()));yield Promise.all(this.dataGroups.map(group=>group.cleanup()))})}
get appData(){return this.manifest.appData||null}
acceptsTextHtml(req){const accept=req.headers.get('Accept');if(accept===null){return!1}
const values=accept.split(',');return values.some(value=>value.trim().toLowerCase()==='text/html')}}
var __awaiter$3=(undefined&&undefined.__awaiter)||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}
function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}
function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}
step((generator=generator.apply(thisArg,_arguments||[])).next())})};const DEBUG_LOG_BUFFER_SIZE=100;class DebugHandler{constructor(driver,adapter){this.driver=driver;this.adapter=adapter;this.debugLogA=[];this.debugLogB=[]}
handleFetch(req){return __awaiter$3(this,void 0,void 0,function*(){const[state,versions,idle]=yield Promise.all([this.driver.debugState(),this.driver.debugVersions(),this.driver.debugIdleState(),]);const msgState=`NGSW Debug Info:

Driver state: ${state.state} (${state.why})
Latest manifest hash: ${state.latestHash || 'none'}
Last update check: ${this.since(state.lastUpdateCheck)}`;const msgVersions=versions.map(version=>`=== Version ${version.hash} ===

Clients: ${version.clients.join(', ')}`).join('\n\n');const msgIdle=`=== Idle Task Queue ===
Last update tick: ${this.since(idle.lastTrigger)}
Last update run: ${this.since(idle.lastRun)}
Task queue:
${idle.queue.map(v => ' * ' + v).join('\n')}

Debug log:
${this.formatDebugLog(this.debugLogB)}
${this.formatDebugLog(this.debugLogA)}
`;return this.adapter.newResponse(`${msgState}

${msgVersions}

${msgIdle}`,{headers:this.adapter.newHeaders({'Content-Type':'text/plain'})})})}
since(time){if(time===null){return'never'}
let age=this.adapter.time-time;const days=Math.floor(age/86400000);age=age%86400000;const hours=Math.floor(age/3600000);age=age%3600000;const minutes=Math.floor(age/60000);age=age%60000;const seconds=Math.floor(age/1000);const millis=age%1000;return''+(days>0?`${days}d`:'')+(hours>0?`${hours}h`:'')+(minutes>0?`${minutes}m`:'')+(seconds>0?`${seconds}s`:'')+(millis>0?`${millis}u`:'')}
log(value,context=''){if(this.debugLogA.length===DEBUG_LOG_BUFFER_SIZE){this.debugLogB=this.debugLogA;this.debugLogA=[]}
if(typeof value!=='string'){value=this.errorToString(value)}
this.debugLogA.push({value,time:this.adapter.time,context})}
errorToString(err){return `${err.name}(${err.message}, ${err.stack})`}
formatDebugLog(log){return log.map(entry=>`[${this.since(entry.time)}] ${entry.value} ${entry.context}`).join('\n')}}
var __awaiter$4=(undefined&&undefined.__awaiter)||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}
function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}
function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}
step((generator=generator.apply(thisArg,_arguments||[])).next())})};class IdleScheduler{constructor(adapter,threshold,debug){this.adapter=adapter;this.threshold=threshold;this.debug=debug;this.queue=[];this.scheduled=null;this.empty=Promise.resolve();this.emptyResolve=null;this.lastTrigger=null;this.lastRun=null}
trigger(){return __awaiter$4(this,void 0,void 0,function*(){this.lastTrigger=this.adapter.time;if(this.queue.length===0){return}
if(this.scheduled!==null){this.scheduled.cancel=!0}
const scheduled={cancel:!1,};this.scheduled=scheduled;yield this.adapter.timeout(this.threshold);if(scheduled.cancel){return}
this.scheduled=null;yield this.execute()})}
execute(){return __awaiter$4(this,void 0,void 0,function*(){this.lastRun=this.adapter.time;while(this.queue.length>0){const queue=this.queue;this.queue=[];yield queue.reduce((previous,task)=>__awaiter$4(this,void 0,void 0,function*(){yield previous;try{yield task.run()}
catch(err){this.debug.log(err,`while running idle task ${task.desc}`)}}),Promise.resolve())}
if(this.emptyResolve!==null){this.emptyResolve();this.emptyResolve=null}
this.empty=Promise.resolve()})}
schedule(desc,run){this.queue.push({desc,run});if(this.emptyResolve===null){this.empty=new Promise(resolve=>{this.emptyResolve=resolve})}}
get size(){return this.queue.length}
get taskDescriptions(){return this.queue.map(task=>task.desc)}}
function hashManifest(manifest){return sha1(JSON.stringify(manifest))}
function isMsgCheckForUpdates(msg){return msg.action==='CHECK_FOR_UPDATES'}
function isMsgActivateUpdate(msg){return msg.action==='ACTIVATE_UPDATE'}
var __awaiter$5=(undefined&&undefined.__awaiter)||function(thisArg,_arguments,P,generator){return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value))}catch(e){reject(e)}}
function rejected(value){try{step(generator["throw"](value))}catch(e){reject(e)}}
function step(result){result.done?resolve(result.value):new P(function(resolve){resolve(result.value)}).then(fulfilled,rejected)}
step((generator=generator.apply(thisArg,_arguments||[])).next())})};const IDLE_THRESHOLD=5000;const SUPPORTED_CONFIG_VERSION=1;const NOTIFICATION_OPTION_NAMES=['actions','badge','body','dir','icon','lang','renotify','requireInteraction','tag','vibrate','data'];var DriverReadyState;(function(DriverReadyState){DriverReadyState[DriverReadyState.NORMAL=0]="NORMAL";DriverReadyState[DriverReadyState.EXISTING_CLIENTS_ONLY=1]="EXISTING_CLIENTS_ONLY";DriverReadyState[DriverReadyState.SAFE_MODE=2]="SAFE_MODE"})(DriverReadyState||(DriverReadyState={}));class Driver{constructor(scope,adapter,db){this.scope=scope;this.adapter=adapter;this.db=db;this.state=DriverReadyState.NORMAL;this.stateMessage='(nominal)';this.initialized=null;this.clientVersionMap=new Map();this.versions=new Map();this.latestHash=null;this.lastUpdateCheck=null;this.scheduledNavUpdateCheck=!1;this.loggedInvalidOnlyIfCachedRequest=!1;this.scope.addEventListener('install',(event)=>{event.waitUntil(this.scope.skipWaiting())});this.scope.addEventListener('activate',(event)=>{event.waitUntil(this.scope.clients.claim());if(this.scope.registration.active!==null){this.scope.registration.active.postMessage({action:'INITIALIZE'})}});this.scope.addEventListener('fetch',(event)=>this.onFetch(event));this.scope.addEventListener('message',(event)=>this.onMessage(event));this.scope.addEventListener('push',(event)=>this.onPush(event));this.debugger=new DebugHandler(this,this.adapter);this.idle=new IdleScheduler(this.adapter,IDLE_THRESHOLD,this.debugger)}
onFetch(event){const req=event.request;if(this.adapter.parseUrl(req.url,this.scope.registration.scope).path==='/ngsw/state'){event.respondWith(this.debugger.handleFetch(req));return}
if(this.state===DriverReadyState.SAFE_MODE){event.waitUntil(this.idle.trigger());return}
if(req.cache==='only-if-cached'&&req.mode!=='same-origin'){if(!this.loggedInvalidOnlyIfCachedRequest){this.loggedInvalidOnlyIfCachedRequest=!0;this.debugger.log(`Ignoring invalid request: 'only-if-cached' can be set only with 'same-origin' mode`,`Driver.fetch(${req.url}, cache: ${req.cache}, mode: ${req.mode})`)}
return}
event.respondWith(this.handleFetch(event))}
onMessage(event){if(this.state===DriverReadyState.SAFE_MODE){return}
const data=event.data;if(!data||!data.action){return}
if(data.action==='INITIALIZE'){if(this.initialized===null){this.initialized=this.initialize();event.waitUntil((()=>__awaiter$5(this,void 0,void 0,function*(){yield this.initialized;yield this.idle.trigger()}))())}
return}
if(!this.adapter.isClient(event.source)){return}
event.waitUntil(this.handleMessage(data,event.source))}
onPush(msg){if(!msg.data){return}
msg.waitUntil(this.handlePush(msg.data.json()))}
handleMessage(msg,from){return __awaiter$5(this,void 0,void 0,function*(){if(isMsgCheckForUpdates(msg)){const action=(()=>__awaiter$5(this,void 0,void 0,function*(){yield this.checkForUpdate()}))();yield this.reportStatus(from,action,msg.statusNonce)}
else if(isMsgActivateUpdate(msg)){yield this.reportStatus(from,this.updateClient(from),msg.statusNonce)}})}
handlePush(data){return __awaiter$5(this,void 0,void 0,function*(){yield this.broadcast({type:'PUSH',data,});if(!data.notification||!data.notification.title){return}
const desc=data.notification;let options={};NOTIFICATION_OPTION_NAMES.filter(name=>desc.hasOwnProperty(name)).forEach(name=>options[name]=desc[name]);yield this.scope.registration.showNotification(desc.title,options)})}
reportStatus(client,promise,nonce){return __awaiter$5(this,void 0,void 0,function*(){const response={type:'STATUS',nonce,status:!0};try{yield promise;client.postMessage(response)}
catch(e){client.postMessage(Object.assign({},response,{status:!1,error:e.toString()}))}})}
updateClient(client){return __awaiter$5(this,void 0,void 0,function*(){const existing=this.clientVersionMap.get(client.id);if(existing===this.latestHash){return}
let previous=undefined;if(existing!==undefined){const existingVersion=this.versions.get(existing);previous=this.mergeHashWithAppData(existingVersion.manifest,existing)}
this.clientVersionMap.set(client.id,this.latestHash);yield this.sync();const current=this.versions.get(this.latestHash);const notice={type:'UPDATE_ACTIVATED',previous,current:this.mergeHashWithAppData(current.manifest,this.latestHash),};client.postMessage(notice)})}
handleFetch(event){return __awaiter$5(this,void 0,void 0,function*(){if(this.initialized===null){this.initialized=this.initialize()}
try{yield this.initialized}
catch(e){this.state=DriverReadyState.SAFE_MODE;this.stateMessage=`Initialization failed due to error: ${errorToString(e)}`;event.waitUntil(this.idle.trigger());return this.safeFetch(event.request)}
if(event.request.mode==='navigate'&&!this.scheduledNavUpdateCheck){this.scheduledNavUpdateCheck=!0;this.idle.schedule('check-updates-on-navigation',()=>__awaiter$5(this,void 0,void 0,function*(){this.scheduledNavUpdateCheck=!1;yield this.checkForUpdate()}))}
const appVersion=yield this.assignVersion(event);if(appVersion===null){event.waitUntil(this.idle.trigger());return this.safeFetch(event.request)}
let res=null;try{res=yield appVersion.handleFetch(event.request,event)}
catch(err){if(err.isCritical){yield this.versionFailed(appVersion,err,this.latestHash===appVersion.manifestHash);event.waitUntil(this.idle.trigger());return this.safeFetch(event.request)}
throw err}
if(res===null){event.waitUntil(this.idle.trigger());return this.safeFetch(event.request)}
event.waitUntil(this.idle.trigger());return res})}
initialize(){return __awaiter$5(this,void 0,void 0,function*(){const table=yield this.db.open('control');let manifests,assignments,latest;try{[manifests,assignments,latest]=yield Promise.all([table.read('manifests'),table.read('assignments'),table.read('latest'),]);this.idle.schedule('init post-load (update, cleanup)',()=>__awaiter$5(this,void 0,void 0,function*(){yield this.checkForUpdate();try{yield this.cleanupCaches()}
catch(err){this.debugger.log(err,'cleanupCaches @ init post-load')}}))}
catch(_){const manifest=yield this.fetchLatestManifest();const hash=hashManifest(manifest);manifests={};manifests[hash]=manifest;assignments={};latest={latest:hash};yield Promise.all([table.write('manifests',manifests),table.write('assignments',assignments),table.write('latest',latest),])}
Object.keys(manifests).forEach((hash)=>{const manifest=manifests[hash];if(!this.versions.has(hash)){this.versions.set(hash,new AppVersion(this.scope,this.adapter,this.db,this.idle,manifest,hash))}});Object.keys(assignments).forEach((clientId)=>{const hash=assignments[clientId];if(this.versions.has(hash)){this.clientVersionMap.set(clientId,hash)}
else{this.clientVersionMap.set(clientId,latest.latest);this.debugger.log(`Unknown version ${hash} mapped for client ${clientId}, using latest instead`,`initialize: map assignments`)}});this.latestHash=latest.latest;if(!this.versions.has(latest.latest)){throw new Error(`Invariant violated (initialize): latest hash ${latest.latest} has no known manifest`)}
yield Promise.all(Object.keys(manifests).map((hash)=>__awaiter$5(this,void 0,void 0,function*(){try{yield this.scheduleInitialization(this.versions.get(hash),this.latestHash===hash)}
catch(err){this.debugger.log(err,`initialize: schedule init of ${hash}`);return!1}})))})}
lookupVersionByHash(hash,debugName='lookupVersionByHash'){if(!this.versions.has(hash)){throw new Error(`Invariant violated (${debugName}): want AppVersion for ${hash} but not loaded`)}
return this.versions.get(hash)}
assignVersion(event){return __awaiter$5(this,void 0,void 0,function*(){const clientId=event.clientId;if(clientId){if(this.clientVersionMap.has(clientId)){const hash=this.clientVersionMap.get(clientId);let appVersion=this.lookupVersionByHash(hash,'assignVersion');if(this.state===DriverReadyState.NORMAL&&hash!==this.latestHash&&appVersion.isNavigationRequest(event.request)){if(this.latestHash===null){throw new Error(`Invariant violated (assignVersion): latestHash was null`)}
const client=yield this.scope.clients.get(clientId);yield this.updateClient(client);appVersion=this.lookupVersionByHash(this.latestHash,'assignVersion')}
return appVersion}
else{if(this.state!==DriverReadyState.NORMAL){return null}
if(this.latestHash===null){throw new Error(`Invariant violated (assignVersion): latestHash was null`)}
this.clientVersionMap.set(clientId,this.latestHash);yield this.sync();return this.lookupVersionByHash(this.latestHash,'assignVersion')}}
else{if(this.state!==DriverReadyState.NORMAL){return null}
if(this.latestHash===null){throw new Error(`Invariant violated (assignVersion): latestHash was null`)}
return this.lookupVersionByHash(this.latestHash,'assignVersion')}})}
fetchLatestManifest(ignoreOfflineError=!1){return __awaiter$5(this,void 0,void 0,function*(){const res=yield this.safeFetch(this.adapter.newRequest('ngsw.json?ngsw-cache-bust='+Math.random()));if(!res.ok){if(res.status===404){yield this.deleteAllCaches();yield this.scope.registration.unregister()}
else if(res.status===504&&ignoreOfflineError){return null}
throw new Error(`Manifest fetch failed! (status: ${res.status})`)}
this.lastUpdateCheck=this.adapter.time;return res.json()})}
deleteAllCaches(){return __awaiter$5(this,void 0,void 0,function*(){yield(yield this.scope.caches.keys()).filter(key=>key.startsWith('ngsw:')).reduce((previous,key)=>__awaiter$5(this,void 0,void 0,function*(){yield Promise.all([previous,this.scope.caches.delete(key),])}),Promise.resolve())})}
scheduleInitialization(appVersion,latest){return __awaiter$5(this,void 0,void 0,function*(){const initialize=()=>__awaiter$5(this,void 0,void 0,function*(){try{yield appVersion.initializeFully()}
catch(err){this.debugger.log(err,`initializeFully for ${appVersion.manifestHash}`);yield this.versionFailed(appVersion,err,latest)}});if(this.scope.registration.scope.indexOf('://localhost')>-1){return initialize()}
this.idle.schedule(`initialization(${appVersion.manifestHash})`,initialize)})}
versionFailed(appVersion,err,latest){return __awaiter$5(this,void 0,void 0,function*(){const broken=Array.from(this.versions.entries()).find(([hash,version])=>version===appVersion);if(broken===undefined){return}
const brokenHash=broken[0];if(this.latestHash===brokenHash||latest){this.state=DriverReadyState.EXISTING_CLIENTS_ONLY;this.stateMessage=`Degraded due to failed initialization: ${errorToString(err)}`;Array.from(this.clientVersionMap.keys()).forEach(clientId=>this.clientVersionMap.delete(clientId))}
else{const affectedClients=Array.from(this.clientVersionMap.keys()).filter(clientId=>this.clientVersionMap.get(clientId)===brokenHash);affectedClients.forEach(clientId=>this.clientVersionMap.set(clientId,this.latestHash))}
yield this.sync()})}
setupUpdate(manifest,hash){return __awaiter$5(this,void 0,void 0,function*(){const newVersion=new AppVersion(this.scope,this.adapter,this.db,this.idle,manifest,hash);if(manifest.configVersion!==SUPPORTED_CONFIG_VERSION){yield this.deleteAllCaches();yield this.scope.registration.unregister();throw new Error(`Invalid config version: expected ${SUPPORTED_CONFIG_VERSION}, got ${manifest.configVersion}.`)}
yield newVersion.initializeFully(this);this.versions.set(hash,newVersion);this.latestHash=hash;yield this.sync();yield this.notifyClientsAboutUpdate()})}
checkForUpdate(){return __awaiter$5(this,void 0,void 0,function*(){let hash='(unknown)';try{const manifest=yield this.fetchLatestManifest(!0);if(manifest===null){this.debugger.log('Check for update aborted. (Client or server offline.)');return!1}
hash=hashManifest(manifest);if(this.versions.has(hash)){return!1}
yield this.setupUpdate(manifest,hash);return!0}
catch(err){this.debugger.log(err,`Error occurred while updating to manifest ${hash}`);this.state=DriverReadyState.EXISTING_CLIENTS_ONLY;this.stateMessage=`Degraded due to failed initialization: ${errorToString(err)}`;return!1}})}
sync(){return __awaiter$5(this,void 0,void 0,function*(){const table=yield this.db.open('control');const manifests={};this.versions.forEach((version,hash)=>{manifests[hash]=version.manifest});const assignments={};this.clientVersionMap.forEach((hash,clientId)=>{assignments[clientId]=hash});const latest={latest:this.latestHash,};yield Promise.all([table.write('manifests',manifests),table.write('assignments',assignments),table.write('latest',latest),])})}
cleanupCaches(){return __awaiter$5(this,void 0,void 0,function*(){const activeClients=(yield this.scope.clients.matchAll()).map(client=>client.id);const knownClients=Array.from(this.clientVersionMap.keys());knownClients.filter(id=>activeClients.indexOf(id)===-1).forEach(id=>this.clientVersionMap.delete(id));const usedVersions=new Set();this.clientVersionMap.forEach((version,_)=>usedVersions.add(version));const obsoleteVersions=Array.from(this.versions.keys()).filter(version=>!usedVersions.has(version)&&version!==this.latestHash);yield obsoleteVersions.reduce((previous,version)=>__awaiter$5(this,void 0,void 0,function*(){yield previous;try{const instance=this.versions.get(version);this.versions.delete(version);yield instance.cleanup()}
catch(err){this.debugger.log(err,`cleanupCaches - cleanup ${version}`)}}),Promise.resolve());yield this.sync()})}
lookupResourceWithHash(url,hash){return Array.from(this.versions.values()).reduce((prev,version)=>__awaiter$5(this,void 0,void 0,function*(){if((yield prev)!==null){return prev}
return version.lookupResourceWithHash(url,hash)}),Promise.resolve(null))}
lookupResourceWithoutHash(url){return __awaiter$5(this,void 0,void 0,function*(){yield this.initialized;const version=this.versions.get(this.latestHash);return version.lookupResourceWithoutHash(url)})}
previouslyCachedResources(){return __awaiter$5(this,void 0,void 0,function*(){yield this.initialized;const version=this.versions.get(this.latestHash);return version.previouslyCachedResources()})}
recentCacheStatus(url){const version=this.versions.get(this.latestHash);return version.recentCacheStatus(url)}
mergeHashWithAppData(manifest,hash){return{hash,appData:manifest.appData,}}
notifyClientsAboutUpdate(){return __awaiter$5(this,void 0,void 0,function*(){yield this.initialized;const clients=yield this.scope.clients.matchAll();const next=this.versions.get(this.latestHash);yield clients.reduce((previous,client)=>__awaiter$5(this,void 0,void 0,function*(){yield previous;const version=this.clientVersionMap.get(client.id);if(version===undefined){return}
if(version===this.latestHash){return}
const current=this.versions.get(version);const notice={type:'UPDATE_AVAILABLE',current:this.mergeHashWithAppData(current.manifest,version),available:this.mergeHashWithAppData(next.manifest,this.latestHash),};client.postMessage(notice)}),Promise.resolve())})}
broadcast(msg){return __awaiter$5(this,void 0,void 0,function*(){const clients=yield this.scope.clients.matchAll();clients.forEach(client=>{client.postMessage(msg)})})}
debugState(){return __awaiter$5(this,void 0,void 0,function*(){return{state:DriverReadyState[this.state],why:this.stateMessage,latestHash:this.latestHash,lastUpdateCheck:this.lastUpdateCheck,}})}
debugVersions(){return __awaiter$5(this,void 0,void 0,function*(){return Array.from(this.versions.keys()).map(hash=>{const version=this.versions.get(hash);const clients=Array.from(this.clientVersionMap.entries()).filter(([clientId,version])=>version===hash).map(([clientId,version])=>clientId);return{hash,manifest:version.manifest,clients,status:'',}})})}
debugIdleState(){return __awaiter$5(this,void 0,void 0,function*(){return{queue:this.idle.taskDescriptions,lastTrigger:this.idle.lastTrigger,lastRun:this.idle.lastRun,}})}
safeFetch(req){return __awaiter$5(this,void 0,void 0,function*(){try{return yield this.scope.fetch(req)}
catch(err){this.debugger.log(err,`Driver.fetch(${req.url})`);return this.adapter.newResponse(null,{status:504,statusText:'Gateway Timeout',})}})}}
function errorToString(error){if(error instanceof Error){return `${error.message}\n${error.stack}`}
else{return `${error}`}}
const scope=self;const adapter=new Adapter();const driver=new Driver(scope,adapter,new CacheDatabase(scope,adapter))}())
