(function ($) {
    function Pagination (opts) {
        this.itemsCount = opts.itemsCount;
        this.pageSize = opts.pageSize;
        this.displayPage = opts.displayPage;
        opts.itemsCount % opts.pageSize == 0 ? this.pages = opts.itemsCount / opts.pageSize : this.pages = parseInt(opts.itemsCount / opts.pageSize) + 1;
        this.currentPage = opts.currentPage;
        this.styleClass = opts.styleClass;
    };
    
    Pagination.prototype = {
        //generate the outer wrapper with the config of custom style
        _draw: function (hookNode) {
                var tpl = '<div class="pagination';
                for (var i = 0; i < this.styleClass.length; i++) {
                    tpl += ' '+ this.styleClass[i];
                }
                tpl += '"></div>'
            hookNode.html(tpl);
            this._drawInner(hookNode);
        },
        //generate the true pagination
        _drawInner: function (hookNode) {
            var outer = hookNode.children('.pagination');
            var tpl = '<ul>'
                    + '<li class="prev' + (this.currentPage -1 == 0 ? ' disabled' : ' ') + '"><a href="#" data="'+  (this.currentPage - 1) + '">«上一页</a></li>';
            if ( this.pages <= this.displayPage) {
                for ( var i = 1; i < this.pages + 1; i++) {
                    i == this.currentPage ? (tpl += '<li class="active"><a href="#" data="' + i  + '">' +i + '</a></li>') : (tpl += '<li><a href="#" data="' + i  + '">' +i + '</a></li>');
                }
        
            } else {
                
            }
                /*tpl += '<li class="dotted"><span>...</span></li>'*/
                tpl += '<li class="next' + (this.currentPage + 1 > this.pages ? ' disabled' : ' ') + '"><a href="#" data="'+  (this.currentPage + 1) + '">下一页»</a></li>'
                    + '</ul>'
            outer.html(tpl);
        },

        _select: function (opts, hookNode) {
            var self = this;
            hookNode.children('.pagination').on('click', 'a', function (e) {
                e.preventDefault();
                if ( !$(this).parent().hasClass('disabled') && !$(this).parent().hasClass('active') ) {
                    self.currentPage = parseInt($(this).attr('data'));
                    self._drawInner(hookNode);
                    if ( $.isFunction( opts.selectCallBack ) ) {
                        opts.selectCallBack.call(this, $(this).attr('data'));
                    }
                }
            })
        },

        init: function (opts, hookNode) {
            this._draw(hookNode);
            this._select(opts, hookNode);
        },

        updateItemsCount: function (itemsCount, hookNode) {
            itemsCount % this.pageSize == 0 ? this.pages = itemsCount / this.pageSize : this.pages = parseInt(itemsCount / this.pageSize) + 1;
            this._drawInner(hookNode);
        }
    }

    $.fn.pagination = function (options) {
        var opts = $.extend({}, $.fn.pagination.defaults, options);
        return this.each( function () {
            new Pagination(opts).init(opts, $(this));
        });
    };

    $.fn.pagination.defaults = {
        pageSize: 10,
        displayPage: 6,
        currentPage: 1,
        itemsCount: 100,
        styleClass: [],
        selectCallBack: null
    }

})(window.jQuery)
