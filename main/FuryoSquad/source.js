(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Sources = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
"use strict";
/**
 * Request objects hold information for a particular source (see sources for example)
 * This allows us to to use a generic api to make the calls against any source
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlEncodeObject = exports.convertTime = exports.Source = void 0;
class Source {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
    /**
     * @deprecated use {@link Source.getSearchResults getSearchResults} instead
     */
    searchRequest(query, metadata) {
        return this.getSearchResults(query, metadata);
    }
    /**
     * @deprecated use {@link Source.getSearchTags} instead
     */
    getTags() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // @ts-ignore
            return (_a = this.getSearchTags) === null || _a === void 0 ? void 0 : _a.call(this);
        });
    }
}
exports.Source = Source;
// Many sites use '[x] time ago' - Figured it would be good to handle these cases in general
function convertTime(timeAgo) {
    var _a;
    let time;
    let trimmed = Number(((_a = /\d*/.exec(timeAgo)) !== null && _a !== void 0 ? _a : [])[0]);
    trimmed = (trimmed == 0 && timeAgo.includes('a')) ? 1 : trimmed;
    if (timeAgo.includes('minutes')) {
        time = new Date(Date.now() - trimmed * 60000);
    }
    else if (timeAgo.includes('hours')) {
        time = new Date(Date.now() - trimmed * 3600000);
    }
    else if (timeAgo.includes('days')) {
        time = new Date(Date.now() - trimmed * 86400000);
    }
    else if (timeAgo.includes('year') || timeAgo.includes('years')) {
        time = new Date(Date.now() - trimmed * 31556952000);
    }
    else {
        time = new Date(Date.now());
    }
    return time;
}
exports.convertTime = convertTime;
/**
 * When a function requires a POST body, it always should be defined as a JsonObject
 * and then passed through this function to ensure that it's encoded properly.
 * @param obj
 */
