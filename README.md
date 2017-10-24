# multi-lang
前端多语言加载器，配置各个语言的json或txt语言包，初始化时指定哪个语言用哪个语言包。结合vue使用效果更佳


**multiLang.init() 初始化参数说明** 

|参数名|类型|说明|
|:-----   |:-----|-----                           |
|path     |str   |翻译文本的相对路径，这里我把所有翻译文本放到css文件夹下  |
|dataType |str   |值为 txt 或者json。可忽略此参数，默认为json，值为txt时，则返回的是txt文本  |
|name     |obj   |各个语言对应加载的翻译文本，属性名不可改，对应的文本名字可以改  |
|callback |fun   |回调的第一个参数是加载到的json(或者文本)数据，第二个数据是当前客户端的语言名字  |
 
 **multiLang.setLang(langname,callback) 设置语言说明** 
 
 |参数名|类型|说明|
|:-----   |:-----|-----                           |
|langname     |str   |必须设置，你要设置的语言名  |
|callback     |function   |可选的回调函数  |
