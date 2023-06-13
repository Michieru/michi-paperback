import {
    Source,
    Manga,
    Chapter,
    ChapterDetails,
    HomeSection,
    SearchRequest,
    PagedResults,
    SourceInfo,
    MangaUpdates,
    TagType,
    RequestManager,
    ContentRating,
    MangaTile
} from "paperback-extensions-common"

import {
    parseFuryoSquadMangaDetails,
    parseFuryoSquadChapters,
    parseFuryoSquadChapterDetails,
    parseSearch,
    parseHomeSections,
    parseMangaSectionOthers,
    UpdatedManga,
    parseUpdatedManga
} from "./FuryoSquadParser";

const FURYOSQUAD_DOMAIN = "https://www.furyosquad.com";
const method = 'GET'
const headers = {
    'Host': 'www.furyosquad.com',
}

export const FuryoSquadInfo: SourceInfo = {
    version: '1.1',
    name: 'FuryoSquad',
    icon: 'logo.png',
    author: 'Michi',
    authorWebsite: 'https://github.com/Michieru',
    description: 'Source française FuryoSquad',
    contentRating: ContentRating.MATURE,
    websiteBaseURL: FURYOSQUAD_DOMAIN,
    sourceTags: [
        {
            text: "Francais",
            type: TagType.GREY
        },
        {
            text: 'Notifications',
            type: TagType.GREEN
        }
    ]
}

export class FuryoSquad extends Source {

    requestManager: RequestManager = createRequestManager({
        requestsPerSecond: 3
    });


    /////////////////////////////////
    /////    MANGA SHARE URL    /////
    /////////////////////////////////

    getMangaShareUrl(mangaId: string): string {
        return `${FURYOSQUAD_DOMAIN}/series/${mangaId}`
    }


    ///////////////////////////////
    /////    MANGA DETAILS    /////
    ///////////////////////////////

    async getMangaDetails(mangaId: string): Promise<Manga> {
        const request = createRequestObject({
            url: `${FURYOSQUAD_DOMAIN}/series/${mangaId}`,
            method,
            headers
        })

        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);

        return await parseFuryoSquadMangaDetails($, mangaId);
    }


    //////////////////////////
    /////    CHAPTERS    /////
    //////////////////////////

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const request = createRequestObject({
            url: `${FURYOSQUAD_DOMAIN}/series/${mangaId}`,
            method,
            headers
        })

        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);

        return await parseFuryoSquadChapters($, mangaId);
    }


    //////////////////////////////////
    /////    CHAPTERS DETAILS    /////
    //////////////////////////////////

    async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
        const request = createRequestObject({
            url: `${chapterId}`,
            method,
            headers
        })

        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);

        return await parseFuryoSquadChapterDetails($, mangaId, chapterId);
    }


    ////////////////////////////////
    /////    SEARCH REQUEST    /////
    ////////////////////////////////

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        const search = query.title?.replace(/ /g, '+').replace(/[’'´]/g, '%27') ?? ""
        let manga: MangaTile[] = []

        const request = createRequestObject({
            url: `${FURYOSQUAD_DOMAIN}/search`,
            method: 'POST',
            headers,
            data: `search=${search}`
        })

        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)

        manga = parseSearch($)

        return createPagedResults({
            results: manga,
            metadata: undefined
        })
    }


    //////////////////////////////
    /////    HOME SECTION    /////
    //////////////////////////////

    async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const section1 = createHomeSection({ id: 'latest_update', title: 'Dernier Mangas Sortis' })
        const section2 = createHomeSection({ id: 'on_going', title: 'Mangas En Cours' })
        const section3 = createHomeSection({ id: 'finished', title: 'Mangas Terminés' })
        const section4 = createHomeSection({ id: 'stopped', title: 'Mangas Stoppés' })

        const request1 = createRequestObject({
            url: `${FURYOSQUAD_DOMAIN}`,
            method: 'GET',
            headers
        })

        const request2 = createRequestObject({
            url: `${FURYOSQUAD_DOMAIN}/mangas`,
            method: 'GET',
            headers
        })

        const response1 = await this.requestManager.schedule(request1, 1)
        const $1 = this.cheerio.load(response1.data)

        const response2 = await this.requestManager.schedule(request2, 1)
        const $2 = this.cheerio.load(response2.data)

        parseHomeSections($1, [section1], sectionCallback)
        parseMangaSectionOthers($2, [section2, section3, section4], sectionCallback)
    }


    //////////////////////////////////////
    /////    FILTER UPDATED MANGA    /////
    //////////////////////////////////////

    async filterUpdatedManga(mangaUpdatesFoundCallback: (updates: MangaUpdates) => void, time: Date, ids: string[]): Promise<void> {
        let updatedManga: UpdatedManga = {
            ids: [],
            loadMore: true
        }

        while (updatedManga.loadMore) {
            const request = createRequestObject({
                url: `${FURYOSQUAD_DOMAIN}`,
                method,
                headers
            })

            const response = await this.requestManager.schedule(request, 1)
            const $ = this.cheerio.load(response.data)

            updatedManga = parseUpdatedManga($, time, ids)
            if (updatedManga.ids.length > 0) {
                mangaUpdatesFoundCallback(createMangaUpdates({
                    ids: updatedManga.ids
                }));
            }
        }
    }

}