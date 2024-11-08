declare namespace _exports {
    export { FunctionReturn };
}
declare function _exports({ inputFile, allowedRegex }: {
    inputFile: {
        name: string;
        size: number;
        type: string;
    };
    allowedRegex?: RegExp;
}): Promise<FunctionReturn>;
export = _exports;
type FunctionReturn = {
    fileBase64: string;
    fileBase64Full: string;
    fileName: string;
    fileSize: number;
    fileType: string;
};
