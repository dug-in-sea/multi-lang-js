## 前端多语言（json文件）加载器

**script引入：** 
- ` https://xxxx/js/multi-lang.js`
  

    

 **npm安装**
- `npm install multi-lang-js --save`


**使用示例**

```javascript

<script src="/assets/js/vue.min.js"></script>
<script src="https://xxxx/js/multi-lang.js"></script>
<script>
var vue_app_body = new Vue({
        el: '#bigo_lang_e',
        data: {
                langContent:{
                }
        }
});
// 1：
var multiLang = new MultiLang() 
//2：import multiLang from 'multi-lang-js';

multiLang.init({
    path: 'css/',
    dataType:'json',
    name: {
        'en': 'lang_en.txt',
        'cn': 'lang_cn.txt',
        'tw': 'lang_cn.txt',
        'th': 'lang_th.txt',
        'vn': 'lang_vn.txt',
        'ru': 'lang_ru.txt',
        'ko': 'lang_ko.txt',
        'id': 'lang_id.txt'
    },
    callback: function(data, langName){
        vue_app_body.langContent = data;
        // 第二个参数推荐不再使用，为了兼容而存在。返回的是浏览器语言名。如 cn
        // 如需获取语言相关。请用 this.appLang 等。请看其3个语言相关属性。
    }
});
</script>

```
**对象multiLang，有3个语言相关属性** 

|属性名|类型|说明|
|:-----   |:-----|-----                           |
|appLang     |str   |对象初始化即可获得，如：cn  |
|appLangString |str   |对象初始化即可获得，如：zh-cn |
|packageLang     |str   |init()之后获得，表示加载的语言包。如 vn  |

**multiLang.init() 初始化参数说明** 

|参数名|类型|说明|
|:-----   |:-----|-----                           |
|path     |str   |翻译文本的相对路径，这里我把所有翻译文本放到css文件夹下  |
|dataType |str   |值为 txt 或者json。可忽略此参数，默认为json，值为txt时，则返回的是txt文本  |
|name     |obj   |各个语言对应加载的翻译文本，属性名不可改，对应的文本名字可以改  |
|callback |fun   |回调的第一个参数是加载到的json(或者文本)数据，该函数中this指向new出的对象  |
 
**multiLang.setLang(langname,callback) 设置语言** 

如果你觉得multiLang.setLang 使用麻烦，也可以：localStorage.lang=langname，这种写法
注意：设置语言，会让全站语言都立马改动，demo可参考github上的页面。开多个页签试试
 
 |参数名|类型|说明|
|:-----   |:-----|-----                           |
|langname     |str   |必须设置，你要设置的语言名  |
|callback     |function   |可选的回调函数  |


**测试支持**

初始化判断何种语言：先查浏览器地址栏参数有lang 参数，其次查 localStorage.lang的值，最后看浏览器语言
所以为了测试预览，你可以在地址后带入参数，lang=en(你想要的语言)。
 
**说明**

如果你配置的name中，没有（比如当前埃及用户访问），则尝试使用en（英文），如果英文也没有配置，则使用配置的“第一个”语言包。
  



