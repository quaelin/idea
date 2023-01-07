export type ApiOptions = {
    ipfsConfig: {
        http: string;
    };
};

export type CID = string;
export type ICID = CID; // Idea Content ID
export type PCID = CID; // Perspective Content ID

export type AbstractRelation = {
    Relation: string;
    A: ICID;
    B?: ICID;
    C?: ICID;
    D?: ICID;
}
export type AnalogyRelation = {
    Relation: 'Analogy';
    A: ICID;
    B: ICID;
    C: ICID;
    D: ICID;
}
export type NegationRelation = {
    Relation: 'Negation',
    A: ICID;
}
export type BinaryRelation = {
    Relation: string;
    A: ICID;
    B: ICID;
}
export type AndRelation = BinaryRelation & { Relation: 'And' };
export type IdentityRelation = BinaryRelation & { Relation: 'Identity' };
export type ImpliesRelation = BinaryRelation & { Relation: 'Implies' };
export type ImprovesRelation = BinaryRelation & { Relation: 'Improves' };
export type IsARelation = BinaryRelation & { Relation: 'IsA' };
export type OrRelation = BinaryRelation & { Relation: 'Or' };
export type XOrRelation = BinaryRelation & { Relation: 'XOr' };
export type Relation = AbstractRelation & (
    AnalogyRelation |
    AndRelation |
    IdentityRelation |
    ImpliesRelation |
    ImprovesRelation |
    IsARelation |
    NegationRelation |
    OrRelation |
    XOrRelation
);

export type AbstractIdea = string | Relation;

export type Valuation = number;

export type Perspective = Record<ICID, Valuation>;
export type PerspectiveExpression = PCID | Perspective;

type PerspectiveExpressionReducer = (...pexes: PerspectiveExpression[]) => PCID;

export type IdeaApi = {
    add: (content: string) => ICID;
    get: (iCid: ICID) => AbstractIdea;
    relation: {
        analogy: (A: CID, B: CID, C: CID, D: CID) => ICID;
        and: (A: CID, B: CID) => ICID;
        identity: (A: CID, B: CID) => ICID;
        implies: (A: CID, B: CID) => ICID;
        improves: (A: CID, B: CID) => ICID;
        isa: (A: CID, B: CID) => ICID;
        negation: (A: CID) => ICID;
        or: (A: CID, B: CID) => ICID;
        xor: (A: CID, B: CID) => ICID;
    };
    perspective: {
        average: PerspectiveExpressionReducer;
        get: (pCid: PCID) => Perspective;
        intersect: PerspectiveExpressionReducer;
        keys: (pCid: PCID) => ICID[];
        merge: PerspectiveExpressionReducer;
        neutralize: (pex: PerspectiveExpression) => PCID;
        polarize: (pex: PerspectiveExpression, factor: Valuation) => PCID;
        scope: (pexA: PerspectiveExpression, pexB: PerspectiveExpression) => PCID;
        skew: (pexA: PerspectiveExpression, pexB: PerspectiveExpression, weighting: Valuation) => PCID;
    };
};

export function initApi(options: ApiOptions): IdeaApi;
