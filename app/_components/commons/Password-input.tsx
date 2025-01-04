'use client'

import { useState } from 'react'
import { Input } from '@headlessui/react';
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from 'lucide-react'

interface PasswordInputProps {
  id: string;
  placeholder?: string;
  className?: string;
  register?: any;
}

export function PasswordInput({ id, placeholder = "Enter password", className, register }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        className={className}
        {...register}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  )
}

