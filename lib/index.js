(function (w) {
    function PageCheck(options) {

        const d = w.document;
        const prefix = getPrefix();//兼容浏览器前缀获取一次
        let _options;//存储用户传参

        init();//初始化操作

        function init() {
            _options = Object.assign({}, {
                //默认的页面隐藏时回调方法
                pageHideCallBack: function () {
                    console.log('页面隐藏');
                },
                //默认的页面显示时回调方法
                pageShowCallback: function () {
                    console.log('页面显示');
                }
            }, options?options:{});

            /**
             * 兼容浏览器添加监听事件
             * IE低版本不支持addEventListener
             * */
            d.addEventListener(`${prefix}visibilitychange`, function(e) {
                let state = document[`${prefix}visibilityState`];
                if (state) {
                    isVisiblePage()?pageShowHandler(e):pageHideHandler(e);
                } else {
                    console.log('不支持 document.visibilityState')
                }
            });

            /**
             * 以下可能有兼容性问题
             * 隐藏的方法没测试成功，mac chrome 75.0.3779.142， 可能是使用方式不对
             * */
            //监听页面的显示
            w.addEventListener('pagehide', pageHideHandler);
            //监听页面的隐藏
            w.addEventListener('pageshow', pageShowHandler);

        }

        function isVisiblePage() {
            return !document[getHiddenKey()];
        }

        /**
         * 获取兼容浏览器写法的hidden key
         * */
        function getHiddenKey() {
            return prefix?`${prefix}Hidden`: 'hidden'
        }

        /**
         * 获取兼容浏览器的前缀
         * */
        function getPrefix() {
            if ('hidden' in document) return '';
            const prefixes = ['webkit', 'moz', 'ms', 'o'];
            let currentPrefix;
            prefixes.forEach((prefix, index) => {
                if (`${prefix}Hidden` in document) {
                    currentPrefix = prefix;
                }
            });
            console.log(`prefix:${currentPrefix}`);
            return currentPrefix;
        }

        /**
         * 页面隐藏时回调方法
         * */
        function pageHideHandler(e) {
            typeof _options.pageHideCallBack === 'function' ? _options.pageHideCallBack(e) : '';
        }

        /**
         * 页面显示时回调方法
         * */
        function pageShowHandler(e) {
            typeof _options.pageShowCallback === 'function' ? _options.pageShowCallback(e) : '';
        }

        return {
            isVisiblePage
        };
    }

    //暂时使用全局变量的方式添加到页面当中
    w.PageCheck = PageCheck;
})(window)