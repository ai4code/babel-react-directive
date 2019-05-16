# Babel-React-Directive
> React jsx添加循环指令m-for、判断指令m-if、数据绑定指令m-bind-组件属性。
## start

 > npm install brd-cli -g <br/>
 > brd-cli compile [文件夹/文件路径] [type:1-文件夹 0-文件]<br/>

### example 

> path C:\example <br/>
> brd-cli compile example 1 <br/>
> brd-cli compile example/index.js 0 <br/>
> 路径为当前执行cmd得相对位置 <br/>

## m-for

> 1.支持绑定amVAR中变量 <br/>
> 2.支持循环嵌套引用对象 <br/>

```jsx
<div m-for="(item, index) in amVAR.data">
    <div>{item.title}</div>
    <div m-for="(sitem, sindex) in item.list">
        <div>{sindex}</div>
        <div>{sitem.subtitle}</div>
    </div>
</div>

<script>
    var amVAR = {
        data: [{
            title: '一级标题A',
            list: [{
                subtitle: '二级标题A'
            },{
                subtitle: '二级标题B'
            }]
        },{
            title: '一级标题B',
            list: [{
                subtitle: '二级标题A'
            },{
                subtitle: '二级标题B'
            }]
        }]
    }
</script>
```

## m-bind-属性

> 1.支持绑定amVAR中变量
> 2.支持循环嵌套引用对象

```jsx
<div m-for="(item, index) in data">
    <div amtype="Button" m-bind-text="amVAR.des"></div>
    <div amtype="Button" m-bind-text="item.title">
</div>
<script>
 var amVAR = {
     des: '说明',
     data: [{
         title: '标题'
     }]
 }
</script>
```
## m-if

> 1.支持绑定amVAR中变量
> 2.支持循环嵌套引用对象
> 3.暂不支持绑定表达式

```jsx
<div m-for="(item, index) in data">
    <div amtype="Button" m-if="amVAR.des"></div>
    <div amtype="Button" m-if="item.flag">
</div>
<script>
 var amVAR = {
     des: true,
     data: [{
         flag: false
     }]
 }
</script>
```

