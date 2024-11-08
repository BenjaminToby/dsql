export = httpsRequest;
/**
 * Main Function
 * ==============================================================================
 * @param {{
 *  url?: string,
 *  method: string,
 *  hostname: string,
 *  path?: string,
 *  href?: string,
 *  headers?: object,
 *  body?: object,
 * }} params - params
 */
declare function httpsRequest({ url, method, hostname, path, href, headers, body }: {
    url?: string;
    method: string;
    hostname: string;
    path?: string;
    href?: string;
    headers?: object;
    body?: object;
}): Promise<any>;
