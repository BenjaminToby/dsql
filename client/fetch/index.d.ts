export = clientFetch;
declare function clientFetch(url: string, options?: import("../../package-shared/types").FetchApiOptions, csrf?: boolean): Promise<any>;
declare namespace clientFetch {
    export { clientFetch as fetchApi };
}
