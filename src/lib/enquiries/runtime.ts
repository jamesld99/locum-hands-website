import { Pool } from "pg";
import { createEnquiryStore, type EnquiryStore } from "./store";
import { StorageUnavailableError } from "./types";

const globalStore = globalThis as {
  __locumEnquiryPool?: Pool;
  __locumEnquiryStore?: EnquiryStore;
};

export function assertPostgresUrl(url: string | undefined): string {
  if (!url || !/^postgres(ql)?:\/\//i.test(url)) {
    throw new StorageUnavailableError();
  }
  if (url.includes("/tmp/") || url.startsWith("file:")) {
    throw new StorageUnavailableError();
  }
  return url;
}

export function getEnquiryStore(): EnquiryStore {
  if (!globalStore.__locumEnquiryStore) {
    const pool = new Pool({
      connectionString: assertPostgresUrl(process.env.DATABASE_URL),
      max: 1,
      connectionTimeoutMillis: 5_000,
    });
    globalStore.__locumEnquiryPool = pool;
    globalStore.__locumEnquiryStore = createEnquiryStore({
      query: (text, params) => pool.query(text, params),
    });
  }
  return globalStore.__locumEnquiryStore;
}

export async function closeEnquiryStore(): Promise<void> {
  await globalStore.__locumEnquiryPool?.end();
  globalStore.__locumEnquiryPool = undefined;
  globalStore.__locumEnquiryStore = undefined;
}
