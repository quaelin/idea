import { startsWith } from 'lodash';
import particl from 'particl';

const cacheKey = cid => `idea-dag:${cid}`;
const isJson = ({ headers }) => startsWith(headers.get('Content-Type'), 'application/json');
const { need, provide } = particl();

export async function fetchIdea(iCid) {
  provide(iCid, async () => {
    const key = cacheKey(iCid);

    const val = sessionStorage.getItem(key);
    if (val) return JSON.parse(val);

    const response = await fetch(`/api/idea/${iCid}`, { cache: 'force-cache' });
    const content = isJson(response) ? await response.json() : await response.text();

    sessionStorage.setItem(key, JSON.stringify(content));
    return content;
  });

  return need(iCid);
}

/*
export async function calculateDiscord(iCid, perspective) {
  if (!perspective[iCid]) return undefined;

  const content = await fetchIdea(iCid);
  // deep-fetch the whole perspective (result includes ideas not directly referenced)
  // things to look for:
  //  - V(A) not the inverse of V(!A)
  //  - A&B but not A or B
  //  - AvB and ~A and ~B
  //  - A>B and B>A
  //  - A and A->B but not B
}
*/
