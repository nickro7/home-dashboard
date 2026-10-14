/**
 * Optional read-only iCloud ICS bridge for Cloudflare Workers.
 *
 * Required Worker secrets (Settings > Variables and Secrets):
 *   ICLOUD_ICS_URL: iCloud public share link, webcal://... or https://...
 *   DASHBOARD_TOKEN: a long random secret of your choice (32+ characters)
 *
 * This bridge does NOT use or store your Apple ID password. Anyone who possesses
 * the public iCloud ICS URL can read your calendar, so choose a calendar you are
 * comfortable sharing via an unguessable link. You can turn off Public Calendar
 * at any time to revoke the ICS link.
 *
 * Worker requests require the X-Dashboard-Token header. Don't publish that
 * token in HTML or source control. Enter it only on your private dashboard device.
 */
export default {
  async fetch(request, env) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Dashboard-Token',
      'Cache-Control': 'no-store',
      'Vary': 'Origin',
      'X-Content-Type-Options': 'nosniff'
    };
    if (request.method === 'OPTIONS') return new Response(null, {status:204, headers});
    if (request.method !== 'GET') return new Response('Method not allowed', {status:405,headers});
    const supplied = request.headers.get('X-Dashboard-Token') || '';
    if (!env.DASHBOARD_TOKEN || supplied !== env.DASHBOARD_TOKEN) {
      return new Response('Unauthorized', {status:401,headers});
    }
    if (!env.ICLOUD_ICS_URL) return new Response('Missing ICLOUD_ICS_URL secret', {status:500,headers});
    let url = env.ICLOUD_ICS_URL.trim().replace(/^webcal:\/\//i,'https://');
    if (!/^https:\/\/[\w.-]+\//.test(url)) return new Response('Invalid calendar URL', {status:500,headers});
    try {
      const response = await fetch(url, {headers:{'Accept':'text/calendar,text/plain,*/*'},redirect:'follow'});
      if (!response.ok) return new Response('iCloud calendar fetch failed ('+response.status+')', {status:502,headers});
      const body=await response.text();
      if (!body.includes('BEGIN:VCALENDAR') || body.length > 1250000) {
        return new Response('Invalid or oversized ICS data', {status:502,headers});
      }
      return new Response(body, {status:200,headers:{...headers,'Content-Type':'text/calendar; charset=utf-8'}});
    } catch (e) {
      return new Response('Could not reach calendar service', {status:502,headers});
    }
  }
};
