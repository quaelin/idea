import { startsWith } from 'lodash';

const cacheKey = cid => `idea-dag:${cid}`;
const isJson = ({ headers }) => startsWith(headers.get('Content-Type'), 'application/json');

export async function fetchIdea(icid) {
  const key = cacheKey(icid);
  const val = sessionStorage.getItem(key);
  if (val) return JSON.parse(val);

  const response = await fetch(`/api/idea/${icid}`);
  const content = isJson(response) ? await response.json() : await response.text();

  sessionStorage.setItem(key, JSON.stringify(content));
  return content;
};
