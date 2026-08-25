/**
 * User Service
 *
 * Wraps all API calls related to the users resource.
 * Endpoint base comes from VITE_API_BASE_URL env var.
 *
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} password
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Fetch a user by email address.
 *
 * @param {string} email - The email to search for.
 * @returns {Promise<User|null>} The matched user, or null if not found.
 */
export async function fetchUserByEmail(email) {
  const response = await fetch(`${BASE_URL}/users?email=${encodeURIComponent(email)}`)

  if (!response.ok) {
    throw new Error('Failed to fetch user. Please try again.')
  }

  const users = await response.json()

  // MockAPI returns an array; take the first match or null
  return users.length > 0 ? users[0] : null
}

/**
 * Create a new user.
 *
 * @param {Object} userData
 * @param {string} userData.name
 * @param {string} userData.email
 * @param {string} userData.password
 * @returns {Promise<User>} The newly created user.
 */
export async function createUser({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    throw new Error('Failed to create account. Please try again.')
  }

  return response.json()
}
