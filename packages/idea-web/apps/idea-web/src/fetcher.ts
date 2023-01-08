import { startsWith } from 'lodash';
import particl from 'particl';

const cacheKey = cid => `idea-dag:${cid}`;
const isJson = ({ headers }) => startsWith(headers.get('Content-Type'), 'application/json');
const { need, provide } = particl();

export function fetchIdea(iCid) {
  provide(iCid, async () => {
    const key = cacheKey(iCid);

    const val = sessionStorage.getItem(key);
    if (val) return JSON.parse(val);

    const response = await fetch(`/api/idea/${iCid}`);
    const content = isJson(response) ? await response.json() : await response.text();

    sessionStorage.setItem(key, JSON.stringify(content));
    return content;
  });

  return need(iCid);
}
