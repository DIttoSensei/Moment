export default async function handler(req, res) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (req.method === 'GET') {
    const response = await fetch(`${url}/get/votes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await response.json();
    return res.status(200).json({ count: data.result ?? 0 });
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