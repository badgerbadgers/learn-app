if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),o={module:{uri:i},exports:t,require:r};s[i]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-6316bd60"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0-3eda557532110eaf.js",revision:"3eda557532110eaf"},{url:"/_next/static/chunks/14-8dd5cb64dbeb45fd.js",revision:"8dd5cb64dbeb45fd"},{url:"/_next/static/chunks/19-870c0c5a4fb6d1b5.js",revision:"870c0c5a4fb6d1b5"},{url:"/_next/static/chunks/376-7c0646a5a8ad7248.js",revision:"7c0646a5a8ad7248"},{url:"/_next/static/chunks/419-3a6ba1f0f8aa2c4a.js",revision:"3a6ba1f0f8aa2c4a"},{url:"/_next/static/chunks/473-651c6d2af1ea0238.js",revision:"651c6d2af1ea0238"},{url:"/_next/static/chunks/505-ca9c8ae5ec95d656.js",revision:"ca9c8ae5ec95d656"},{url:"/_next/static/chunks/669-692f2cd1d7d28705.js",revision:"692f2cd1d7d28705"},{url:"/_next/static/chunks/675-70e004358e94a689.js",revision:"70e004358e94a689"},{url:"/_next/static/chunks/854-71d93f02eff64166.js",revision:"71d93f02eff64166"},{url:"/_next/static/chunks/874-e007db146440c858.js",revision:"e007db146440c858"},{url:"/_next/static/chunks/902-ef65be3c8c87cc35.js",revision:"ef65be3c8c87cc35"},{url:"/_next/static/chunks/963-508233879218551e.js",revision:"508233879218551e"},{url:"/_next/static/chunks/framework-91d7f78b5b4003c8.js",revision:"91d7f78b5b4003c8"},{url:"/_next/static/chunks/main-8eba7196588d5fdb.js",revision:"8eba7196588d5fdb"},{url:"/_next/static/chunks/pages/_app-62c6c134cedf4b44.js",revision:"62c6c134cedf4b44"},{url:"/_next/static/chunks/pages/_error-2280fa386d040b66.js",revision:"2280fa386d040b66"},{url:"/_next/static/chunks/pages/dashboard-20c185a659fff3e1.js",revision:"20c185a659fff3e1"},{url:"/_next/static/chunks/pages/index-46b26a0f09a65892.js",revision:"46b26a0f09a65892"},{url:"/_next/static/chunks/pages/knowledge-base/pair-pgr-page-f1f15e4718d5dfe8.js",revision:"f1f15e4718d5dfe8"},{url:"/_next/static/chunks/pages/knowledge-base/pair-pgr-page/components/PairPrgBody-0db5953219e951d4.js",revision:"0db5953219e951d4"},{url:"/_next/static/chunks/pages/knowledge-base/pair-pgr-page/components/PairPrgNav-3a31adea2c216bdc.js",revision:"3a31adea2c216bdc"},{url:"/_next/static/chunks/pages/knowledge-base/pair-pgr-page/components/PairPrgTitle-03dabd976ca393f3.js",revision:"03dabd976ca393f3"},{url:"/_next/static/chunks/pages/knowledge-base/pair-pgr-page/components/TabPanel-fb0c0a8c6bd18e53.js",revision:"fb0c0a8c6bd18e53"},{url:"/_next/static/chunks/pages/knowledge-base/zones-88cc0c32e06f63fb.js",revision:"88cc0c32e06f63fb"},{url:"/_next/static/chunks/pages/knowledge-base/zones/components/DisplayZones-35fca238baf5173f.js",revision:"35fca238baf5173f"},{url:"/_next/static/chunks/pages/knowledge-base/zones/components/SideNav-e1421cb392bf40a5.js",revision:"e1421cb392bf40a5"},{url:"/_next/static/chunks/pages/portfolios/%5Bid%5D-9073a95a750c2344.js",revision:"9073a95a750c2344"},{url:"/_next/static/chunks/pages/portfolios/components/ContactCard-bb98a3d4c1876282.js",revision:"bb98a3d4c1876282"},{url:"/_next/static/chunks/pages/portfolios/components/MediaCard-4f3e226ba95229a8.js",revision:"4f3e226ba95229a8"},{url:"/_next/static/chunks/pages/portfolios/components/PreviousIndustryCard-70eee75fff3ba7dc.js",revision:"70eee75fff3ba7dc"},{url:"/_next/static/chunks/pages/portfolios/components/SkillsCard-dd6d3b66e785ba19.js",revision:"dd6d3b66e785ba19"},{url:"/_next/static/chunks/pages/userform/%5Bid%5D-25d0c86e32f922a8.js",revision:"25d0c86e32f922a8"},{url:"/_next/static/chunks/pages/userform/%5Bid%5D/components/UsersForm-6cc00d1462473441.js",revision:"6cc00d1462473441"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-2e51481b1d484a05.js",revision:"2e51481b1d484a05"},{url:"/_next/static/css/33916152a8a1f30d.css",revision:"33916152a8a1f30d"},{url:"/_next/static/css/99bc201614cb204e.css",revision:"99bc201614cb204e"},{url:"/_next/static/ufBkR3gw-FSbGb8aB3qhW/_buildManifest.js",revision:"aad56413e17e8e4f0c64115636a43712"},{url:"/_next/static/ufBkR3gw-FSbGb8aB3qhW/_middlewareManifest.js",revision:"fb2823d66b3e778e04a3f681d0d2fb19"},{url:"/_next/static/ufBkR3gw-FSbGb8aB3qhW/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/favicon.ico",revision:"bf13f2a2a4219db2db29f8a3918eeefe"},{url:"/icon-192x192.png",revision:"b8c78262d1eefa33f8d5ea4cf65358b9"},{url:"/icon-256x256.png",revision:"f34ec499c1e443643b258eada6d9d83d"},{url:"/icon-384x384.png",revision:"99ccd22ae8748cc60e11c98e76be238d"},{url:"/icon-512x512.png",revision:"bae6cf909af2942847c3ffa9325826d1"},{url:"/img/CTD-Labs_Primary-Blue-BG[1].png",revision:"4efca2cddb9aec8af21267acd2fec5c5"},{url:"/img/CTD-Labs_Primary[1].png",revision:"bdbeefd69c255ef08f2bf829a273a13e"},{url:"/img/Kodayi-temple.jpg",revision:"0e71d069abdd022f39b1cac86b05fb4e"},{url:"/img/Laurindo-pic.png",revision:"b891b7f7bacb4087de14e1ce87935a40"},{url:"/img/ctd-logo.png",revision:"dfa2dbcdf6b4e627726e15b57af1608d"},{url:"/img/loading.gif",revision:"cffa9d9d88890cfcd0ae3d6dd7a6efa9"},{url:"/img/pairProgrImages/1.png",revision:"a42f36dd0999603ea9de91c70bdf7589"},{url:"/img/pairProgrImages/2-1.png",revision:"95683f07294de6728fbf8afa91485618"},{url:"/img/pairProgrImages/2.png",revision:"822a13a70741cafc09bfebeb28e82a9c"},{url:"/img/pairProgrImages/3.png",revision:"e5f8704f3c0f528d61b6a8abb1842fb9"},{url:"/img/pairProgrImages/4.png",revision:"ccfb78c879a51ddef1adcc9cbc7dfabc"},{url:"/manifest.json",revision:"db2a708e183f9d7733f0360294fa7cf4"},{url:"/resume/LaurindoMugingaResume.pdf",revision:"73a990e37811cb4d5593aa0ee02cb423"},{url:"/vercel.svg",revision:"26bf2d0adaf1028a4d4c6ee77005e819"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));