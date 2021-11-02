import{O as d,V as f}from"./vue-class-component.b52a4e7f.js";import{t as c}from"./tsparticles.8e768620.js";import{k as u,a8 as h,y as m}from"./@vue.1f834f0a.js";/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function P(s,t,e,i){var o=arguments.length,r=o<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,t,e,i);else for(var l=s.length-1;l>=0;l--)(n=s[l])&&(r=(o<3?n(r):o>3?n(t,e,r):n(t,e))||r);return o>3&&r&&Object.defineProperty(t,e,r),r}let a=class extends f{mounted(){m(()=>{var t;if(!this.id)throw new Error("Prop 'id' is required!");c.init(),this.particlesInit&&this.particlesInit(c);const e=i=>{this.container=i,this.particlesLoaded&&i&&this.particlesLoaded(i)};this.url?c.loadJSON(this.id,this.url).then(e):c.load(this.id,(t=this.options)!==null&&t!==void 0?t:{}).then(e)})}beforeDestroy(){this.container&&this.container.destroy()}};a=P([d({props:{id:{type:String,required:!0},options:{type:Object},url:{type:String},particlesLoaded:{type:Object},particlesInit:{type:Function}}})],a);var p=a;const v=["id"];function b(s,t,e,i,o,r){return u(),h("div",{id:s.id},null,8,v)}p.render=b;p.__file="src/Particles/Particles.vue";const V=(s,t)=>{s.component("Particles",p)};export{V};
