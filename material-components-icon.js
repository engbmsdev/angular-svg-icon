/**
 * @ngdoc module
 * @name material.components.icon
 * @description
 * Icon Module exported from Angular Material
 */
angular.module('material.components.icon', []);

/*
 * This var has to be outside the angular factory, otherwise when
 * there are multiple material apps on the same page, each app
 * will create its own instance of this array and the app's IDs
 * will not be unique.
 */
var nextUniqueId = 0;

var config = {
    defaultViewBoxSize: 24,
    defaultFontSet: 'material-icons',
    fontSets: []
};

angular
    .module('material.components.icon')
    .constant('$$mdSvgRegistry', {
        'mdTabsArrow': 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4=',
        'mdClose': 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xOSA2LjQxbC0xLjQxLTEuNDEtNS41OSA1LjU5LTUuNTktNS41OS0xLjQxIDEuNDEgNS41OSA1LjU5LTUuNTkgNS41OSAxLjQxIDEuNDEgNS41OS01LjU5IDUuNTkgNS41OSAxLjQxLTEuNDEtNS41OS01LjU5eiIvPjwvZz48L3N2Zz4=',
        'mdCancel': 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xMiAyYy01LjUzIDAtMTAgNC40Ny0xMCAxMHM0LjQ3IDEwIDEwIDEwIDEwLTQuNDcgMTAtMTAtNC40Ny0xMC0xMC0xMHptNSAxMy41OWwtMS40MSAxLjQxLTMuNTktMy41OS0zLjU5IDMuNTktMS40MS0xLjQxIDMuNTktMy41OS0zLjU5LTMuNTkgMS40MS0xLjQxIDMuNTkgMy41OSAzLjU5LTMuNTkgMS40MSAxLjQxLTMuNTkgMy41OSAzLjU5IDMuNTl6Ii8+PC9nPjwvc3ZnPg==',
        'mdMenu': 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0zLDZIMjFWOEgzVjZNMywxMUgyMVYxM0gzVjExTTMsMTZIMjFWMThIM1YxNloiIC8+PC9zdmc+',
        'mdToggleArrow': 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiPjxwYXRoIGQ9Ik0yNCAxNmwtMTIgMTIgMi44MyAyLjgzIDkuMTctOS4xNyA5LjE3IDkuMTcgMi44My0yLjgzeiIvPjxwYXRoIGQ9Ik0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==',
        'mdCalendar': 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgM2gtMVYxaC0ydjJIOFYxSDZ2Mkg1Yy0xLjExIDAtMS45OS45LTEuOTkgMkwzIDE5YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY4aDE0djExek03IDEwaDV2NUg3eiIvPjwvc3ZnPg==',
        'mdChecked': 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik05IDE2LjE3TDQuODMgMTJsLTEuNDIgMS40MUw5IDE5IDIxIDdsLTEuNDEtMS40MXoiLz48L2c+PC9zdmc+'
    })
    .provider('$mdIcon', {
        icon: function (id, url, viewBoxSize) {
            if (id.indexOf(':') == -1) id = '$default:' + id;

            config[id] = new ConfigurationItem(url, viewBoxSize);
            return this;
        },

        iconSet: function (id, url, viewBoxSize) {
            config[id] = new ConfigurationItem(url, viewBoxSize);
            return this;
        },

        defaultIconSet: function (url, viewBoxSize) {
            var setName = '$default';

            if (!config[setName]) {
                config[setName] = new ConfigurationItem(url, viewBoxSize);
            }

            config[setName].viewBoxSize = viewBoxSize || config.defaultViewBoxSize;

            return this;
        },

        defaultViewBoxSize: function (viewBoxSize) {
            config.defaultViewBoxSize = viewBoxSize;
            return this;
        },

        /**
         * Register an alias name associated with a font-icon library style ;
         */
        fontSet: function fontSet(alias, className) {
            config.fontSets.push({
                alias: alias,
                fontSet: className || alias
            });
            return this;
        },

        /**
         * Specify a default style name associated with a font-icon library
         * fallback to Material Icons.
         *
         */
        defaultFontSet: function defaultFontSet(className) {
            config.defaultFontSet = !className ? '' : className;
            return this;
        },

        defaultIconSize: function defaultIconSize(iconSize) {
            config.defaultIconSize = iconSize;
            return this;
        },

        $get: ['$templateRequest', '$q', '$log', '$sce', function($templateRequest, $q, $log, $sce) {
            var iconCache = {};
            var svgCache = {};
            var urlRegex = /[-\w@:%\+.~#?&//=]{2,}\.[a-z]{2,4}\b(\/[-\w@:%\+.~#?&//=]*)?/i;
            var dataUrlRegex = /^data:image\/svg\+xml[\s*;\w\-\=]*?(base64)?,(.*)$/i;

            Icon.prototype = {clone: cloneSVG, prepare: prepareAndStyle};
            getIcon.fontSet = findRegisteredFontSet;

            // Publish service...
            return getIcon;

            /**
             * Actual $mdIcon service is essentially a lookup function
             */
            function getIcon(id) {
                id = id || '';

                // If the "id" provided is not a string, the only other valid value is a $sce trust wrapper
                // over a URL string. If the value is not trusted, this will intentionally throw an error
                // because the user is attempted to use an unsafe URL, potentially opening themselves up
                // to an XSS attack.
                if (!angular.isString(id)) {
                    id = $sce.getTrustedUrl(id);
                }

                // If already loaded and cached, use a clone of the cached icon.
                // Otherwise either load by URL, or lookup in the registry and then load by URL, and cache.

                if (iconCache[id]) {
                    return $q.when(transformClone(iconCache[id]));
                }

                if (urlRegex.test(id) || dataUrlRegex.test(id)) {
                    return loadByURL(id).then(cacheIcon(id));
                }

                if (id.indexOf(':') == -1) {
                    id = '$default:' + id;
                }

                var load = config[id] ? loadByID : loadFromIconSet;
                return load(id)
                    .then(cacheIcon(id));
            }

            /**
             * Lookup registered fontSet style using its alias...
             * If not found,
             */
            function findRegisteredFontSet(alias) {
                var useDefault = angular.isUndefined(alias) || !(alias && alias.length);
                if (useDefault) return config.defaultFontSet;

                var result = alias;
                angular.forEach(config.fontSets, function (it) {
                    if (it.alias == alias) result = it.fontSet || result;
                });

                return result;
            }

            function transformClone(cacheElement) {
                var clone = cacheElement.clone();
                var cacheSuffix = '_cache' + nextUniqueId++;

                // We need to modify for each cached icon the id attributes.
                // This is needed because SVG id's are treated as normal DOM ids
                // and should not have a duplicated id.
                if (clone.id) clone.id += cacheSuffix;
                angular.forEach(clone.querySelectorAll('[id]'), function (item) {
                    item.id += cacheSuffix;
                });

                return clone;
            }

            /**
             * Prepare and cache the loaded icon for the specified `id`
             */
            function cacheIcon(id) {

                return function updateCache(icon) {
                    iconCache[id] = isIcon(icon) ? icon : new Icon(icon, config[id]);

                    return iconCache[id].clone();
                };
            }

            /**
             * Lookup the configuration in the registry, if !registered throw an error
             * otherwise load the icon [on-demand] using the registered URL.
             *
             */
            function loadByID(id) {
                var iconConfig = config[id];
                return loadByURL(iconConfig.url).then(function (icon) {
                    return new Icon(icon, iconConfig);
                });
            }

            /**
             *    Loads the file as XML and uses querySelector( <id> ) to find
             *    the desired node...
             */
            function loadFromIconSet(id) {
                var setName = id.substring(0, id.lastIndexOf(':')) || '$default';
                var iconSetConfig = config[setName];

                return !iconSetConfig ? announceIdNotFound(id) : loadByURL(iconSetConfig.url).then(extractFromSet);

                function extractFromSet(set) {
                    var iconName = id.slice(id.lastIndexOf(':') + 1);
                    var icon = set.querySelector('#' + iconName);
                    return icon ? new Icon(icon, iconSetConfig) : announceIdNotFound(id);
                }

                function announceIdNotFound(id) {
                    var msg = 'icon ' + id + ' not found';
                    $log.warn(msg);

                    return $q.reject(msg || id);
                }
            }

            /**
             * Load the icon by URL (may use the $templateCache).
             * Extract the data for later conversion to Icon
             */
            function loadByURL(url) {
                /* Load the icon from embedded data URL. */
                function loadByDataUrl(url) {
                    var results = dataUrlRegex.exec(url);
                    var isBase64 = /base64/i.test(url);
                    var data = isBase64 ? window.atob(results[2]) : results[2];

                    return $q.when(angular.element(data)[0]);
                }

                /* Load the icon by URL using HTTP. */
                function loadByHttpUrl(url) {
                    return $q(function (resolve, reject) {
                        // Catch HTTP or generic errors not related to incorrect icon IDs.
                        var announceAndReject = function (err) {
                                var msg = angular.isString(err) ? err : (err.message || err.data || err.statusText);
                                $log.warn(msg);
                                reject(err);
                            },
                            extractSvg = function (response) {
                                if (!svgCache[url]) {
                                    svgCache[url] = angular.element('<div>').append(response)[0].querySelector('svg');
                                }
                                resolve(svgCache[url]);
                            };

                        $templateRequest(url, true).then(extractSvg, announceAndReject);
                    });
                }

                return dataUrlRegex.test(url)
                    ? loadByDataUrl(url)
                    : loadByHttpUrl(url);
            }

            /**
             * Check target signature to see if it is an Icon instance.
             */
            function isIcon(target) {
                return angular.isDefined(target.element) && angular.isDefined(target.config);
            }

            /**
             *  Define the Icon class
             */
            function Icon(el, config) {
                if (el && el.tagName != 'svg') {
                    el = angular.element('<svg xmlns="http://www.w3.org/2000/svg">').append(el.cloneNode(true))[0];
                }

                // Inject the namespace if not available...
                if (!el.getAttribute('xmlns')) {
                    el.setAttribute('xmlns', "http://www.w3.org/2000/svg");
                }

                this.element = el;
                this.config = config;
                this.prepare();
            }

            /**
             *  Prepare the DOM element that will be cached in the
             *  loaded iconCache store.
             */
            function prepareAndStyle() {
                var viewBoxSize = this.config ? this.config.viewBoxSize : config.defaultViewBoxSize;
                angular.forEach({
                    'fit': '',
                    'height': '100%',
                    'width': '100%',
                    'preserveAspectRatio': 'xMidYMid meet',
                    'viewBox': this.element.getAttribute('viewBox') || ('0 0 ' + viewBoxSize + ' ' + viewBoxSize),
                    'focusable': false // Disable IE11s default behavior to make SVGs focusable
                }, function (val, attr) {
                    this.element.setAttribute(attr, val);
                }, this);
            }

            /**
             * Clone the Icon DOM element.
             */
            function cloneSVG() {
                // If the element or any of its children have a style attribute, then a CSP policy without
                // 'unsafe-inline' in the style-src directive, will result in a violation.
                return this.element.cloneNode(true);
            }

        }]
    });

/**
 *  Configuration item stored in the Icon registry; used for lookups
 *  to load if not already cached in the `loaded` cache
 */
function ConfigurationItem(url, viewBoxSize) {
    this.url = url;
    this.viewBoxSize = viewBoxSize || config.defaultViewBoxSize;
}

angular
    .module('material.components.icon')
    .directive('mdIcon', ['$mdIcon', '$sce', function ($mdIcon, $sce) {

        return {
            restrict: 'E',
            link: postLink
        };


        /**
         * Directive postLink
         * Supports embedded SVGs, font-icons, & external SVGs
         */
        function postLink(scope, element, attr) {
            var lastFontIcon = attr.mdFontIcon;
            var lastFontSet = $mdIcon.fontSet(attr.mdFontSet);

            prepareForFontIcon();

            attr.$observe('mdFontIcon', fontIconChanged);
            attr.$observe('mdFontSet', fontIconChanged);

            // Keep track of the content of the svg src so we can compare against it later to see if the
            // attribute is static (and thus safe).
            var originalSvgSrc = element[0].getAttribute(attr.$attr.mdSvgSrc);

            // If using a font-icon, then the textual name of the icon itself
            // provides the aria-label.

            var label = attr.alt || attr.mdFontIcon || attr.mdSvgIcon || element.text();
            var attrName = attr.$normalize(attr.$attr.mdSvgIcon || attr.$attr.mdSvgSrc || '');

            if (attrName) {
                // Use either pre-configured SVG or URL source, respectively.
                attr.$observe(attrName, function (attrVal) {
                    element.empty();
                    if (attrVal) {
                        $mdIcon(attrVal)
                            .then(function (svg) {
                                element.empty();
                                element.append(svg);
                            });
                    }

                });
            }

            function parentsHaveText() {
                var parent = element.parent();
                if (parent.attr('aria-label') || parent.text()) {
                    return true;
                }
                else if (parent.parent().attr('aria-label') || parent.parent().text()) {
                    return true;
                }
                return false;
            }

            function prepareForFontIcon() {
                if (!attr.mdSvgIcon && !attr.mdSvgSrc) {
                    if (attr.mdFontIcon) {
                        element.addClass('md-font ' + attr.mdFontIcon);
                    }

                    element.addClass(lastFontSet);
                }
            }

            function fontIconChanged() {
                if (!attr.mdSvgIcon && !attr.mdSvgSrc) {
                    if (attr.mdFontIcon) {
                        element.removeClass(lastFontIcon);
                        element.addClass(attr.mdFontIcon);

                        lastFontIcon = attr.mdFontIcon;
                    }

                    var fontSet = $mdIcon.fontSet(attr.mdFontSet);

                    if (lastFontSet !== fontSet) {
                        element.removeClass(lastFontSet);
                        element.addClass(fontSet);

                        lastFontSet = fontSet;
                    }
                }
            }
        }
    }]);