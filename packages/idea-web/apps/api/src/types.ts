import { Request, Response } from 'express';

export type HandlerFunction = (req: Request, res: Response) => void;

export type CID = string;

export type ICID = CID;

export interface Relation {
  Relation: string;
  A: ICID;
  B?: ICID;
  C?: ICID;
  D?: ICID;
}

export type AbstractIdea = string | Relation;

export interface PerspectiveApi {
}

export interface RelationApi {
}

export interface IdeaApi {
  add: (content: string) => CID;
  get: (icid: CID) => AbstractIdea;
  relation: RelationApi;
  perspective: PerspectiveApi;
}

export interface IdeaWebRequest extends Request {
  idea?: IdeaApi;
}
