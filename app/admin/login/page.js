'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    if (username === 'admin' && password === 'admin@gmail.com') {
      localStorage.setItem('adminToken', 'authenticated')

      router.push('/admin/dashboard')
    } else {
      alert('Invalid credentials')
    }

    setLoading(false)
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.title}>Admin Login</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label>Username</label>
          <input
            style={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Password</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={styles.demo}>
          <p>Demo: admin</p>
          <p>Pass: admin@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#0f172a',
  },

  card: {
    width: '320px',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    fontFamily: 'sans-serif',
  },

  title: {
    textAlign: 'center',
    marginBottom: '15px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    outline: 'none',
  },

  button: {
    marginTop: '10px',
    padding: '10px',
    background: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  demo: {
    marginTop: '12px',
    fontSize: '12px',
    textAlign: 'center',
    color: '#555',
  },
}