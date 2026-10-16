// Common Form & Payload Validators

export function validateLoginCredentials(username?: string, password?: string): { valid: boolean; error?: string } {
  if (!username || !username.trim()) {
    return { valid: false, error: 'Username is required.' }
  }
  if (!password || !password.trim()) {
    return { valid: false, error: 'Password is required.' }
  }
  if (username.trim().length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters.' }
  }
  return { valid: true }
}

export function validateArticlePayload(title?: string, content?: string): { valid: boolean; error?: string } {
  if (!title || !title.trim()) {
    return { valid: false, error: 'Article title is required.' }
  }
  if (!content || !content.trim()) {
    return { valid: false, error: 'Article content cannot be empty.' }
  }
  return { valid: true }
}

