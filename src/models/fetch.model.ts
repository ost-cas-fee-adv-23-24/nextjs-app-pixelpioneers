export class ActionError extends Error {
    issues: Record<string, string>;

    constructor(issues: Record<string, string | string[]>) {
        // transform the string arrays (coming from zod) to single strings
        const issueStrings: Record<string, string> = Object.entries(issues)
            /*.filter((issue) => issue !== undefined) TODO: needed? */
            .reduce(
                (issue, [key, value]) => {
                    issue[key] = value.toString() || '';
                    return issue;
                },
                {} as Record<string, string>,
            );
        super(issueStrings[0]);
        this.issues = issueStrings;
    }
}
