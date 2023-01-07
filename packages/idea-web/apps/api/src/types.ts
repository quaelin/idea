import { Request, Response } from 'express';

export type HandlerFunction = (req: Request, res: Response) => void;

export type CID = string;
export type ICID = CID;
export type PCID = CID;

export interface Relation {
  Relation: string;
  A: ICID;
  B?: ICID;
  C?: ICID;
  D?: ICID;
}

export type AbstractIdea = Relation | string;

export type Valuation = number;

export type Perspective = Record<ICID, Valuation>;

export interface PerspectiveApi {
  get: (pcid: PCID) => Perspective;
}

export interface RelationApi {
}

export interface IdeaApi {
  add: (content: string) => ICID;
  get: (icid: ICID) => AbstractIdea;
  relation: RelationApi;
  perspective: PerspectiveApi;
}

export interface IdeaWebRequest extends Request {
  idea?: IdeaApi;
}
