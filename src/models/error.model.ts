export class ValidationError extends Error {
    issues: Record<string, string[]>;

    constructor(issues: Record<string, string[]>) {
        super(issues[0][0]);
        this.issues = issues;
    }
}
