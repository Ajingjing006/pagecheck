(function (w) {
    function PageCheck(options) {

        const d = w.document;
        const prefix = getPrefix();
        let _options;
        init();

        function init() {
            _options = Object.assign({}, {
                pageHideCallBack: function () {
                    console.log('页面隐藏');
                },
                pageShowCallback: function () {
                    console.log('页面显示');
                }
            }, options?options:{});

            d.addEventListener(`${prefix}visibilitychange`, function(e) {
                let state = document[`${prefix}visibilityState`];
                if (state) {
                    isVisiblePage()?pageShowHandler(e):pageHideHandler(e);
                } else {
                    console.log('不支持 document.visibilityState')
                }
            });

            w.addEventListener('pagehide', pageHideHandler);
            w.addEventListener('pageshow', pageShowHandler);

        }

        function isVisiblePage() {
            return !document[getHiddenKey()];
        }

        function getHiddenKey() {
            return prefix?`${prefix}Hidden`: 'hidden'
        }

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

        function pageHideHandler(e) {
            typeof _options.pageHideCallBack === 'function' ? _options.pageHideCallBack(e) : '';
        }

        function pageShowHandler(e) {
            typeof _options.pageShowCallback === 'function' ? _options.pageShowCallback(e) : '';
        }

        return {
            isVisiblePage
        };
    }
    w.PageCheck = PageCheck;
})(window)