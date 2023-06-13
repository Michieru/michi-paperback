import {
    Source,
    Manga,
    Chapter,
    ChapterDetails,
    HomeSection,
    SearchRequest,
    TagSection,
    PagedResults,
    SourceInfo,
    MangaUpdates,
    TagType,
    MangaTile,
    ContentRating,
    RequestManager
} from "paperback-extensions-common"

import {
    parseHomeSections,
    parseFrScanDetails,
    parseFrScanChapters,
    parseFrScanChapterDetails,
    parseViewMore,
    isLastPage,
    parseTags,
    parseSearch,
    UpdatedManga,
    parseUpdatedManga
} from "./FrScanParser";

const FRSCAN_DOMAIN = "https://fr-scan.com";
const method = 'GET'
const headers = {
    'Host': 'fr-scan.com'
}

export const FrScanInfo: SourceInfo = {
    version: '1.0.2',
    name: 'FRScan',
    icon: 'logo.png',
    author: 'Michi',
    authorWebsite: 'https://github.com/Michieru',
    description: 'Source française FRScan',
    contentRating: ContentRating.MATURE,
    websiteBaseURL: FRSCAN_DOMAIN,
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

export class FrScan extends Source {

    requestManager: RequestManager = createRequestManager({
        requestsPerSecond: 3
    });


    /////////////////////////////////
    /////    MANGA SHARE URL    /////
    /////////////////////////////////

    getMangaShareUrl(mangaId: string): string {
        return `${FRSCAN_DOMAIN}/manga/${mangaId}`
    }


    ///////////////////////////////
    /////    MANGA DETAILS    /////
    ///////////////////////////////

    async getMangaDetails(mangaId: string): Promise<Manga> {
        const request = createRequestObject({
            url: `${FRSCAN_DOMAIN}/manga/${mangaId}`,
            method,
            headers
        })

        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);

        return await parseFrScanDetails($, mangaId);
    }


    //////////////////////////
    /////    CHAPTERS    /////
    //////////////////////////

    async getChapters(mangaId: string): Promise<Chapter[]> {
        const request = createRequestObject({
            url: `${FRSCAN_DOMAIN}/manga/${mangaId}/ajax/chapters/`,
            method: 'POST',
            headers
        })

        const response = await this.requestManager.schedule(request, 1);
        const $ = this.cheerio.load(response.data);

        return await parseFrScanChapters($, mangaId);
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

        return await parseFrScanChapterDetails($, mangaId, chapterId);
    }


    ////////////////////////////////
    /////    SEARCH REQUEST    /////
    ////////////////////////////////

    async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
        const search = query.title?.replace(/ /g, '+').replace(/[’'´]/g, '%27') ?? ''
        let page: number = metadata?.page ?? 1

        let url = `${FRSCAN_DOMAIN}/?post_type=wp-manga&s=${search}&paged=${page}`

        if (query.includedTags && query.includedTags?.length != 0) {
            for (let tag of query.includedTags) {
                switch (tag.label) {
                    case "OU (ayant un des genres sélectionnés)":
                    case "ET (ayant tous les genres sélectionnés)":
                        url += `&op=${tag.id}`
                        break;
                    case "Tout":
                    case "Aucun Contenu pour Adulte":
                    case "Uniquement du Contenu pour Adulte":
                        url += `&adult=${tag.id}`
                        break;
                    case "En Cours":
                    case "Terminé":
                    case "Annulé":
                    case "En Pause":
                        url += `&status%5B%5D=${tag.id}`
                        break;
                    default:
                        url += `&genre%5B%5D=${tag.id}`
                        break;
                }
            }
        }

        const request = createRequestObject({
            url,
            method,
            headers
        })

        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)

        const manga = parseSearch($)
        metadata = !isLastPage($) ? { page: page + 1 } : undefined

        return createPagedResults({
            results: manga,
            metadata
        })
    }


    //////////////////////////////
    /////    HOME SECTION    /////
    //////////////////////////////

    async getHomePageSections(sectionCallback: (section: HomeSection) => void): Promise<void> {
        const section1 = createHomeSection({ id: 'latest_updated', title: 'Dernières Sorties', view_more: true })
        const section2 = createHomeSection({ id: 'popular_manga', title: 'Manga Populaire' })
        const section3 = createHomeSection({ id: 'project_partners', title: 'Projets & Partenaires' })

        const request = createRequestObject({
            url: `${FRSCAN_DOMAIN}`,
            method,
            headers
        })

        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)

        parseHomeSections($, [section1, section2, section3], sectionCallback)
    }

    /////////////////////////////////
    /////    VIEW MORE ITEMS    /////
    /////////////////////////////////

    async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
        let page: number = metadata?.page ?? 1
        let param = ''
        switch (homepageSectionId) {
            case 'latest_updated':
                param = `?s&post_type=wp-manga&m_orderby=latest&paged=${page}`
                break;
        }

        const request = createRequestObject({
            url: `${FRSCAN_DOMAIN}/${param}`,
            method,
            headers
        })

        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)

        const manga = parseViewMore($)
        metadata = !isLastPage($) ? { page: page + 1 } : undefined

        return createPagedResults({
            results: manga,
            metadata
        })
    }


    //////////////////////////////////////
    /////    FILTER UPDATED MANGA    /////
    //////////////////////////////////////

    async filterUpdatedManga(mangaUpdatesFoundCallback: (updates: MangaUpdates) => void, time: Date, ids: string[]): Promise<void> {
        let page = 1
        let updatedManga: UpdatedManga = {
            ids: [],
            loadMore: true
        }

        while (updatedManga.loadMore) {
            const request = createRequestObject({
                url: `${FRSCAN_DOMAIN}/?s&post_type=wp-manga&m_orderby=latest&page=${page++}`,
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


    //////////////////////
    /////    TAGS    /////
    //////////////////////

    async getSearchTags(): Promise<TagSection[]> {
        const request = createRequestObject({
            url: `${FRSCAN_DOMAIN}/?s=&post_type=wp-manga`,
            method,
            headers
        })

        const response = await this.requestManager.schedule(request, 1)
        const $ = this.cheerio.load(response.data)

        return parseTags($)
    }
}