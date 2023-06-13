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
  TagType,
  ContentRating,
  RequestManager,
  MangaUpdates,
  MangaTile,
  HomeSectionType
} from "paperback-extensions-common"

import {
  isLastPage,
  parseHomeSections,
  parseReaperScansFRChapterDetails,
  parseReaperScansFRChapters,
  parseReaperScansFRDetails,
  parseSearch,
  parseTags,
  parseUpdatedManga,
  parseViewMore,
  UpdatedManga
} from "../ReaperScansFR/ReaperScansFRParser";

const REAPERSCANS_DOMAIN = "https://reaperscans.fr";
const method = 'GET'
const headers = {
  'Host': 'reaperscans.fr'
}

export const ReaperScansFRInfo: SourceInfo = {
  version: '1.3.3',
  name: 'ReaperScansFR',
  icon: 'logo.png',
  author: 'Michi',
  authorWebsite: 'https://github.com/Michieru',
  description: 'Source française ReaperScansFR',
  contentRating: ContentRating.MATURE,
  websiteBaseURL: REAPERSCANS_DOMAIN,
  sourceTags: [
    {
      text: "Francais",
      type: TagType.GREY
    },
    {
      text: 'Notifications',
      type: TagType.GREEN
    },
    {
      text: 'Cloudflare',
      type: TagType.RED
    }
  ]
}

export class ReaperScansFR extends Source {

  requestManager: RequestManager = createRequestManager({
    requestsPerSecond: 3
  });


  /////////////////////////////////
  /////    MANGA SHARE URL    /////
  /////////////////////////////////

  getMangaShareUrl(mangaId: string): string {
    return `${REAPERSCANS_DOMAIN}/serie/${mangaId}`
  }


  ///////////////////////////////
  /////    MANGA DETAILS    /////
  ///////////////////////////////

  async getMangaDetails(mangaId: string): Promise<Manga> {
    const request = createRequestObject({
      url: `${REAPERSCANS_DOMAIN}/serie/${mangaId}`,
      method,
      headers
    })

    const response = await this.requestManager.schedule(request, 1);
    this.CloudFlareError(response.status)
    const $ = this.cheerio.load(response.data);

    return await parseReaperScansFRDetails($, mangaId);
  }


  //////////////////////////
  /////    CHAPTERS    /////
  //////////////////////////

  async getChapters(mangaId: string): Promise<Chapter[]> {
    const request = createRequestObject({
      url: `${REAPERSCANS_DOMAIN}/serie/${mangaId}`,
      method,
      headers
    })

    const response = await this.requestManager.schedule(request, 1);
    this.CloudFlareError(response.status)
    const $ = this.cheerio.load(response.data);

    return await parseReaperScansFRChapters($, mangaId);
  }


  //////////////////////////////////
  /////    CHAPTERS DETAILS    /////
  //////////////////////////////////

  async getChapterDetails(mangaId: string, chapterId: string): Promise<ChapterDetails> {
    const request = createRequestObject({
      url: `${chapterId}?style=list`,
      method,
      headers
    })

    const response = await this.requestManager.schedule(request, 1);
    this.CloudFlareError(response.status)
    const $ = this.cheerio.load(response.data);

    return await parseReaperScansFRChapterDetails($, mangaId, chapterId);
  }


  ////////////////////////////////
  /////    SEARCH REQUEST    /////
  ////////////////////////////////

  async getSearchResults(query: SearchRequest, metadata: any): Promise<PagedResults> {
    const page: number = metadata?.page ?? 1
    const search = query.title?.replace(/ /g, '+').replace(/[’'´]/g, '%27') ?? ''
    let manga: MangaTile[] = []

    let url = `${REAPERSCANS_DOMAIN}/?post_type=wp-manga&s=${search}&paged=${page}`

    if (query.includedTags && query.includedTags?.length != 0) {
      for (let tag of query.includedTags) {
        url += `&genre[]=${tag.id}`
      }
    }

    const request = createRequestObject({
      url,
      method,
      headers
    })

    const response = await this.requestManager.schedule(request, 1)
    this.CloudFlareError(response.status)
    const $ = this.cheerio.load(response.data)

    manga = parseSearch($)
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
    const section1 = createHomeSection({ id: 'hot_manga', title: 'À la une', type: HomeSectionType.featured })
    const section2 = createHomeSection({ id: 'latest_updated_webtoons', title: 'Dernières Sorties Webtoons', view_more: true })
    const section3 = createHomeSection({ id: 'latest_updated_novels', title: 'Dernières Sorties Novels', view_more: true })
    const section4 = createHomeSection({ id: 'popular_today', title: 'Tendances : Journalières' })
    const section5 = createHomeSection({ id: 'popular_week', title: 'Tendances : Hebdomadaires' })
    const section6 = createHomeSection({ id: 'popular_all_times', title: 'Tendances : Globales' })

    const request = createRequestObject({
      url: `${REAPERSCANS_DOMAIN}`,
      method,
      headers
    })

    const response = await this.requestManager.schedule(request, 1)
    this.CloudFlareError(response.status)
    const $1 = this.cheerio.load(response.data)

    parseHomeSections($1, [section1, section2, section3, section4, section5, section6], sectionCallback)
  }


  /////////////////////////////////
  /////    VIEW MORE ITEMS    /////
  /////////////////////////////////

  async getViewMoreItems(homepageSectionId: string, metadata: any): Promise<PagedResults> {
    let page: number = metadata?.page ?? 1
    let param = ''

    switch (homepageSectionId) {
      case 'latest_updated_webtoons':
        param = `webtoon/page/${page}/?m_orderby=latest`
        break;
      case 'latest_updated_novels':
        param = `webnovel/page/${page}/?m_orderby=latest`
        break;
    }

    const request = createRequestObject({
      url: `${REAPERSCANS_DOMAIN}/${param}`,
      method,
      headers
    })

    const response = await this.requestManager.schedule(request, 1)
    this.CloudFlareError(response.status)
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
        url: `${REAPERSCANS_DOMAIN}/serie/?m_orderby=latest&page=${page++}`,
        method,
        headers
      })

      const response = await this.requestManager.schedule(request, 1)
      this.CloudFlareError(response.status)
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
      url: `${REAPERSCANS_DOMAIN}/serie`,
      method,
      headers
    })

    const response = await this.requestManager.schedule(request, 1)
    this.CloudFlareError(response.status)
    const $ = this.cheerio.load(response.data)

    return parseTags($)
  }

  ///////////////////////////////////
  /////    CLOUDFLARE BYPASS    /////
  ///////////////////////////////////

  CloudFlareError(status: any) {
    if (status == 503) {
      throw new Error('CLOUDFLARE BYPASS ERROR:\nVeuillez aller dans les Paramètres > Sources > ReaperScansFR et appuyez sur Cloudflare Bypass')
    }
  }

  getCloudflareBypassRequest() {
    return createRequestObject({
      url: `${REAPERSCANS_DOMAIN}`,
      method,
      headers
    })
  }
}