function urlEncodeObject(obj) {
    let ret = {};
    for (const entry of Object.entries(obj)) {
        ret[encodeURIComponent(entry[0])] = encodeURIComponent(entry[1]);
    }
    return ret;
}
exports.urlEncodeObject = urlEncodeObject;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tracker = void 0;
class Tracker {
    constructor(cheerio) {
        this.cheerio = cheerio;
    }
}
exports.Tracker = Tracker;

},{}],4:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Source"), exports);
__exportStar(require("./Tracker"), exports);

},{"./Source":2,"./Tracker":3}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./base"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./APIWrapper"), exports);

},{"./APIWrapper":1,"./base":4,"./models":47}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],7:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],8:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],9:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],10:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],11:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],12:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],13:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],14:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],15:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],16:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],17:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],18:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],19:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],20:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],21:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],22:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],23:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Button"), exports);
__exportStar(require("./Form"), exports);
__exportStar(require("./Header"), exports);
__exportStar(require("./InputField"), exports);
__exportStar(require("./Label"), exports);
__exportStar(require("./Link"), exports);
__exportStar(require("./MultilineLabel"), exports);
__exportStar(require("./NavigationButton"), exports);
__exportStar(require("./OAuthButton"), exports);
__exportStar(require("./Section"), exports);
__exportStar(require("./Select"), exports);
__exportStar(require("./Switch"), exports);
__exportStar(require("./WebViewButton"), exports);
__exportStar(require("./FormRow"), exports);
__exportStar(require("./Stepper"), exports);

},{"./Button":9,"./Form":10,"./FormRow":11,"./Header":12,"./InputField":13,"./Label":14,"./Link":15,"./MultilineLabel":16,"./NavigationButton":17,"./OAuthButton":18,"./Section":19,"./Select":20,"./Stepper":21,"./Switch":22,"./WebViewButton":23}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeSectionType = void 0;
var HomeSectionType;
(function (HomeSectionType) {
    HomeSectionType["singleRowNormal"] = "singleRowNormal";
    HomeSectionType["singleRowLarge"] = "singleRowLarge";
    HomeSectionType["doubleRow"] = "doubleRow";
    HomeSectionType["featured"] = "featured";
})(HomeSectionType = exports.HomeSectionType || (exports.HomeSectionType = {}));

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageCode = void 0;
var LanguageCode;
(function (LanguageCode) {
    LanguageCode["UNKNOWN"] = "_unknown";
    LanguageCode["BENGALI"] = "bd";
    LanguageCode["BULGARIAN"] = "bg";
    LanguageCode["BRAZILIAN"] = "br";
    LanguageCode["CHINEESE"] = "cn";
    LanguageCode["CZECH"] = "cz";
    LanguageCode["GERMAN"] = "de";
    LanguageCode["DANISH"] = "dk";
    LanguageCode["ENGLISH"] = "gb";
    LanguageCode["SPANISH"] = "es";
    LanguageCode["FINNISH"] = "fi";
    LanguageCode["FRENCH"] = "fr";
    LanguageCode["WELSH"] = "gb";
    LanguageCode["GREEK"] = "gr";
    LanguageCode["CHINEESE_HONGKONG"] = "hk";
    LanguageCode["HUNGARIAN"] = "hu";
    LanguageCode["INDONESIAN"] = "id";
    LanguageCode["ISRELI"] = "il";
    LanguageCode["INDIAN"] = "in";
    LanguageCode["IRAN"] = "ir";
    LanguageCode["ITALIAN"] = "it";
    LanguageCode["JAPANESE"] = "jp";
    LanguageCode["KOREAN"] = "kr";
    LanguageCode["LITHUANIAN"] = "lt";
    LanguageCode["MONGOLIAN"] = "mn";
    LanguageCode["MEXIAN"] = "mx";
    LanguageCode["MALAY"] = "my";
    LanguageCode["DUTCH"] = "nl";
    LanguageCode["NORWEGIAN"] = "no";
    LanguageCode["PHILIPPINE"] = "ph";
    LanguageCode["POLISH"] = "pl";
    LanguageCode["PORTUGUESE"] = "pt";
    LanguageCode["ROMANIAN"] = "ro";
    LanguageCode["RUSSIAN"] = "ru";
    LanguageCode["SANSKRIT"] = "sa";
    LanguageCode["SAMI"] = "si";
    LanguageCode["THAI"] = "th";
    LanguageCode["TURKISH"] = "tr";
    LanguageCode["UKRAINIAN"] = "ua";
    LanguageCode["VIETNAMESE"] = "vn";
})(LanguageCode = exports.LanguageCode || (exports.LanguageCode = {}));

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaStatus = void 0;
var MangaStatus;
(function (MangaStatus) {
    MangaStatus[MangaStatus["ONGOING"] = 1] = "ONGOING";
    MangaStatus[MangaStatus["COMPLETED"] = 0] = "COMPLETED";
    MangaStatus[MangaStatus["UNKNOWN"] = 2] = "UNKNOWN";
    MangaStatus[MangaStatus["ABANDONED"] = 3] = "ABANDONED";
    MangaStatus[MangaStatus["HIATUS"] = 4] = "HIATUS";
})(MangaStatus = exports.MangaStatus || (exports.MangaStatus = {}));

},{}],28:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],29:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],31:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],32:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],33:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],34:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],35:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],36:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],37:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOperator = void 0;
var SearchOperator;
(function (SearchOperator) {
    SearchOperator["AND"] = "AND";
    SearchOperator["OR"] = "OR";
})(SearchOperator = exports.SearchOperator || (exports.SearchOperator = {}));

},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRating = void 0;
/**
 * A content rating to be attributed to each source.
 */
