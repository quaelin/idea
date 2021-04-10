import { Request, Response } from 'express';

export type HandlerFunction = (req: Request, res: Response) => void;

export interface PerspectiveApi {
}

export interface RelationApi {
}

export interface IdeaApi {
  add: function;
  get: function;
  relation: RelationApi;
  perspective: PerspectiveApi;
}

export interface IdeaWebRequest extends Request {
  idea?: IdeaApi;
}
