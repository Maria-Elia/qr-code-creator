function escapeSpecial(value) {
  return String(value).replace(/([\\;,:"])/g, '\\$1');
}

export function buildUrlTextPayload(value) {
  return String(value ?? '').trim();
}

export function buildWifiPayload({ ssid, password, encryption }) {
  const type = encryption === 'nopass' ? 'nopass' : encryption;
  const passSegment = type === 'nopass' ? '' : `P:${escapeSpecial(password)};`;
  return `WIFI:T:${type};S:${escapeSpecial(ssid)};${passSegment};`;
}

export function buildVCardPayload({ name, phone, email, org }) {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0', `FN:${name}`];
  if (phone) lines.push(`TEL:${phone}`);
  if (email) lines.push(`EMAIL:${email}`);
  if (org) lines.push(`ORG:${org}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

export function buildEmailPayload({ address, subject, body }) {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${address}${query ? `?${query}` : ''}`;
}
