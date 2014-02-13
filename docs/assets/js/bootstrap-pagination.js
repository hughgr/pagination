(function ($) {
    function Pagination (opts) {
        this.itemsCount = opts.itemsCount;
        opts.itemsCount % opts.pageSize == 0 ? this.pages = opts.itemsCount / opts.pageSize : this.pages = parseInt(opts.itemsCount / opts.pageSize) + 1;
        this.currentPage = opts.currentPage;
        this.nextPage = this.currentPage + 1;
        this.prevPage = this.currentPage - 1;
    };
    
    Pagination.prototype = {
        _draw: function (hookNode) {
            var tpl = '<div class="pagination pagination-large">'
                    + '<ul>'
                    + '<li class="prev disabled"><a href="#">«上一页</a></li>';
            for ( var i = 1; i < this.pages + 1; i++) {
                tpl += '<li><a href="#">' +i + '</a></li>'
            }
                tpl += '<li class="dotted"><span>...</span></li>'
                    + '<li class="next"><a href="#">下一页»</a></li>'
                    + '</ul>'
                    + '</div>';
            hookNode.html(tpl);
        },


        init: function (opts, hookNode) {
            this._draw(hookNode);
        }
    }

    $.fn.pagination = function (options) {
        var opts = $.extend({}, $.fn.pagination.defaults, options);
        return this.each( function () {
            /*$(this).text(opts.text);*/
            new Pagination(opts).init(opts, $(this));
            if ( $.isFunction( opts.complete ) ) {
                opts.complete.call(this);
            }
        });
    };

    $.fn.pagination.defaults = {
        pageSize: 10,
        currentPage: 1,
        itemsCount: 100,
        text: 'hello',
        complete: null
    }

})(window.jQuery)