var ContentRating;
(function (ContentRating) {
    ContentRating["EVERYONE"] = "EVERYONE";
    ContentRating["MATURE"] = "MATURE";
    ContentRating["ADULT"] = "ADULT";
})(ContentRating = exports.ContentRating || (exports.ContentRating = {}));

},{}],40:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],41:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagType = void 0;
/**
 * An enumerator which {@link SourceTags} uses to define the color of the tag rendered on the website.
 * Five types are available: blue, green, grey, yellow and red, the default one is blue.
 * Common colors are red for (Broken), yellow for (+18), grey for (Country-Proof)
 */
var TagType;
(function (TagType) {
    TagType["BLUE"] = "default";
    TagType["GREEN"] = "success";
    TagType["GREY"] = "info";
    TagType["YELLOW"] = "warning";
    TagType["RED"] = "danger";
})(TagType = exports.TagType || (exports.TagType = {}));

},{}],43:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],44:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],45:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],46:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6}],47:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./Chapter"), exports);
__exportStar(require("./ChapterDetails"), exports);
__exportStar(require("./HomeSection"), exports);
__exportStar(require("./Manga"), exports);
__exportStar(require("./MangaTile"), exports);
__exportStar(require("./RequestObject"), exports);
__exportStar(require("./SearchRequest"), exports);
__exportStar(require("./TagSection"), exports);
__exportStar(require("./SourceTag"), exports);
__exportStar(require("./Languages"), exports);
__exportStar(require("./Constants"), exports);
__exportStar(require("./MangaUpdate"), exports);
__exportStar(require("./PagedResults"), exports);
__exportStar(require("./ResponseObject"), exports);
__exportStar(require("./RequestManager"), exports);
__exportStar(require("./RequestHeaders"), exports);
__exportStar(require("./SourceInfo"), exports);
__exportStar(require("./SourceStateManager"), exports);
__exportStar(require("./RequestInterceptor"), exports);
__exportStar(require("./DynamicUI"), exports);
__exportStar(require("./TrackedManga"), exports);
__exportStar(require("./SourceManga"), exports);
__exportStar(require("./TrackedMangaChapterReadAction"), exports);
__exportStar(require("./TrackerActionQueue"), exports);
__exportStar(require("./SearchField"), exports);
__exportStar(require("./RawData"), exports);

},{"./Chapter":6,"./ChapterDetails":7,"./Constants":8,"./DynamicUI":24,"./HomeSection":25,"./Languages":26,"./Manga":27,"./MangaTile":28,"./MangaUpdate":29,"./PagedResults":30,"./RawData":31,"./RequestHeaders":32,"./RequestInterceptor":33,"./RequestManager":34,"./RequestObject":35,"./ResponseObject":36,"./SearchField":37,"./SearchRequest":38,"./SourceInfo":39,"./SourceManga":40,"./SourceStateManager":41,"./SourceTag":42,"./TagSection":43,"./TrackedManga":44,"./TrackedMangaChapterReadAction":45,"./TrackerActionQueue":46}],48:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuryoSquad = exports.FuryoSquadInfo = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
const FuryoSquadParser_1 = require("./FuryoSquadParser");
const FURYOSQUAD_DOMAIN = "https://www.furyosquad.com";
const method = 'GET';
const headers = {
    'Host': 'www.furyosquad.com',
};
exports.FuryoSquadInfo = {
    version: '1.1',
    name: 'FuryoSquad',
    icon: 'logo.png',
    author: 'Michieru',
    authorWebsite: 'https://github.com/Michieru',
    description: 'Source française FuryoSquad',
    contentRating: paperback_extensions_common_1.ContentRating.MATURE,
    websiteBaseURL: FURYOSQUAD_DOMAIN,
    sourceTags: [
        {
            text: "Francais",
            type: paperback_extensions_common_1.TagType.GREY
        },
        {
            text: 'Notifications',
            type: paperback_extensions_common_1.TagType.GREEN
        }
    ]
};
class FuryoSquad extends paperback_extensions_common_1.Source {
    constructor() {
        super(...arguments);
        this.requestManager = createRequestManager({
            requestsPerSecond: 3
        });
    }
    /////////////////////////////////
    /////    MANGA SHARE URL    /////
    /////////////////////////////////
    getMangaShareUrl(mangaId) {
        return `${FURYOSQUAD_DOMAIN}/series/${mangaId}`;
    }
    ///////////////////////////////
    /////    MANGA DETAILS    /////
    ///////////////////////////////
    getMangaDetails(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${FURYOSQUAD_DOMAIN}/series/${mangaId}`,
                method,
                headers
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return yield FuryoSquadParser_1.parseFuryoSquadMangaDetails($, mangaId);
        });
    }
    //////////////////////////
    /////    CHAPTERS    /////
    //////////////////////////
    getChapters(mangaId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${FURYOSQUAD_DOMAIN}/series/${mangaId}`,
                method,
                headers
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return yield FuryoSquadParser_1.parseFuryoSquadChapters($, mangaId);
        });
    }
    //////////////////////////////////
    /////    CHAPTERS DETAILS    /////
    //////////////////////////////////
    getChapterDetails(mangaId, chapterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = createRequestObject({
                url: `${chapterId}`,
                method,
                headers
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            return yield FuryoSquadParser_1.parseFuryoSquadChapterDetails($, mangaId, chapterId);
        });
    }
    ////////////////////////////////
    /////    SEARCH REQUEST    /////
    ////////////////////////////////
    getSearchResults(query, metadata) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const search = (_b = (_a = query.title) === null || _a === void 0 ? void 0 : _a.replace(/ /g, '+').replace(/[’'´]/g, '%27')) !== null && _b !== void 0 ? _b : "";
            let manga = [];
            const request = createRequestObject({
                url: `${FURYOSQUAD_DOMAIN}/search`,
                method: 'POST',
                headers,
                data: `search=${search}`
            });
            const response = yield this.requestManager.schedule(request, 1);
            const $ = this.cheerio.load(response.data);
            manga = FuryoSquadParser_1.parseSearch($);
            return createPagedResults({
                results: manga,
                metadata: undefined
            });
        });
    }
    //////////////////////////////
    /////    HOME SECTION    /////
    //////////////////////////////
    getHomePageSections(sectionCallback) {
        return __awaiter(this, void 0, void 0, function* () {
            const section1 = createHomeSection({ id: 'latest_update', title: 'Dernier Mangas Sortis' });
            const section2 = createHomeSection({ id: 'on_going', title: 'Mangas En Cours' });
            const section3 = createHomeSection({ id: 'finished', title: 'Mangas Terminés' });
            const section4 = createHomeSection({ id: 'stopped', title: 'Mangas Stoppés' });
            const request1 = createRequestObject({
                url: `${FURYOSQUAD_DOMAIN}`,
                method: 'GET',
                headers
            });
            const request2 = createRequestObject({
                url: `${FURYOSQUAD_DOMAIN}/mangas`,
                method: 'GET',
                headers
            });
            const response1 = yield this.requestManager.schedule(request1, 1);
            const $1 = this.cheerio.load(response1.data);
            const response2 = yield this.requestManager.schedule(request2, 1);
            const $2 = this.cheerio.load(response2.data);
            FuryoSquadParser_1.parseHomeSections($1, [section1], sectionCallback);
            FuryoSquadParser_1.parseMangaSectionOthers($2, [section2, section3, section4], sectionCallback);
        });
    }
    //////////////////////////////////////
    /////    FILTER UPDATED MANGA    /////
    //////////////////////////////////////
    filterUpdatedManga(mangaUpdatesFoundCallback, time, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let updatedManga = {
                ids: [],
                loadMore: true
            };
            while (updatedManga.loadMore) {
                const request = createRequestObject({
                    url: `${FURYOSQUAD_DOMAIN}`,
                    method,
                    headers
                });
                const response = yield this.requestManager.schedule(request, 1);
                const $ = this.cheerio.load(response.data);
                updatedManga = FuryoSquadParser_1.parseUpdatedManga($, time, ids);
                if (updatedManga.ids.length > 0) {
                    mangaUpdatesFoundCallback(createMangaUpdates({
                        ids: updatedManga.ids
                    }));
                }
            }
        });
    }
}
exports.FuryoSquad = FuryoSquad;

},{"./FuryoSquadParser":49,"paperback-extensions-common":5}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUpdatedManga = exports.parseMangaSectionOthers = exports.parseHomeSections = exports.parseSearch = exports.parseFuryoSquadChapterDetails = exports.parseFuryoSquadChapters = exports.parseFuryoSquadMangaDetails = void 0;
const paperback_extensions_common_1 = require("paperback-extensions-common");
///////////////////////////////
/////    MANGA DETAILS    /////
///////////////////////////////
const parseFuryoSquadMangaDetails = ($, mangaId) => {
    var _a;
    let titles = [decodeHTMLEntity($('.fs-comic-title').text().trim())];
    const image = (_a = $('.comic-cover').attr('src')) !== null && _a !== void 0 ? _a : "";
    const panel = $('.fs-comic-text-container');
    const status = paperback_extensions_common_1.MangaStatus.UNKNOWN;
    const author = $('p[class="fs-comic-label"]:contains("Scénario")', panel).next().text();
    const artist = $('p[class="fs-comic-label"]:contains("Dessins")', panel).next().text();
    const arrayTags = [];
    const genres = $('p[class="fs-comic-label"]:contains("Genre")', panel).next().text().split(',');
    const type = $('p[class="fs-comic-label"]:contains("Type")', panel).next().text();
    const desc = decodeHTMLEntity($('.fs-comic-description', panel).text().trim());
    let hentai = false;
    // Genres
    if (genres.length > 0) {
        for (const item of genres) {
            const label = item.trim();
            const id = label;
            arrayTags.push({ id: id, label: label });
            if (['Gore'].includes(label)) {
                hentai = true;
            }
        }
    }
    // Type
    arrayTags.push({ id: type, label: type });
    const tagSections = [createTagSection({ id: '0', label: 'genres', tags: arrayTags.length > 0 ? arrayTags.map(x => createTag(x)) : [] })];
    return createManga({
        id: mangaId,
        titles,
        image,
        status,
        artist,
        author,
        tags: tagSections,
        desc,
        hentai
    });
};
exports.parseFuryoSquadMangaDetails = parseFuryoSquadMangaDetails;
//////////////////////////
/////    CHAPTERS    /////
//////////////////////////
const parseFuryoSquadChapters = ($, mangaId) => {
    var _a, _b;
    const chapters = [];
    for (let chapter of $('.fs-chapter-list .element.desktop').toArray()) {
        const id = (_a = $('a', chapter).eq(1).attr('href')) !== null && _a !== void 0 ? _a : '';
        const name = decodeHTMLEntity($('.name', chapter).text()) != '' ? decodeHTMLEntity($('.name', chapter).text()) : undefined;
        const chapNum = Number($('.title', chapter).text().split(' ').pop());
        const volume = !isNaN(Number($(chapter).parent().children('.title').text().trim().split(' ')[1])) ? Number($(chapter).parent().children('.title').text().trim().split(' ')[1]) : undefined;
        const time = parseDate((_b = $('.meta_r', chapter).text()) !== null && _b !== void 0 ? _b : "");
        chapters.push(createChapter({
            id,
            mangaId,
            name,
            langCode: paperback_extensions_common_1.LanguageCode.FRENCH,
            chapNum,
            volume,
            time
        }));
    }
    return chapters;
};
exports.parseFuryoSquadChapters = parseFuryoSquadChapters;
/////////////////////////////////
/////    CHAPTER DETAILS    /////
/////////////////////////////////
const parseFuryoSquadChapterDetails = ($, mangaId, chapterId) => {
    var _a;
    const pages = [];
    for (let item of $('img', '.fs-reader-page').toArray()) {
        let page = encodeURI((_a = $(item).attr('src')) !== null && _a !== void 0 ? _a : "");
        if (typeof page === 'undefined')
            continue;
        pages.push(page);
    }
    return createChapterDetails({
        id: chapterId,
        mangaId: mangaId,
        pages,
        longStrip: false
    });
};
exports.parseFuryoSquadChapterDetails = parseFuryoSquadChapterDetails;
////////////////////////
/////    SEARCH    /////
////////////////////////
const parseSearch = ($) => {
    var _a;
    const manga = [];
    for (const item of $('.group').toArray()) {
        let url = (_a = $('.title a', item).attr('href')) === null || _a === void 0 ? void 0 : _a.split("/")[4];
        let image = "";
        let title = decodeHTMLEntity($('.title a', item).eq(0).text().trim());
        let subtitle = decodeHTMLEntity($('.element .title a', item).text().trim());
        if (typeof url === 'undefined' || typeof image === 'undefined')
            continue;
        manga.push(createMangaTile({
            id: url,
            image: image,
            title: createIconText({ text: title }),
            subtitleText: createIconText({ text: subtitle }),
        }));
    }
    return manga;
};
exports.parseSearch = parseSearch;
/////////////////////////////////////
/////    LAST MANGAS UPDATED    /////
/////////////////////////////////////
const parseLatestManga = ($) => {
    var _a;
    const latestManga = [];
    for (const item of $('table tbody tr').toArray()) {
        let url = (_a = $('.fs-comic-title a', item).attr('href')) === null || _a === void 0 ? void 0 : _a.split("/")[4];
        let image = $('.fs-chap-img', item).attr('src');
        let title = decodeHTMLEntity($('.fs-comic-title', item).text());
        let subtitle = decodeHTMLEntity($('.fs-chapter', item).text() + " : " + $('.fs-chap-name', item).text());
        if (typeof url === 'undefined' || typeof image === 'undefined')
            continue;
        latestManga.push(createMangaTile({
            id: url,
            image: image,
            title: createIconText({ text: title }),
            subtitleText: createIconText({ text: subtitle }),
        }));
    }
    return latestManga;
};
////////////////////////////////
/////    MANGAS ONGOING    /////
////////////////////////////////
const parseOngoingManga = ($) => {
    var _a;
    const ongoingManga = [];
    for (const item of $('#fs-en-cours .fs-card-container.desktop .grid-item-container').toArray()) {
        let url = (_a = $('.fs-comic-title a', item).attr('href')) === null || _a === void 0 ? void 0 : _a.split("/")[4];
        let image = $('.fs-card-img', item).attr('src');
        let title = decodeHTMLEntity($('.fs-comic-title', item).text());
        if (typeof url === 'undefined' || typeof image === 'undefined')
            continue;
        ongoingManga.push(createMangaTile({
            id: url,
            image: image,
            title: createIconText({ text: title })
        }));
    }
    return ongoingManga;
};
/////////////////////////////////
/////    MANGAS FINISHED    /////
/////////////////////////////////
const parseFinishedManga = ($) => {
    var _a;
    const finishedManga = [];
    for (const item of $('#fs-termines .fs-card-container.desktop .grid-item-container').toArray()) {
        let url = (_a = $('.fs-comic-title a', item).attr('href')) === null || _a === void 0 ? void 0 : _a.split("/")[4];
        let image = $('.fs-card-img', item).attr('src');
        let title = decodeHTMLEntity($('.fs-comic-title', item).text());
        if (typeof url === 'undefined' || typeof image === 'undefined')
            continue;
        finishedManga.push(createMangaTile({
            id: url,
            image: image,
            title: createIconText({ text: title })
        }));
    }
    return finishedManga;
};
////////////////////////////////
/////    MANGAS STOPPED    /////
////////////////////////////////
const parseStoppedManga = ($) => {
    var _a;
    const stoppedManga = [];
    for (const item of $('#fs-stoppes .fs-card-container.desktop .grid-item-container').toArray()) {
        let url = (_a = $('.fs-comic-title a', item).attr('href')) === null || _a === void 0 ? void 0 : _a.split("/")[4];
        let image = $('.fs-card-img', item).attr('src');
        let title = decodeHTMLEntity($('.fs-comic-title', item).text());
        if (typeof url === 'undefined' || typeof image === 'undefined')
            continue;
        stoppedManga.push(createMangaTile({
            id: url,
            image: image,
            title: createIconText({ text: title })
        }));
    }
    return stoppedManga;
};
//////////////////////////////
/////    HOME SECTION    /////
//////////////////////////////
const parseHomeSections = ($, sections, sectionCallback) => {
    for (const section of sections)
        sectionCallback(section);
    const latestManga = parseLatestManga($);
    sections[0].items = latestManga;
    for (const section of sections)
        sectionCallback(section);
};
exports.parseHomeSections = parseHomeSections;
////////////////////////////////
/////    MANGAS SECTION    /////
////////////////////////////////
const parseMangaSectionOthers = ($, sections, sectionCallback) => {
    for (const section of sections)
        sectionCallback(section);
    const ongoingManga = parseOngoingManga($);
    const finishedManga = parseFinishedManga($);
    const stoppedManga = parseStoppedManga($);
    sections[0].items = ongoingManga;
    sections[1].items = finishedManga;
    sections[2].items = stoppedManga;
    for (const section of sections)
        sectionCallback(section);
};
exports.parseMangaSectionOthers = parseMangaSectionOthers;
const parseUpdatedManga = ($, time, ids) => {
    var _a, _b, _c;
    const manga = [];
    let loadMore = true;
    for (const item of $('table tr').toArray()) {
        let id = (_b = ((_a = $('.fs-comic-title a', item).attr('href')) !== null && _a !== void 0 ? _a : '').split('/').slice(-2, -1)[0]) !== null && _b !== void 0 ? _b : '';
        let mangaTime = parseDate((_c = $('.fs-table-chap-date .fs-chap-date', item).text().trim()) !== null && _c !== void 0 ? _c : '');
        if (mangaTime > time)
            if (ids.includes(id))
                manga.push(id);
            else
                loadMore = false;
    }
    return {
        ids: manga,
        loadMore,
    };
};
exports.parseUpdatedManga = parseUpdatedManga;
/////////////////////////////////
/////    ADDED FUNCTIONS    /////
/////////////////////////////////
function decodeHTMLEntity(str) {
    return str.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
}
function parseDate(str) {
    var _a, _b;
    if (str.length == 0) {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
    switch (str.trim()) {
        case "Aujourd'hui":
            let today = new Date();
            return new Date(today.getFullYear(), today.getMonth(), today.getDate());
        case "Hier":
            let yesterday = new Date();
            return new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate() - 1);
        case "Avant-hier":
            let beforeyesterday = new Date();
            return new Date(beforeyesterday.getFullYear(), beforeyesterday.getMonth(), beforeyesterday.getDate() - 2);
        default:
            let date = ((_b = ((_a = str.match(/(\d+)(\s)(\w+)/gm)) !== null && _a !== void 0 ? _a : "")[0]) !== null && _b !== void 0 ? _b : "").split(' ');
            let date_today = new Date();
            switch (date[1]) {
                case "jours":
                    return new Date(date_today.getFullYear(), date_today.getMonth(), date_today.getDate() - parseInt(date[0]), date_today.getHours(), date_today.getMinutes());
                case "mois":
                    return new Date(date_today.getFullYear(), date_today.getMonth() - parseInt(date[0]), date_today.getDate(), date_today.getHours(), date_today.getMinutes());
                case "an":
                case "ans":
                    return new Date(date_today.getFullYear() - parseInt(date[0]), date_today.getMonth(), date_today.getDate(), date_today.getHours(), date_today.getMinutes());
            }
    }
    return new Date();
}

},{"paperback-extensions-common":5}]},{},[48])(48)
});
