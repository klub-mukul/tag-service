'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tag-service documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-808d091df882df29c6784f1d2f0e632aa38fc2448eb601a808b56adb55776e3597b3edc2c0b00607d0fbfbd2971a256d05e47013eca2c1eef2ccaa4b7ef7b093"' : 'data-target="#xs-controllers-links-module-AppModule-808d091df882df29c6784f1d2f0e632aa38fc2448eb601a808b56adb55776e3597b3edc2c0b00607d0fbfbd2971a256d05e47013eca2c1eef2ccaa4b7ef7b093"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-808d091df882df29c6784f1d2f0e632aa38fc2448eb601a808b56adb55776e3597b3edc2c0b00607d0fbfbd2971a256d05e47013eca2c1eef2ccaa4b7ef7b093"' :
                                            'id="xs-controllers-links-module-AppModule-808d091df882df29c6784f1d2f0e632aa38fc2448eb601a808b56adb55776e3597b3edc2c0b00607d0fbfbd2971a256d05e47013eca2c1eef2ccaa4b7ef7b093"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-808d091df882df29c6784f1d2f0e632aa38fc2448eb601a808b56adb55776e3597b3edc2c0b00607d0fbfbd2971a256d05e47013eca2c1eef2ccaa4b7ef7b093"' : 'data-target="#xs-injectables-links-module-AppModule-808d091df882df29c6784f1d2f0e632aa38fc2448eb601a808b56adb55776e3597b3edc2c0b00607d0fbfbd2971a256d05e47013eca2c1eef2ccaa4b7ef7b093"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-808d091df882df29c6784f1d2f0e632aa38fc2448eb601a808b56adb55776e3597b3edc2c0b00607d0fbfbd2971a256d05e47013eca2c1eef2ccaa4b7ef7b093"' :
                                        'id="xs-injectables-links-module-AppModule-808d091df882df29c6784f1d2f0e632aa38fc2448eb601a808b56adb55776e3597b3edc2c0b00607d0fbfbd2971a256d05e47013eca2c1eef2ccaa4b7ef7b093"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-cdcfa769b7fb6575a64835a533bab8705403d509bbe9ebb41975879ee8cda0df2b460779a6428c895da320314b90e12c7efeaa2316609b0119549072e16b1bc0"' : 'data-target="#xs-injectables-links-module-SharedModule-cdcfa769b7fb6575a64835a533bab8705403d509bbe9ebb41975879ee8cda0df2b460779a6428c895da320314b90e12c7efeaa2316609b0119549072e16b1bc0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-cdcfa769b7fb6575a64835a533bab8705403d509bbe9ebb41975879ee8cda0df2b460779a6428c895da320314b90e12c7efeaa2316609b0119549072e16b1bc0"' :
                                        'id="xs-injectables-links-module-SharedModule-cdcfa769b7fb6575a64835a533bab8705403d509bbe9ebb41975879ee8cda0df2b460779a6428c895da320314b90e12c7efeaa2316609b0119549072e16b1bc0"' }>
                                        <li class="link">
                                            <a href="injectables/ConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagModule.html" data-type="entity-link" >TagModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TagModule-cbb6d62b0f625a68b5833f4adac6cc3662e639c86c4285ab62242b539d6bfa163a9d05aef589b6a7ce65427f44f05a6755ad4f5999003004a12f412daddf8d6a"' : 'data-target="#xs-controllers-links-module-TagModule-cbb6d62b0f625a68b5833f4adac6cc3662e639c86c4285ab62242b539d6bfa163a9d05aef589b6a7ce65427f44f05a6755ad4f5999003004a12f412daddf8d6a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagModule-cbb6d62b0f625a68b5833f4adac6cc3662e639c86c4285ab62242b539d6bfa163a9d05aef589b6a7ce65427f44f05a6755ad4f5999003004a12f412daddf8d6a"' :
                                            'id="xs-controllers-links-module-TagModule-cbb6d62b0f625a68b5833f4adac6cc3662e639c86c4285ab62242b539d6bfa163a9d05aef589b6a7ce65427f44f05a6755ad4f5999003004a12f412daddf8d6a"' }>
                                            <li class="link">
                                                <a href="controllers/TagController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TagModule-cbb6d62b0f625a68b5833f4adac6cc3662e639c86c4285ab62242b539d6bfa163a9d05aef589b6a7ce65427f44f05a6755ad4f5999003004a12f412daddf8d6a"' : 'data-target="#xs-injectables-links-module-TagModule-cbb6d62b0f625a68b5833f4adac6cc3662e639c86c4285ab62242b539d6bfa163a9d05aef589b6a7ce65427f44f05a6755ad4f5999003004a12f412daddf8d6a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagModule-cbb6d62b0f625a68b5833f4adac6cc3662e639c86c4285ab62242b539d6bfa163a9d05aef589b6a7ce65427f44f05a6755ad4f5999003004a12f412daddf8d6a"' :
                                        'id="xs-injectables-links-module-TagModule-cbb6d62b0f625a68b5833f4adac6cc3662e639c86c4285ab62242b539d6bfa163a9d05aef589b6a7ce65427f44f05a6755ad4f5999003004a12f412daddf8d6a"' }>
                                        <li class="link">
                                            <a href="injectables/TagService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatedByDto.html" data-type="entity-link" >CreatedByDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CsvFileValidationError.html" data-type="entity-link" >CsvFileValidationError</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetTagDto.html" data-type="entity-link" >GetTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migrations1683734889829.html" data-type="entity-link" >Migrations1683734889829</a>
                            </li>
                            <li class="link">
                                <a href="classes/Migrations1683734889829-1.html" data-type="entity-link" >Migrations1683734889829</a>
                            </li>
                            <li class="link">
                                <a href="classes/NoTagFoundException.html" data-type="entity-link" >NoTagFoundException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResourceValidationException.html" data-type="entity-link" >ResourceValidationException</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseTagDto.html" data-type="entity-link" >ResponseTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TagConditions.html" data-type="entity-link" >TagConditions</a>
                            </li>
                            <li class="link">
                                <a href="classes/TagConditionsValidationException.html" data-type="entity-link" >TagConditionsValidationException</a>
                            </li>
                            <li class="link">
                                <a href="classes/TagRepository.html" data-type="entity-link" >TagRepository</a>
                            </li>
                            <li class="link">
                                <a href="classes/UnmatchingTagDetailsException.html" data-type="entity-link" >UnmatchingTagDetailsException</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatedByDto.html" data-type="entity-link" >UpdatedByDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateTagDto.html" data-type="entity-link" >UpdateTagDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IErrorObject.html" data-type="entity-link" >IErrorObject</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});