# CSS 的架构

### 核心策略有
- ITCSS / SMACSS  : 负责项目的整体架构
- SUITCSS / BEM   ： 块级管理
- OOCSS ： 
- ACSS

###  详情
1. ITCSS (iverted triangle),包含七层
  - Settings： 全局变量，比如颜色，字体大小
```css

$yellow:#faaf00
$yellow-bright:#Fa7f0

```
  - Tools： mixin，function 等
  - Generic： reset.css/ normalize.css等
  - Base： type selector，如p
  - Objects： Cosmetic-free
```css
.o-container{
  box-sizing:border-box;
  margin:0 auto;
}
```
  - Components: UI组件，具体实现层
```css
# button组件

.c-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  ...

  &--primary {
    background-color: #ff5959;
    color: #fff;
  }

  &--large {
    font-size: 16px;
    padding: 16px 14px;
    ...
  }
}
```
```html
<a class="c-btn c-btn--primary" href="#">sample</a>
<a class="c-btn c-btn--primary c-btn--large" href="#">sample</a>
```
  - Trumps：放helper，只有这层可以放 ！important
```css
.u-color {
  &--white {
    color: $white !important;
  }
}

.u-hidden {
  display: hidden !important;
}
```

2. SMACSS 五个层次使得项目更结构化
  - Base ： Html element & default
  - Layout ： Page structure
  - Module ： Re-usable code block
  - State  ： Active / Inactive etc
  - Theme 
3. OOCSS：
  - 结构表现分离
  - 容器内容分离
```css
.box{
  width:100px;
  height:200px;
}
.box-theme{
  background:red;
}

.list{
  list-style:none;
  display:flex;
  justify-content:center;
}

.list__item{
  padding: 0 4px;
  text-align:center;
}

```
4. ACSS:原子css
```css
mt-20{
  margin-top:20px;
}
b-full{
  width:100%;
}
```

### 经对以上总结，合理的组合有利于代码的持续进行和开发者轻松管理，以ITCSS为核心，自上至下和其他策略配合进行，以以下分工组织：
- ITCSS的Setting层，一般是全局变量，函数，可以放把 SMACSS的THEME放在此处，随着css的发展 less/sass 退化后 可以不考虑函数;文件命名：_setting.global.css
- ITCSS的GEneric层，第三方reset ;文件命名：_generic.reset.css
- ITCSS的Base层，和上层一样，只是此处是对 HTML Element的全局设置；文件命名：_element.heading.css
- ITCSS的Object层，基础的抽象结构，不包含Theme；文件命名： _object.layout.css
- ITCSS的Component层，此处是具体的实现层，可以充分利用 BEM ，OOCSS了;文件命名：_component.buttons.css
- ITCSS的Trumpt层， 重写;文件命名：_trumps.links.css