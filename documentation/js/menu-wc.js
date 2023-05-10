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
                                            'data-target="#controllers-links-module-AppModule-e8c35b314d91b4cc7a2cf1cb21a39efe380764bcb6e5294959e442340437c0cdab0b5d7513a0abd57b5c5fc06e6393d248e3d5e659ac8df2cbe8a49a515fe2ae"' : 'data-target="#xs-controllers-links-module-AppModule-e8c35b314d91b4cc7a2cf1cb21a39efe380764bcb6e5294959e442340437c0cdab0b5d7513a0abd57b5c5fc06e6393d248e3d5e659ac8df2cbe8a49a515fe2ae"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-e8c35b314d91b4cc7a2cf1cb21a39efe380764bcb6e5294959e442340437c0cdab0b5d7513a0abd57b5c5fc06e6393d248e3d5e659ac8df2cbe8a49a515fe2ae"' :
                                            'id="xs-controllers-links-module-AppModule-e8c35b314d91b4cc7a2cf1cb21a39efe380764bcb6e5294959e442340437c0cdab0b5d7513a0abd57b5c5fc06e6393d248e3d5e659ac8df2cbe8a49a515fe2ae"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-e8c35b314d91b4cc7a2cf1cb21a39efe380764bcb6e5294959e442340437c0cdab0b5d7513a0abd57b5c5fc06e6393d248e3d5e659ac8df2cbe8a49a515fe2ae"' : 'data-target="#xs-injectables-links-module-AppModule-e8c35b314d91b4cc7a2cf1cb21a39efe380764bcb6e5294959e442340437c0cdab0b5d7513a0abd57b5c5fc06e6393d248e3d5e659ac8df2cbe8a49a515fe2ae"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e8c35b314d91b4cc7a2cf1cb21a39efe380764bcb6e5294959e442340437c0cdab0b5d7513a0abd57b5c5fc06e6393d248e3d5e659ac8df2cbe8a49a515fe2ae"' :
                                        'id="xs-injectables-links-module-AppModule-e8c35b314d91b4cc7a2cf1cb21a39efe380764bcb6e5294959e442340437c0cdab0b5d7513a0abd57b5c5fc06e6393d248e3d5e659ac8df2cbe8a49a515fe2ae"' }>
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
                                        'data-target="#injectables-links-module-SharedModule-929fc66ed408aae4a41595dcbfe8d30f75a8ce480f045c7a245eec2c297809b1165782c98a2f7df0a7f7caf5f9ff41642e514f4d008d9d7ab41bab3d36ed9940"' : 'data-target="#xs-injectables-links-module-SharedModule-929fc66ed408aae4a41595dcbfe8d30f75a8ce480f045c7a245eec2c297809b1165782c98a2f7df0a7f7caf5f9ff41642e514f4d008d9d7ab41bab3d36ed9940"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-929fc66ed408aae4a41595dcbfe8d30f75a8ce480f045c7a245eec2c297809b1165782c98a2f7df0a7f7caf5f9ff41642e514f4d008d9d7ab41bab3d36ed9940"' :
                                        'id="xs-injectables-links-module-SharedModule-929fc66ed408aae4a41595dcbfe8d30f75a8ce480f045c7a245eec2c297809b1165782c98a2f7df0a7f7caf5f9ff41642e514f4d008d9d7ab41bab3d36ed9940"' }>
                                        <li class="link">
                                            <a href="injectables/ConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-TagsModule-86f051a1c4e37af4b38f565ae2705222295b38782799aaecaebc4a6dde5bfd0b74b19d55cebc6ea69f7b3d564883a01eb4505c02ca2583ca7b2ab1f2323d21b8"' : 'data-target="#xs-controllers-links-module-TagsModule-86f051a1c4e37af4b38f565ae2705222295b38782799aaecaebc4a6dde5bfd0b74b19d55cebc6ea69f7b3d564883a01eb4505c02ca2583ca7b2ab1f2323d21b8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-86f051a1c4e37af4b38f565ae2705222295b38782799aaecaebc4a6dde5bfd0b74b19d55cebc6ea69f7b3d564883a01eb4505c02ca2583ca7b2ab1f2323d21b8"' :
                                            'id="xs-controllers-links-module-TagsModule-86f051a1c4e37af4b38f565ae2705222295b38782799aaecaebc4a6dde5bfd0b74b19d55cebc6ea69f7b3d564883a01eb4505c02ca2583ca7b2ab1f2323d21b8"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TagsModule-86f051a1c4e37af4b38f565ae2705222295b38782799aaecaebc4a6dde5bfd0b74b19d55cebc6ea69f7b3d564883a01eb4505c02ca2583ca7b2ab1f2323d21b8"' : 'data-target="#xs-injectables-links-module-TagsModule-86f051a1c4e37af4b38f565ae2705222295b38782799aaecaebc4a6dde5bfd0b74b19d55cebc6ea69f7b3d564883a01eb4505c02ca2583ca7b2ab1f2323d21b8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-86f051a1c4e37af4b38f565ae2705222295b38782799aaecaebc4a6dde5bfd0b74b19d55cebc6ea69f7b3d564883a01eb4505c02ca2583ca7b2ab1f2323d21b8"' :
                                        'id="xs-injectables-links-module-TagsModule-86f051a1c4e37af4b38f565ae2705222295b38782799aaecaebc4a6dde5bfd0b74b19d55cebc6ea69f7b3d564883a01eb4505c02ca2583ca7b2ab1f2323d21b8"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
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
                                <a href="classes/Migrations1683551307003.html" data-type="entity-link" >Migrations1683551307003</a>
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
                                <a href="classes/UnmatchingTagDetailsValidationException.html" data-type="entity-link" >UnmatchingTagDetailsValidationException</a>
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