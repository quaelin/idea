import { includes, isEqual, keys } from 'lodash';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import { IdeaWebRequest } from '../../types';
import { wrapErrors } from '../../requestHelpers';
import { BadInputs } from '../../httpErrors';

const relationArity = {
  Analogy: 4,
  And: 2,
  Identity: 2,
  Implies: 2,
  Improves: 2,
  IsA: 2,
  Negation: 1,
  Or: 2,
  XOr: 2,
};
const types = keys(relationArity);

function getExpectedKeys(type) {
  switch (relationArity[type]) {
    case 1: return ['A', 'Relation'];
    case 2: return ['A', 'B', 'Relation'];
    default: return ['A', 'B', 'C', 'D', 'Relation'];
  }
}

export function routeRelationPost(app: Application) {
  app.post('/api/relation', bodyParser.json(), wrapErrors(async (req: IdeaWebRequest, res) => {
    const { idea, body } = req;
    const { Relation: type } = body;
    if (!type || !includes(types, type)) {
      throw new BadInputs(`Expected "Relation:<type>" where type in ${types}. Got ${type}`);
    }
    const bodyKeys = keys(body).sort();
    const expectedKeys = getExpectedKeys(type);
    // const extraKeys = difference(bodyKeys, expectedKeys);
    if (!isEqual(bodyKeys, expectedKeys)) {
      throw new BadInputs(`Did not get the expected operands for Relation:${type}: ${expectedKeys}`);
    }
    const rCid = await idea.relation[type.toLowerCase()](body.A, body.B, body.C, body.D);
    res.status(201)
      .set('content-type', 'text/plain')
      .send(rCid);
  }));
}
