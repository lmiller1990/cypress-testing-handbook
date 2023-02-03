import{_ as s,c as a,o as t,a as e}from"./app.db52dab8.js";const n="/cypress-testing-handbook/assets/getting-started-1.08f5638e.png",p="/cypress-testing-handbook/assets/getting-started-2.ebda6f07.png",_=JSON.parse('{"title":"Getting Started","description":"","frontmatter":{},"headers":[],"relativePath":"getting-started.md"}'),o={name:"getting-started.md"},l=e(`<h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h1><p>The examples in this guide use <a href="https://vitejs.dev" target="_blank" rel="noreferrer">Vite</a>, which has templates for React, Vue, and other frameworks. It also uses TypeScript, although this won&#39;t impact the vast majority of examples.</p><p>Create a new Vue app by running</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">create</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vite@latest</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo-vue</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">--template</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">vue-ts</span></span>
<span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">demo-vue</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">cypress</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">typescript</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># optional - adding tailwind</span></span>
<span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tailwindcss</span></span>
<span class="line"><span style="color:#FFCB6B;">npx</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">tailwindcss</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">init</span></span>
<span class="line"></span></code></pre></div><p>Open Cypress with <code>npx cypress open</code>. You should see</p><p><img src="`+n+'" alt=""></p><p>Click &quot;Component Testing&quot;, follow the prompts - it will scaffold a few files. Click you favorite browser, and now you are in Cypress!</p><p><img src="'+p+'" alt=""></p><p>Head into the next section to start creating components and tests!</p>',9),r=[l];function c(i,C,d,y,g,h){return t(),a("div",null,r)}const D=s(o,[["render",c]]);export{_ as __pageData,D as default};
