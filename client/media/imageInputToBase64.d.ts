declare namespace _exports {
    export { FunctionReturn };
}
declare function _exports({ imageInput, maxWidth, mimeType, }: {
    imageInput: HTMLInputElement;
    maxWidth?: number;
    mimeType?: [string];
}): Promise<FunctionReturn>;
export = _exports;
type FunctionReturn = {
    imageBase64: string;
    imageBase64Full: string;
    imageName: string;
};
