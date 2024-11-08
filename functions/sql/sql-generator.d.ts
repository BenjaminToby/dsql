export = sqlGenerator;
declare function sqlGenerator(Param0: {
    genObject?: import("../../package-shared/types").ServerQueryParam;
    tableName: string;
}): {
    string: string;
    values: string[];
} | undefined;
