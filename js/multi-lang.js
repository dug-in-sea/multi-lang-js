function MultiLang () {
    this.langname = ''
    this.initArguments = {}
}
MultiLang.prototype.langZip = [
    ['cn', 'cn,zh,zh-hans,zh-cn,zh-hans-cn,zh-sg,zh-hans-sg'],
    ['tw', 'tw,zh-hant,zh-hk,zh-mo,zh-tw,zh-hant-hk,zh-hant-mo,zh-hant-tw'],
    ['en', 'en,en-au,en-bz,en-ca,en-cb,en-ie,en-jm,en-nz,en-ph,en-za,en-tt,en-gb,en-us,en-zw,en-sg'],
    ['th', 'th,th-th'],
    ['vn', 'vn,vi-vn,vi,vn-vn'],
    ['ru', 'ru,ru-ru,ru-mo'],
    ['id', 'id,id-id,in-id'],
    ['ko', 'ko,ko-kr'],
    ['in', 'in,hi,hi-in'],
    ['kh', 'kh'],
    ['sg', 'sg'],
    ['ar', 'ar,ar-sa,ar-eg,ar-dz,ar-tn,ar-ye,ar-jo,ar-kw,ar-bh,ar-iq,ar-ly,ar-ma,ar-om,ar-sy,ar-lb,ar-ae,ar-qa'],
    ['af', 'af,af-za'],
    ['tr', 'tr'],
    ['es', 'es,es-ar,es-bo,es-cl,es-co,es-cr,es-do,es-ec,es-es,es-gt,es-hn,es-mx,es-ni,es-pa,es-pe,es-pr,es-py,es-sv,es-uy,es-ve,es-xl'],
    ['my', 'ms,ms-bn,ms-my,my'],
    ['pt', 'pt,pt-pt,pt-br'],
    ['ja', 'ja,ja-jp,ja-ja,jp,jp-jp'],
    ['ur', 'ur,ur-pk']
]
MultiLang.prototype.getLangFromUrl = function (name) {
    var search = window.location.search,
        argArr = search ? search.slice(1).split('&') : [],
        argName = name || 'lang',
        argObj = {},
        j = 0
    for (var i = 0, len = argArr.length; i < len; i++) {
        j = argArr[i].indexOf('=')
        argObj[argArr[i].slice(0, j)] = argArr[i].slice(j + 1)
    }
    return argObj[argName]
}
MultiLang.prototype.getAppLang = function () {
    var navigatorLangStr = this.getLangFromUrl('lang') || window.localStorage.lang || (navigator.language || navigator.userLanguage).toLowerCase(),
    langArr = this.langZip,
    len = langArr.length,
    appLang = 'en'
    for (var i = 0; i < len; i++) {
        if (langArr[i][1].split(',').indexOf(navigatorLangStr) > -1) {
            appLang = langArr[i][0]
            break;
        }
    }
    return appLang
}
MultiLang.prototype.init = function (arg) {
    this.initArguments = arg
    this.initLang()
}
MultiLang.prototype.initLang = function () {
    var allFileName = this.initArguments.name,
        langName = this.getAppLang()
    this.langname = langName
    if (!allFileName[langName]) {
        langName = 'en'
    }
    this.loadLangContent(allFileName[langName])
}
MultiLang.prototype.ajaxGet = function (requestUrl, callback) {
    var xmlhttp = {}
    if (window.XMLHttpRequest) {
        xmlhttp = new window.XMLHttpRequest()
    }else{
        xmlhttp = new window.ActiveXObject('Microsoft.XMLHTTP')
    }
    xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			if (typeof callback === 'function') {
			    callback(xmlhttp.responseText)
			}
		}
	}
    xmlhttp.open('GET', requestUrl, true)
    xmlhttp.send()
}
MultiLang.prototype.loadLangContent = function (fileName) {
    var that = this
    this.ajaxGet(this.initArguments.path + fileName, function (data) {
        var jsondata = that.initArguments.dataType === 'txt' ? data : JSON.parse(data)
        that.initArguments.callback(jsondata, that.langname)
    })
}
MultiLang.prototype.setLang = function (langName, callback) {
    window.localStorage.lang = this.langname = langName
    this.init(this.initArguments)
    if (typeof callback === 'function') {
        callback()
    }
}
