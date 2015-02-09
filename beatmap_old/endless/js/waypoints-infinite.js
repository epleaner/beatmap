// Generated by CoffeeScript 1.6.2
/*
Infinite Scroll Shortcut for jQuery Waypoints - v2.0.5
Copyright (c) 2011-2014 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/


(function() {
    (function(root, factory) {
        if (typeof define === 'function' && define.amd) {
            return define(['jquery', 'waypoints'], factory);
        } else {
            return factory(root.jQuery);
        }
    })(window, function($) {
        var defaults;

        defaults = {
            container: 'auto',
            items: '.infinite-item',
            more: '.infinite-more-link',
            offset: 'bottom-in-view',
            loadingClass: 'infinite-loading',
            onBeforePageLoad: $.noop,
            onAfterPageLoad: $.noop
        };
        return $.waypoints('extendFn', 'infinite', function(options) {
            var $container, opts;

            opts = $.extend({}, $.fn.waypoint.defaults, defaults, options);
            if ($(opts.more).length === 0) {
                return this;
            }
            $container = opts.container === 'auto' ? this : $(opts.container);
            opts.handler = function(direction) {
                var $this;

                if (direction === 'down' || direction === 'right') {
                    $this = $(this);
                    opts.onBeforePageLoad();
                    $this.waypoint('destroy');
                    $container.addClass(opts.loadingClass);
                    return $.get($(opts.more).attr('href'), function(data) {
                        var $data, $more, $newMore, fn;

                        $data = $($.parseHTML(data));
                        // $data = $(data);
                        $more = $(opts.more);
                        debugger;
                        $newMore = $data.find(opts.more);

                        $container.append($data.find(opts.items));
                        $container.removeClass(opts.loadingClass);
                        if ($newMore.length) {
                            $more.replaceWith($newMore);
                            fn = function() {
                                return $this.waypoint(opts);
                            };
                            setTimeout(fn, 0);
                        } else {
                            $more.remove();
                        }
                        return opts.onAfterPageLoad();
                    });
                }
            };
            return this.waypoint(opts);
        });
    });

}).call(this);