import http from "node:http";
import https from "node:https";
import { URL } from "node:url";

export interface WechatHttpInit {
  method?: string;
  headers?: Record<string, string>;
  body?: string | Buffer;
  agent?: http.Agent | https.Agent | false;
}

export interface WechatHttpResponse {
  status: number;
  statusText: string;
  headers: Record<string, string | string[] | undefined>;
  buffer(): Promise<Buffer>;
  text(): Promise<string>;
  json<T = unknown>(): Promise<T>;
}

export interface MultipartFilePart {
  name: string;
  filename: string;
  contentType: string;
  data: Buffer;
}

export interface MultipartBody {
  contentType: string;
  body: Buffer;
}

export function buildMultipart(parts: MultipartFilePart[]): MultipartBody {
  const boundary = `----WebKitFormBoundary${Date.now().toString(16)}${Math.random().toString(16).slice(2, 10)}`;
  const chunks: Buffer[] = [];

  for (const part of parts) {
    const header =
      `--${boundary}\r\n` +
      `Content-Disposition: form-data; name="${part.name}"; filename="${part.filename}"\r\n` +
      `Content-Type: ${part.contentType}\r\n\r\n`;
    chunks.push(Buffer.from(header, "utf-8"));
    chunks.push(part.data);
    chunks.push(Buffer.from("\r\n", "utf-8"));
  }
  chunks.push(Buffer.from(`--${boundary}--\r\n`, "utf-8"));

  return {
    contentType: `multipart/form-data; boundary=${boundary}`,
    body: Buffer.concat(chunks),
  };
}

export async function wechatHttp(url: string, init: WechatHttpInit = {}): Promise<WechatHttpResponse> {
  const parsed = new URL(url);
  const isHttps = parsed.protocol === "https:";
  const transport = isHttps ? https : http;

  const body = init.body == null
    ? undefined
    : Buffer.isBuffer(init.body) ? init.body : Buffer.from(init.body, "utf-8");

  const headers: Record<string, string> = { ...(init.headers ?? {}) };
  if (body && headers["Content-Length"] === undefined && headers["content-length"] === undefined) {
    headers["Content-Length"] = String(body.length);
  }

  const requestOptions: https.RequestOptions = {
    method: init.method ?? (body ? "POST" : "GET"),
    hostname: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : undefined,
    path: `${parsed.pathname}${parsed.search}`,
    headers,
  };
  if (init.agent !== undefined) {
    requestOptions.agent = init.agent;
  }

  return new Promise((resolve, reject) => {
    const req = transport.request(requestOptions, (res) => {
      const chunks: Buffer[] = [];
      res.on("data", (chunk: Buffer) => chunks.push(chunk));
      res.on("end", () => {
        const bodyBuffer = Buffer.concat(chunks);
        resolve({
          status: res.statusCode ?? 0,
          statusText: res.statusMessage ?? "",
          headers: res.headers as Record<string, string | string[] | undefined>,
          async buffer() {
            return bodyBuffer;
          },
          async text() {
            return bodyBuffer.toString("utf-8");
          },
          async json<T = unknown>() {
            return JSON.parse(bodyBuffer.toString("utf-8")) as T;
          },
        });
      });
      res.on("error", reject);
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}
