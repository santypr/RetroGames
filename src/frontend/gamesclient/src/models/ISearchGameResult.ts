export interface ISearchGameResult {
    QueryContext: IQueryContext,
    WebPages: IWebPagesResult,
    Images: IImagesResult[],
}

interface IQueryContext {
    OriginalQuery: string,
    AlteredQuery: string,
    AlterationOverrideQuery: string,
    AdultIntent: string,
    AskUserForLocation: string,
    IsTransactional: string
}

interface IWebPagesResult {
    Value: IWebPage[]
}

interface IWebPage {
    DisplayUrl: string,
    Snippet: string, 
    DeepLinks: string,
    ThumbnailUrl: string, 
    Name: string
}

interface IImagesResult {
    Value: IImage[]
}

interface IImage {
    ThumbnailUrl: string
}