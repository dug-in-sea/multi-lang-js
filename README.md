# multi-lang
前端JavaScript多语言加载器，前端部署好各个语言的json或txt语言包，可结合vue等使用。

 npm install multi-lang-js
 https://www.npmjs.com/package/multi-lang-js 

``` 
    <div id="app_lang">
        <h1>{{ langContent.title }}</h1>
        <h1>{{ langContent.name1 }}</h1>
        <h1>{{ langContent.name2 }}</h1>
        <h1>{{ langContent.name3 }}</h1>
    </div>
<script src="js/vue.min.js"></script>
<script src="js/multi-lang.js"></script>
<script>
var vue_app = new Vue({
        el: '#app_lang',
        data: {
                langContent: {
                    //
                }
        }
})
var multiLang = new MultiLang() // 1：
//2：import multiLang from 'multi-lang-js';
//or
//3：var multiLang = require('multi-lang-js');
multiLang.init({
    path: 'css/',
    name: {
        'en': 'lang_en.txt',
        'cn': 'lang_cn.txt',
        'tw': 'lang_cn.txt',
        'th': 'lang_th.txt',
        'vn': 'lang_vn.txt',
        'ru': 'lang_ru.txt',
        'ko': 'lang_ko.txt'
    },
    callback: function (data, langName) {
        vue_app.langContent = data
        if (langName === 'en') {
            //
        }
    }
})
</script>
```

**multiLang.init() 初始化参数说明** 

|参数名|类型|说明|
|:-----   |:-----|-----                           |
|path     |str   |翻译文本的相对路径，这里我把所有翻译文本放到css文件夹下  |
|dataType |str   |值为 txt 或者json。可忽略此参数，默认为json，值为txt时，则返回的是txt文本  |
|name     |obj   |各个语言对应加载的翻译文本，属性名不可改，对应的文本名字可以改  |
|callback |fun   |回调的第一个参数是加载到的json(或者文本)数据，第二个数据是当前客户端的语言名字  |
   
 **multiLang.setLang(langname,callback) 设置语言**  
 **如果你觉得multiLang.setLang 使用麻烦，也可以：localStorage.lang=langname，这种写法 **  
 **注意：设置语言，会让全站语言都立马改动，demo可参考github上的页面。开多个页签试试 **  
  
 
 |参数名|类型|说明|
|:-----   |:-----|-----                           |
|langname     |str   |必须设置，你要设置的语言名  |
|callback     |function   |可选的回调函数  |

 **测试**
 初始化判断当前是何种语言的逻辑：先查浏览器地址栏lang 参数，其次查 localStorage.lang的值，最后看浏览器语言
 
 所以为了测试预览，你可以在地址后带入参数，lang=en(你想要的语言 ru、ko、th等)。

 https://diyao.github.io/multi-lang/
 
  **说明**
如果你配置的name中，没有（比如当前埃及用户访问），则默认会加载英文的显示。
  
  
