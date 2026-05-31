'use client'

import React from 'react'
import toast from 'react-hot-toast'

export function showSuccess(message) {
  toast.success(message)
}

export function showError(message) {
  toast.error(message || 'Something went wrong')
}

export function showInfo(message) {
  toast(message)
}

export function confirmAction(message) {
  return new Promise((resolve) => {
    const id = toast.custom((t) => (
      <div className="min-w-[260px] p-4 bg-white rounded shadow flex flex-col gap-3">
        <div className="text-sm text-gray-800">{message}</div>
        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(id)
              resolve(false)
            }}
            className="px-3 py-1 rounded bg-gray-100 text-sm"
          >
            বাতিল
          </button>
          <button
            onClick={() => {
              toast.dismiss(id)
              resolve(true)
            }}
            className="px-3 py-1 rounded bg-red-600 text-white text-sm"
          >
            নিশ্চিত
          </button>
        </div>
      </div>
    ))
  })
}

export default {
  showSuccess,
  showError,
  showInfo,
  confirmAction,
}
