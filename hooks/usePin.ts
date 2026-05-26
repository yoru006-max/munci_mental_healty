'use client'

import { useState, useEffect } from 'react'
import {
  setPinCode,
  checkPin,
  removePinCode,
  isPinSet,
  isValidPin,
  getRemainingAttempts,
  isLocked,
  getRemainingLockoutTime,
} from '@/lib/security'

export const usePin = () => {
  const [pinSet, setPinSetState] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setPinSetState(isPinSet())
    setIsLoading(false)
  }, [])

  const setPin = (pin: string): boolean => {
    if (!isValidPin(pin)) return false
    const success = setPinCode(pin)
    if (success) {
      setPinSetState(true)
    }
    return success
  }

  const verifyPin = (pin: string): boolean => {
    return checkPin(pin)
  }

  const removePin = (): void => {
    removePinCode()
    setPinSetState(false)
  }

  const getRemainingAttemptCount = (): number => {
    return getRemainingAttempts()
  }

  const checkLocked = (): boolean => {
    return isLocked()
  }

  const getLockedTimeRemaining = (): number => {
    return getRemainingLockoutTime()
  }

  return {
    pinSet,
    isLoading,
    setPin,
    verifyPin,
    removePin,
    getRemainingAttemptCount,
    checkLocked,
    getLockedTimeRemaining,
  }
}
