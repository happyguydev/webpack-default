export default {
    options: {},
    init() {
        this.initStickyHeader();
        this.initHeaderNav();
        this.initMobileHeaderNav();
    },
    initStickyHeader() {
        let $headerSelector = document.querySelector('.header'),
            $secondarySelector = document.querySelector('.secondary'),
            $headerHeight = $headerSelector.offsetHeight;

        if ($headerSelector) {
            new window.Waypoint.Sticky({
                element: $headerSelector,
                stuckClass: 'fixed',
            });
        }

        if ($secondarySelector) {
            new window.Waypoint.Sticky({
                element: $secondarySelector,
                stuckClass: 'fixed',
                offset: $headerHeight,
            });
        }
    },
    initHeaderNav() {
        let $headerNavSelectorLink = document.querySelectorAll('.header__nav > ul > li.has-dropdown > a'),
            $secondaryNavSelector = document.querySelector('.secondary'),
            $secondaryNavSelectorLink = document.querySelectorAll('.secondary .list > ul > li.has-dropdown > a');

        function closeDropdowns() {
            let menus = document.querySelectorAll('.header__nav > ul > .has-dropdown'),
                secondaryMenus = document.querySelectorAll('.secondary .list > ul > .has-dropdown');

            Array.prototype.forEach.call(menus, function (el) {
                el.classList.remove('active');
                el.querySelector('a').classList.remove('active');

                el.querySelector('ul.sub-menu').style.display = 'none';
                el.querySelector('ul.sub-menu').classList.remove('opened');
            });

            Array.prototype.forEach.call(secondaryMenus, function (el) {
                el.classList.remove('active');
                el.querySelector('a').classList.remove('active');

                $secondaryNavSelector.querySelector('.list > ul').classList.remove('opened');
                $secondaryNavSelector.querySelector('.list > ul').style.marginLeft = 0;

                el.querySelector('ul.sub-menu').style.display = 'none';
                el.querySelector('ul.sub-menu').classList.remove('opened');
            });
        }

        function headerMenuDropdown(e) {
            e.preventDefault();
            e.stopPropagation();

            let target = e.target,
                parents = document.querySelectorAll('.header__nav ul.menu > .has-dropdown'),
                must_close = target.classList.contains('active'),
                secondaryMenus = document.querySelectorAll('.secondary .list > ul > .has-dropdown');

            Array.prototype.forEach.call(parents, function (el) {
                el.classList.remove('active');
                el.querySelector('a').classList.remove('active');

                el.querySelector('ul.sub-menu').style.display = 'none';
                el.querySelector('ul.sub-menu').classList.remove('opened');
            });

            if (secondaryMenus) {
                Array.prototype.forEach.call(secondaryMenus, function (el) {
                    el.classList.remove('active');
                    el.querySelector('a').classList.remove('active');

                    $secondaryNavSelector.querySelector('.list > ul').classList.remove('opened');
                    $secondaryNavSelector.querySelector('.list > ul').style.marginLeft = 0;

                    el.querySelector('ul.sub-menu').style.display = 'none';
                    el.querySelector('ul.sub-menu').classList.remove('opened');
                });
            }

            if (!must_close) {
                target.parentNode.classList.add('active');
                target.classList.add('active');

                target.parentNode.querySelector('ul.sub-menu').style.display = 'block';
                target.parentNode.querySelector('ul.sub-menu').classList.add('opened');
            }
        }

        function secondaryMenuDropdown(e) {
            e.preventDefault();
            e.stopPropagation();

            let target = e.target,
                parents = document.querySelectorAll('.secondary ul .has-dropdown'),
                must_close = target.classList.contains('active'),
                $subheaderList = document.querySelector('.secondary .list > ul'),
                $scrollLeft = $subheaderList.scrollLeft,
                menus = document.querySelectorAll('.header__nav ul .has-dropdown');

            Array.prototype.forEach.call(menus, function (el) {
                el.classList.remove('active');
                el.querySelector('a').classList.remove('active');

                el.querySelector('ul.sub-menu').style.display = 'none';
                el.querySelector('ul.sub-menu').classList.remove('opened');
            });

            if (parents) {
                Array.prototype.forEach.call(parents, function (el) {
                    el.classList.remove('active');
                    el.querySelector('a').classList.remove('active');

                    $subheaderList.classList.remove('opened');

                    if (window.innerWidth <= 1024) {
                        $subheaderList.style.marginLeft = $scrollLeft + 'px';
                    }

                    el.querySelector('ul.sub-menu').style.display = 'none';
                    el.querySelector('ul.sub-menu').classList.remove('opened');
                });
            }

            if (!must_close) {
                target.parentNode.classList.add('active');
                target.classList.add('active');

                $subheaderList.classList.add('opened');

                if (window.innerWidth <= 1024) {
                    $subheaderList.style.marginLeft = -$scrollLeft + 'px';
                }

                target.parentNode.querySelector('ul.sub-menu').style.display = 'block';
                target.parentNode.querySelector('ul.sub-menu').classList.add('opened');
            }
        }

        document.addEventListener('click', closeDropdowns);

        if ($headerNavSelectorLink) {
            Array.prototype.forEach.call($headerNavSelectorLink, function (el) {
                el.addEventListener('click', headerMenuDropdown);
            });
        }

        if ($secondaryNavSelectorLink) {
            Array.prototype.forEach.call($secondaryNavSelectorLink, function (el) {
                el.addEventListener('click', secondaryMenuDropdown);
            });
        }
    },
    initMobileHeaderNav() {
        let $headerNavSelector = document.querySelector('.header__nav'),
            $bodySelector = document.querySelector('html, body'),
            $mobileHamburger = document.querySelector('.header__nav .hamb'),
            $secondaryNavSelector = document.querySelector('.secondary');

        $mobileHamburger.addEventListener('click',function (e) {
            e.preventDefault();

            let target = e.target;

            target.classList.toggle('open');

            if ($headerNavSelector.classList.contains('opened')) {
                $bodySelector.classList.remove('mobile-menu-opened');
                $headerNavSelector.classList.remove('opened');
                document.querySelector('.sub-menu').classList.remove('opened');
                document.querySelector('.sub-menu').style.display = 'none';
                document.querySelector('li.has-dropdown > a').classList.remove('active');
            } else {
                $bodySelector.classList.add('mobile-menu-opened');
                $headerNavSelector.classList.add('opened');
                document.querySelector('.open-announce').classList.remove('open');
                document.querySelector('.announce').classList.remove('opened');

                setTimeout(function () {
                    let firstElement = document.querySelector('.header__nav > ul > li.has-dropdown');
                    firstElement.querySelector('a').classList.add('active');
                    firstElement.classList.add('active');

                    firstElement.querySelector('ul.sub-menu').style.display = 'block';
                    firstElement.querySelector('ul.sub-menu').classList.add('opened');
                }, 300);
            }
        });

        window.addEventListener('resize', function () {
            $mobileHamburger.classList.remove('open');
            $bodySelector.classList.remove('mobile-menu-opened');
            $headerNavSelector.classList.remove('opened');
            document.querySelector('.sub-menu').classList.remove('opened');
            document.querySelector('.sub-menu').style.display = 'none';

            if ($secondaryNavSelector) {
                document.querySelector('.secondary .list > ul').classList.remove('opened');
                document.querySelector('.secondary .list > ul').style.marginLeft = 0;
            }
        });
    },
};
