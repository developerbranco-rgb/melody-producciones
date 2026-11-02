// Pruebas unitarias de los enlaces de contacto (Node.js test runner, sin dependencias).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizePhone,
  defaultArtistMessage,
  buildWhatsappUrl,
  buildMailto,
} from '../../src/utils/whatsapp.ts';

test('normaliza el número oficial al formato internacional', () => {
  assert.equal(normalizePhone('+54 341 619-2627'), '543416192627');
});

test('el mensaje menciona al artista y no promete precio ni disponibilidad', () => {
  const msg = defaultArtistMessage('Los Antuña Dúo');
  assert.equal(
    msg,
    'Hola, Melody Producciones. Quisiera consultar por la contratación de Los Antuña Dúo. ¿Me podrían brindar más información?'
  );
  assert.doesNotMatch(msg, /precio|disponible|garantiz/i);
});

test('el enlace de WhatsApp usa wa.me, el número normalizado y texto codificado', () => {
  const url = buildWhatsappUrl('+54 341 619-2627', defaultArtistMessage('Branco.sax'));
  assert.ok(url.startsWith('https://wa.me/543416192627?text='));
  assert.doesNotMatch(url, /\s/);
  const parsed = new URL(url);
  assert.equal(parsed.searchParams.get('text'), defaultArtistMessage('Branco.sax'));
});

test('mailto apunta al correo oficial con asunto codificado', () => {
  assert.equal(buildMailto('info.melodyproducciones@gmail.com'), 'mailto:info.melodyproducciones@gmail.com');
  assert.equal(
    buildMailto('info.melodyproducciones@gmail.com', 'Consulta web'),
    'mailto:info.melodyproducciones@gmail.com?subject=Consulta%20web'
  );
});
