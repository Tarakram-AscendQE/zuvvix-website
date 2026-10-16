import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useModal } from '@/context/ModalContext'
import { Link } from 'react-router-dom'

interface FormData {
  email: string
}

export function FollowTheBuildModal() {
  const { isFollowOpen, closeFollow } = useModal()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate / netlify form POST
      await new Promise((resolve) => setTimeout(resolve, 400))
      setIsSubmitted(true)
      setSubmittedEmail(data.email)
      toast.success('Subscription saved!')
    } catch (error) {
      toast.error('Could not submit form. Please try again.')
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      closeFollow()
      setTimeout(() => {
        setIsSubmitted(false)
        reset()
      }, 300)
    }
  }

  return (
    <Dialog.Root open={isFollowOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#101828]/55 backdrop-blur-[1px]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[min(560px,calc(100vw-32px))] max-h-[calc(100dvh-48px)] rounded-[16px] bg-white text-[var(--slate)] shadow-[0_24px_64px_rgba(16,24,40,0.28)] overflow-y-auto focus:outline-none">
          <form onSubmit={handleSubmit(onSubmit)} className="dlg relative" noValidate>
            <Dialog.Close asChild>
              <button
                type="button"
                className="x"
                aria-label="Close"
              >
                ×
              </button>
            </Dialog.Close>

            <Dialog.Title className="text-[26px] font-semibold text-[var(--navy)] tracking-[-0.025em]">
              Follow the build
            </Dialog.Title>

            <Dialog.Description className="text-[15px] text-[var(--slate)] -mt-2">
              Essays, design decisions and evidence notes as capabilities move from designed to demonstrated. No sales sequence.
            </Dialog.Description>

            {isSubmitted ? (
              <div className="done-msg" role="status">
                Thank you. You will receive new essays, build notes and evidence notes at{' '}
                <strong>{submittedEmail}</strong>.
              </div>
            ) : (
              <>
                <div className="fld">
                  <label htmlFor="modal-fb-email">Work email</label>
                  <input
                    id="modal-fb-email"
                    type="email"
                    placeholder="name@company.com"
                    autoComplete="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="text-[13px] text-[#B42318]">{errors.email.message}</span>
                  )}
                </div>

                <div className="cta-row mt-1 flex gap-3">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Follow'}
                  </button>
                  <Dialog.Close asChild>
                    <button className="btn btn-quiet" type="button">
                      Cancel
                    </button>
                  </Dialog.Close>
                </div>
              </>
            )}

            <p className="pv-note">
              Used only to send Zuvvix Thinking updates.{' '}
              <Link to="/privacy/" onClick={closeFollow}>
                Privacy
              </Link>
            </p>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

