import { getImage } from 'astro:assets';
import logo from '../assets/img/logo.png';
import { SITE } from '../data/content';

export async function GET() {
  const icons = await Promise.all([192, 512].map(async (s) => {
    const i = await getImage({ src: logo, width: s, height: s, format: 'png' });
    return { src: i.src, sizes: `${s}x${s}`, type: 'image/png' };
  }));
  return new Response(JSON.stringify({
    name: SITE.name, short_name: 'MM Therapie', lang: 'de-CH', start_url: '/', scope: '/',
    display: 'standalone', background_color: '#FBF7F3', theme_color: '#FBF7F3', icons,
  }), { headers: { 'Content-Type': 'application/manifest+json' } });
}
