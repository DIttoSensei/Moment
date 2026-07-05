export default async function handler(req, res) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (req.method === 'GET') {
    const response = await fetch(`${url}/get/votes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return res.status(200).json({ count: data.result ?? 30 });
  }

  if (req.method === 'POST') {
    const response = await fetch(`${url}/incr/votes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return res.status(200).json({ count: data.result });
  }

  res.status(405).end();
}