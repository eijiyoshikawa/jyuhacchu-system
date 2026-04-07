import crypto from "crypto"

// Generate a SHA-256 hash of document content for tamper detection
export function generateDocumentHash(data: Record<string, unknown>): string {
  const content = JSON.stringify(data, Object.keys(data).sort())
  return crypto.createHash("sha256").update(content).digest("hex")
}

// Verify document integrity
export function verifyDocumentHash(data: Record<string, unknown>, expectedHash: string): boolean {
  const actualHash = generateDocumentHash(data)
  return actualHash === expectedHash
}
