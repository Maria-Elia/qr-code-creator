import { FONT_STACKS } from "./fontStacks.js";

function fontString(frame, size) {
  return `bold ${size}px ${FONT_STACKS[frame.font] || FONT_STACKS.Arial}`;
}

function roundedRectPath(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

const BORDER_WIDTH = 6;
const PADDING = 24;
const BAR_HEIGHT = 60;

function drawArcText(ctx, text, centerX, centerY, radius, font, color) {
  if (!text) return;
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const charAngles = [...text].map((ch) => ctx.measureText(ch).width / radius);
  const totalAngle = charAngles.reduce((sum, a) => sum + a, 0);
  let angle = -totalAngle / 2;

  for (let i = 0; i < text.length; i++) {
    const charAngle = charAngles[i];
    angle += charAngle / 2;
    const x = centerX + radius * Math.sin(angle);
    const y = centerY - radius * Math.cos(angle);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
    angle += charAngle / 2;
  }
  ctx.restore();
}

function buildBorder(qrCanvas, frame) {
  const size = qrCanvas.width + PADDING * 2;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  roundedRectPath(
    ctx,
    BORDER_WIDTH / 2,
    BORDER_WIDTH / 2,
    size - BORDER_WIDTH,
    size - BORDER_WIDTH,
    20,
  );
  ctx.strokeStyle = frame.borderColor;
  ctx.lineWidth = BORDER_WIDTH;
  ctx.stroke();
  ctx.drawImage(qrCanvas, PADDING, PADDING);
  return canvas;
}

function buildCornerMarks(qrCanvas, frame) {
  const size = qrCanvas.width + PADDING * 2;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size + (frame.text ? BAR_HEIGHT : 0);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(qrCanvas, PADDING, PADDING);

  const markLength = 32;
  ctx.strokeStyle = frame.borderColor;
  ctx.lineWidth = 5;
  ctx.lineCap = "square";
  ctx.beginPath();
  ctx.moveTo(2, markLength);
  ctx.lineTo(2, 2);
  ctx.lineTo(markLength, 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(size - markLength, 2);
  ctx.lineTo(size - 2, 2);
  ctx.lineTo(size - 2, markLength);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(2, size - markLength);
  ctx.lineTo(2, size - 2);
  ctx.lineTo(markLength, size - 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(size - markLength, size - 2);
  ctx.lineTo(size - 2, size - 2);
  ctx.lineTo(size - 2, size - markLength);
  ctx.stroke();

  if (frame.text) {
    ctx.fillStyle = frame.borderColor;
    ctx.font = fontString(frame, 34);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(frame.text, size / 2, size + BAR_HEIGHT / 2);
  }
  return canvas;
}

function buildBar(qrCanvas, frame) {
  const width = qrCanvas.width + PADDING * 2;
  const height = qrCanvas.height + PADDING * 2 + BAR_HEIGHT;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  roundedRectPath(
    ctx,
    BORDER_WIDTH / 2,
    BORDER_WIDTH / 2,
    width - BORDER_WIDTH,
    height - BORDER_WIDTH,
    20,
  );
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = frame.borderColor;
  ctx.lineWidth = BORDER_WIDTH;
  ctx.stroke();

  const barY = frame.style === "top-bar" ? 0 : height - BAR_HEIGHT;
  ctx.save();
  roundedRectPath(ctx, 0, 0, width, height, 20);
  ctx.clip();
  ctx.fillStyle = frame.fillColor;
  ctx.fillRect(0, barY, width, BAR_HEIGHT);
  ctx.restore();

  const qrY = frame.style === "top-bar" ? BAR_HEIGHT + PADDING : PADDING;
  ctx.drawImage(qrCanvas, PADDING, qrY);

  ctx.fillStyle = frame.textColor;
  ctx.font = fontString(frame, 36);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(frame.text, width / 2, barY + BAR_HEIGHT / 2);

  return canvas;
}

function buildRibbon(qrCanvas, frame) {
  const width = qrCanvas.width + PADDING * 2;
  const boxHeight = qrCanvas.height + PADDING * 2;
  const height = boxHeight + BAR_HEIGHT / 2;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  roundedRectPath(
    ctx,
    BORDER_WIDTH / 2,
    BORDER_WIDTH / 2,
    width - BORDER_WIDTH,
    boxHeight - BORDER_WIDTH,
    20,
  );
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = frame.borderColor;
  ctx.lineWidth = BORDER_WIDTH;
  ctx.stroke();
  ctx.drawImage(qrCanvas, PADDING, PADDING);

  const ribbonWidth = Math.min(width * 0.65, 260);
  const ribbonHeight = BAR_HEIGHT * 0.7;
  const ribbonX = (width - ribbonWidth) / 2;
  const ribbonY = boxHeight - ribbonHeight / 2;
  const notch = ribbonHeight * 0.35;

  ctx.beginPath();
  ctx.moveTo(ribbonX, ribbonY + ribbonHeight / 2);
  ctx.lineTo(ribbonX + notch, ribbonY);
  ctx.lineTo(ribbonX + ribbonWidth - notch, ribbonY);
  ctx.lineTo(ribbonX + ribbonWidth, ribbonY + ribbonHeight / 2);
  ctx.lineTo(ribbonX + ribbonWidth - notch, ribbonY + ribbonHeight);
  ctx.lineTo(ribbonX + notch, ribbonY + ribbonHeight);
  ctx.closePath();
  ctx.fillStyle = frame.fillColor;
  ctx.fill();

  ctx.fillStyle = frame.textColor;
  ctx.font = fontString(frame, 32);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(frame.text, ribbonX + ribbonWidth / 2, ribbonY + ribbonHeight / 2);

  return canvas;
}

const RING_WIDTH = 24;
const RING_INNER_GAP = 3;

function circleGeometry(qrCanvas) {
  const innerRadius = (qrCanvas.width * Math.SQRT2) / 2 + RING_INNER_GAP;
  const diameter = (innerRadius + RING_WIDTH) * 2;
  const qrOffset = (diameter - qrCanvas.width) / 2;
  return { diameter, innerRadius, qrOffset };
}

function buildCircleBadge(qrCanvas, frame) {
  const { diameter, innerRadius, qrOffset } = circleGeometry(qrCanvas);
  const canvas = document.createElement("canvas");
  canvas.width = diameter;
  canvas.height = diameter + BAR_HEIGHT;
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, Math.PI * 2);
  ctx.fillStyle = frame.fillColor;
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(diameter / 2, diameter / 2, innerRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.drawImage(qrCanvas, qrOffset, qrOffset);

  ctx.fillStyle = frame.fillColor;
  ctx.beginPath();
  ctx.roundRect(diameter / 2 - 90, diameter, 180, BAR_HEIGHT, 999);
  ctx.fill();

  ctx.fillStyle = frame.textColor;
  ctx.font = fontString(frame, 34);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(frame.text, diameter / 2, diameter + BAR_HEIGHT / 2);

  return canvas;
}

function buildCircleViewfinder(qrCanvas, frame) {
  const size = qrCanvas.width + PADDING * 2;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size + (frame.text ? BAR_HEIGHT : 0);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(qrCanvas, PADDING, PADDING);

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;
  const segment = (Math.PI * 2 * r) / 8;
  ctx.strokeStyle = frame.borderColor;
  ctx.lineWidth = 4;
  ctx.setLineDash([segment, segment]);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  if (frame.text) {
    ctx.fillStyle = frame.borderColor;
    ctx.font = fontString(frame, 34);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(frame.text, size / 2, size + BAR_HEIGHT / 2);
  }
  return canvas;
}

function buildTextOnly(qrCanvas, frame) {
  const canvas = document.createElement("canvas");
  canvas.width = qrCanvas.width;
  canvas.height = qrCanvas.height + (frame.text ? BAR_HEIGHT : 0);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(qrCanvas, 0, 0);
  if (frame.text) {
    ctx.fillStyle = frame.plainTextColor;
    ctx.font = fontString(frame, 36);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(frame.text, canvas.width / 2, qrCanvas.height + BAR_HEIGHT / 2);
  }
  return canvas;
}

function buildPill(qrCanvas, frame) {
  const width = qrCanvas.width + PADDING * 2;
  const boxHeight = qrCanvas.height + PADDING * 2;
  const height = boxHeight + BAR_HEIGHT / 2;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  roundedRectPath(
    ctx,
    BORDER_WIDTH / 2,
    BORDER_WIDTH / 2,
    width - BORDER_WIDTH,
    boxHeight - BORDER_WIDTH,
    20,
  );
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.strokeStyle = frame.borderColor;
  ctx.lineWidth = BORDER_WIDTH;
  ctx.stroke();
  ctx.drawImage(qrCanvas, PADDING, PADDING);

  const pillWidth = 180;
  const pillHeight = BAR_HEIGHT * 0.7;
  const pillX = (width - pillWidth) / 2;
  const pillY = boxHeight - pillHeight / 2;
  roundedRectPath(ctx, pillX, pillY, pillWidth, pillHeight, pillHeight / 2);
  ctx.fillStyle = frame.fillColor;
  ctx.fill();

  ctx.fillStyle = frame.textColor;
  ctx.font = fontString(frame, 32);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(frame.text, pillX + pillWidth / 2, pillY + pillHeight / 2);

  return canvas;
}

function buildCircleBand(qrCanvas, frame) {
  const { diameter, innerRadius, qrOffset } = circleGeometry(qrCanvas);
  const canvas = document.createElement("canvas");
  canvas.width = diameter;
  canvas.height = diameter;
  const ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.arc(diameter / 2, diameter / 2, diameter / 2, 0, Math.PI * 2);
  ctx.fillStyle = frame.fillColor;
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(diameter / 2, diameter / 2, innerRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.drawImage(qrCanvas, qrOffset, qrOffset);

  const textRadius = diameter / 2 - RING_WIDTH / 2;
  drawArcText(
    ctx,
    frame.text,
    diameter / 2,
    diameter / 2,
    textRadius,
    fontString(frame, 20),
    frame.bandTextColor,
  );

  return canvas;
}

export function buildFramedCanvas(qrCanvas, frame) {
  switch (frame.style) {
    case "border":
      return buildBorder(qrCanvas, frame);
    case "corner-marks":
      return buildCornerMarks(qrCanvas, frame);
    case "circle-viewfinder":
      return buildCircleViewfinder(qrCanvas, frame);
    case "text-only":
      return buildTextOnly(qrCanvas, frame);
    case "bottom-bar":
    case "top-bar":
      return buildBar(qrCanvas, frame);
    case "pill":
      return buildPill(qrCanvas, frame);
    case "ribbon-bottom":
      return buildRibbon(qrCanvas, frame);
    case "circle-badge":
      return buildCircleBadge(qrCanvas, frame);
    case "circle-band":
      return buildCircleBand(qrCanvas, frame);
    default:
      return qrCanvas;
  }
}
