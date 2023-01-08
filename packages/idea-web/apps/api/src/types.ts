import { Request, Response } from 'express';
import type { IdeaApi } from '@quaelin/idea-api';

export type { ApiOptions, IdeaApi, Perspective } from '@quaelin/idea-api';

export type HandlerFunction = (req: Request, res: Response) => void;

export interface IdeaWebRequest extends Request {
  idea: IdeaApi;
}
