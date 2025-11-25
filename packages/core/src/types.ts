export interface ValidatorResponse {
    isValid: boolean;
    errors?: string[];
}

export interface ClassifierResponse {
    route: string;
    type: "semantic" | "template" | "ignore";
}
