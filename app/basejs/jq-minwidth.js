/*
 * Copyright (c) 2016 Joytoyboy
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * from http://stackoverflow.com/questions/6917188/jquery-min-width-vs-width-how-to-remove-px
 * 对jquery增加了minWidth、minHeight、maxWidth、maxHeight函数。
 * $('div').minWidth();
 */
(function($, undefined) {

    var oldPlugins = {};

    $.each([ "min", "max" ], function(_, name) {

        $.each([ "Width", "Height" ], function(_, dimension) {

            var type = name + dimension,
                cssProperty = [name, dimension.toLowerCase()].join('-');

            oldPlugins[ type ] = $.fn[ type ];

            $.fn[ type ] = function(size) {
                var elem = this[0];
                if (!elem) {
                    return !size ? null : this;
                }

                if ($.isFunction(size)) {
                    return this.each(function(i) {
                        var $self = $(this);
                        $self[ type ](size.call(this, i, $self[ type ]()));
                    });
                }

                if (size === undefined) {
                    var orig = $.css(elem, cssProperty),
                        ret = parseFloat(orig);

                    return jQuery.isNumeric(ret) ? ret : orig;
                } else {
                    return this.css(cssProperty, typeof size === "string" ? size : size + "px");
                }
            };

        });

    });
})(jQuery);