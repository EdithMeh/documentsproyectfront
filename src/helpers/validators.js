/**
 *
 * @param {number} value max size file value in mb received from configurations;
 * @returns {number} max size file value in bytes
 */
export function toBytes(value) {
    return value * 1024 * 1024;
}
