declare function _exports({ clientId, element, triggerPrompt, readyStateDispatch, }: {
    clientId: string;
    element: HTMLElement;
    triggerPrompt: boolean;
    readyStateDispatch?: () => void;
}): Promise<boolean>;
export = _exports;
