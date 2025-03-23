// src/utils/fileHash.js

/**
 * Computes the SHA-256 hash of a given File or Blob.
 * @param {File|Blob} file - The file to hash.
 * @returns {Promise<string>} The SHA-256 hash in hexadecimal format.
 */
export async function computeSHA256(file) {
    // Convert the file to an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    // Compute the digest
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    // Convert the hash to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  