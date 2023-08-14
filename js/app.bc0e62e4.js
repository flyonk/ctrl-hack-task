(function(){"use strict";var t={4812:function(t,e,n){var r=n(6369),o=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("h2",[t._v("Тестовое задание для CtrlHack")]),e("router-view")],1)},u=[],i=n(1001),s={},c=(0,i.Z)(s,o,u,!1,null,null,null),a=c.exports,l=n(2631),d=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home"},[e("div",{staticClass:"controls"},[e("div",{staticClass:"item"},[e("input",{directives:[{name:"model",rawName:"v-model.number",value:t.product.price,expression:"product.price",modifiers:{number:!0}}],attrs:{type:"text",name:"price"},domProps:{value:t.product.price},on:{input:[function(e){e.target.composing||t.$set(t.product,"price",t._n(e.target.value))},function(e){return t.debouncedRecount("price")}],blur:function(e){return t.$forceUpdate()}}}),e("p",{staticClass:"description"},[t._v("Цена")])]),e("div",{staticClass:"item"},[e("input",{directives:[{name:"model",rawName:"v-model.number",value:t.product.amount,expression:"product.amount",modifiers:{number:!0}}],attrs:{type:"text",name:"amount"},domProps:{value:t.product.amount},on:{input:[function(e){e.target.composing||t.$set(t.product,"amount",t._n(e.target.value))},function(e){return t.debouncedRecount("amount")}],blur:function(e){return t.$forceUpdate()}}}),e("p",{staticClass:"description"},[t._v("Количество")])]),e("div",{staticClass:"item"},[e("input",{directives:[{name:"model",rawName:"v-model.number",value:t.product.sum,expression:"product.sum",modifiers:{number:!0}}],attrs:{type:"text",name:"sum"},domProps:{value:t.product.sum},on:{input:[function(e){e.target.composing||t.$set(t.product,"sum",t._n(e.target.value))},function(e){return t.debouncedRecount("sum")}],blur:function(e){return t.$forceUpdate()}}}),e("p",{staticClass:"description"},[t._v("Сумма")])]),e("div",{staticClass:"item"},[e("button",{staticClass:"send-btn",on:{click:t.postProductData}},[t._v("Отправить")]),e("pre",{staticClass:"controls--"},[t._v(t._s(t.labelData))])])]),e("h3",[t._v("Измененные данные:")]),t.infoBlock?e("div",{staticClass:"info-block"},t._l(t.infoBlock,(function(n,r){return e("div",{key:r},[e("div",{domProps:{innerHTML:t._s(n)}})])})),0):t._e()])},p=[],m=n(4806),f=n.n(m),v={name:"HomeView",data(){return{labelData:null,nonce:null,lastServerResponse:null,product:{price:0,amount:0,sum:0},infoBlock:[]}},methods:{recountProductData(t){switch(t){case"price":this.product.sum=this.product.price*this.product.amount;break;case"amount":this.product.sum=this.product.price*this.product.amount;break;case"sum":this.product.amount=this.product.sum/this.product.price;break}},postProductData(){const t={nonce:this.nonce,...this.product};if(this.product.amount%2===1)return this.lastServerResponse={success:!1},this.infoBlock.unshift(`\n          <p>Попытка отправить данные: </p>\n          <small>\n           ${JSON.stringify(t).trim()}\n          </small>\n          `),void this.infoBlock.unshift('\n          <p style="color: red">\n            Ошибка при запросе на сервер. Amount должен быть чётным числом: статус {success: false}\n          </p>\n          ');this.nonce++;let e=JSON.stringify(window.localStorage.getItem("product"));e&&(e="данных не было");let n=`\n        <div class="before">\n          <p>Данные отправленные на сервер:</p>\n          <small>${JSON.stringify(t)}</small>\n        </div>\n        <p style="color: green">\n          Успешный ответ с сервера. Статус: {success: true}\n        </p>\n        <div class="after">\n          <p>Было на сервере до отправки данных:</p>\n          <small>${e}</small>\n        </div>\n        \n        `;this.infoBlock.unshift(n),setTimeout((()=>{window.localStorage.setItem("product",JSON.stringify(t)),this.lastServerResponse={success:!0},this.labelData=t}),1e3)},debouncedRecount:f().debounce((function(t){this.recountProductData(t)}),300)},beforeMount(){this.labelData=this.getProductDataFromServer;const t=this.getProductDataFromServer&&this.getProductDataFromServer.nonce?this.getProductDataFromServer.nonce:0;this.nonce=t||0},computed:{computedProductCopy(){return{...this.product}},getProductDataFromServer(){return JSON.parse(window.localStorage.getItem("product"))}},watch:{computedProductCopy:{handler(t,e){for(const n in t)t[n]!==e[n]&&this.infoBlock.unshift(`<p>Значение в ${n} инпуте изменилось с ${e[n]} на ${t[n]}</p>`)},deep:!0}}},h=v,b=(0,i.Z)(h,d,p,!1,null,"57614cac",null),g=b.exports;r.ZP.use(l.ZP);const P=[{path:"/",name:"home",component:g}],w=new l.ZP({routes:P});var _=w,k=n(3822);r.ZP.use(k.ZP);var y=new k.ZP.Store({state:{},getters:{},mutations:{},actions:{},modules:{}});r.ZP.config.productionTip=!1,new r.ZP({router:_,store:y,render:t=>t(a)}).$mount("#app")}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var u=e[r]={id:r,loaded:!1,exports:{}};return t[r].call(u.exports,u,u.exports,n),u.loaded=!0,u.exports}n.m=t,function(){var t=[];n.O=function(e,r,o,u){if(!r){var i=1/0;for(l=0;l<t.length;l++){r=t[l][0],o=t[l][1],u=t[l][2];for(var s=!0,c=0;c<r.length;c++)(!1&u||i>=u)&&Object.keys(n.O).every((function(t){return n.O[t](r[c])}))?r.splice(c--,1):(s=!1,u<i&&(i=u));if(s){t.splice(l--,1);var a=o();void 0!==a&&(e=a)}}return e}u=u||0;for(var l=t.length;l>0&&t[l-1][2]>u;l--)t[l]=t[l-1];t[l]=[r,o,u]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){n.nmd=function(t){return t.paths=[],t.children||(t.children=[]),t}}(),function(){var t={143:0};n.O.j=function(e){return 0===t[e]};var e=function(e,r){var o,u,i=r[0],s=r[1],c=r[2],a=0;if(i.some((function(e){return 0!==t[e]}))){for(o in s)n.o(s,o)&&(n.m[o]=s[o]);if(c)var l=c(n)}for(e&&e(r);a<i.length;a++)u=i[a],n.o(t,u)&&t[u]&&t[u][0](),t[u]=0;return n.O(l)},r=self["webpackChunkctrl_hack_task"]=self["webpackChunkctrl_hack_task"]||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))}();var r=n.O(void 0,[998],(function(){return n(4812)}));r=n.O(r)})();
//# sourceMappingURL=app.bc0e62e4.js.map