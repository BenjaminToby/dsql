// @ts-check

/**
 * # SQL Query Generator
 * @description Generates an SQL Query for node module `mysql` or `serverless-mysql`
 * @type {import("../../package-shared/types").SqlGeneratorFn}
 */
function sqlGenerator({ tableName, genObject }) {
    if (!genObject) return undefined;

    const finalQuery = genObject.query ? genObject.query : undefined;

    const queryKeys = finalQuery ? Object.keys(finalQuery) : undefined;

    /** @type {string[]} */
    const sqlSearhValues = [];
    const sqlSearhString = queryKeys?.map((field) => {
        const queryObj = finalQuery?.[field];
        if (!queryObj) return;

        const finalFieldName = (() => {
            if (queryObj?.tableName) {
                return `${queryObj.tableName}.${field}`;
            }
            if (genObject.join) {
                return `${tableName}.${field}`;
            }
            return field;
        })();

        let str = `${finalFieldName}=?`;

        if (
            typeof queryObj.value == "string" ||
            typeof queryObj.value == "number"
        ) {
            const valueParsed = String(queryObj.value);
            if (queryObj.equality == "LIKE") {
                str = `LOWER(${finalFieldName}) LIKE LOWER('%${valueParsed}%')`;
            } else {
                sqlSearhValues.push(valueParsed);
            }
        } else if (Array.isArray(queryObj.value)) {
            /** @type {string[]} */
            const strArray = [];
            queryObj.value.forEach((val) => {
                const valueParsed = val;
                if (queryObj.equality == "LIKE") {
                    strArray.push(
                        `LOWER(${finalFieldName}) LIKE LOWER('%${valueParsed}%')`
                    );
                } else {
                    strArray.push(`${finalFieldName} = ?`);
                    sqlSearhValues.push(valueParsed);
                }
            });

            str = "(" + strArray.join(` ${queryObj.operator || "AND"} `) + ")";
        }

        return str;
    });

    function generateJoinStr(
        /** @type {import("../../package-shared/types").ServerQueryParamsJoinMatchObject} */ mtch,
        /** @type {import("../../package-shared/types").ServerQueryParamsJoin} */ join
    ) {
        return `${
            typeof mtch.source == "object" ? mtch.source.tableName : tableName
        }.${
            typeof mtch.source == "object" ? mtch.source.fieldName : mtch.source
        }=${(() => {
            if (mtch.targetLiteral) {
                return `'${mtch.targetLiteral}'`;
            }

            return `${
                typeof mtch.target == "object"
                    ? mtch.target.tableName
                    : join.tableName
            }.${
                typeof mtch.target == "object"
                    ? mtch.target.fieldName
                    : mtch.target
            }`;
        })()}`;
    }

    let queryString = (() => {
        let str = "SELECT";
        if (genObject.selectFields?.[0]) {
            if (genObject.join) {
                str += ` ${genObject.selectFields
                    ?.map((fld) => `${tableName}.${fld}`)
                    .join(",")}`;
            } else {
                str += ` ${genObject.selectFields?.join(",")}`;
            }
        } else {
            if (genObject.join) {
                str += ` ${tableName}.*`;
            } else {
                str += " *";
            }
        }

        if (genObject.join) {
            /** @type {string[]} */
            const existingJoinTableNames = [tableName];

            str +=
                "," +
                genObject.join
                    .map((joinObj) => {
                        if (existingJoinTableNames.includes(joinObj.tableName))
                            return null;
                        existingJoinTableNames.push(joinObj.tableName);

                        if (joinObj.selectFields) {
                            return joinObj.selectFields
                                .map((slFld) => {
                                    if (typeof slFld == "string") {
                                        return `${joinObj.tableName}.${slFld}`;
                                    } else if (typeof slFld == "object") {
                                        let aliasSlctFld = `${joinObj.tableName}.${slFld.field}`;
                                        if (slFld.alias)
                                            aliasSlctFld += ` as ${slFld.alias}`;
                                        return aliasSlctFld;
                                    }
                                })
                                .join(",");
                        } else {
                            return `${joinObj.tableName}.*`;
                        }
                    })
                    .filter((_) => Boolean(_))
                    .join(",");
        }

        str += ` FROM ${tableName}`;

        if (genObject.join) {
            str +=
                " " +
                genObject.join
                    .map((join) => {
                        return (
                            join.joinType +
                            " " +
                            join.tableName +
                            " ON " +
                            (() => {
                                if (Array.isArray(join.match)) {
                                    return (
                                        "(" +
                                        join.match
                                            .map((mtch) =>
                                                generateJoinStr(mtch, join)
                                            )
                                            .join(" AND ") +
                                        ")"
                                    );
                                } else if (typeof join.match == "object") {
                                    return generateJoinStr(join.match, join);
                                }
                            })()
                        );
                    })
                    .join(" ");
        }

        return str;
    })();

    if (sqlSearhString) {
        const stringOperator = genObject?.searchOperator || "AND";
        queryString += ` WHERE ${sqlSearhString.join(` ${stringOperator} `)} `;
    }

    if (genObject.order)
        queryString += ` ORDER BY ${genObject.order.field} ${genObject.order.strategy}`;
    if (genObject.limit) queryString += ` LIMIT ${genObject.limit}`;

    return {
        string: queryString,
        values: sqlSearhValues,
    };
}

module.exports = sqlGenerator;
