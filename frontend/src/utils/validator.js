export const validateUrl = (url) => {
  if (!url || url.trim() === '') {
    return { valid: false, error: 'URL is required' };
  }

  try {
    const urlObj = new URL(url);
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return { valid: false, error: 'URL must start with http:// or https://' };
    }
    return { valid: true };
  } catch {
    return { valid: false, error: 'Please enter a valid URL' };
  }
};
