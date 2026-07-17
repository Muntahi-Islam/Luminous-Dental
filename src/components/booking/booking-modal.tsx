"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import BookingForm from "./booking-form"

interface BookingModalProps {
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function BookingModal({
  trigger,
  open: controlledOpen,
  onOpenChange,
}: BookingModalProps) {
  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = controlledOpen !== undefined
  const isOpen = isControlled ? controlledOpen : internalOpen
  const setIsOpen = isControlled ? onOpenChange! : setInternalOpen

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8"
            >
              <DialogHeader className="mb-8 text-left">
                <DialogTitle className="font-[family-name:var(--font-plus-jakarta)] text-2xl text-ink">
                  Book an appointment
                </DialogTitle>
                <DialogDescription className="text-sm text-ink-secondary font-[family-name:var(--font-dm-sans)] mt-1">
                  Fill out the form below and we&apos;ll confirm your appointment within 2 hours.
                </DialogDescription>
              </DialogHeader>

              <BookingForm />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

export default BookingModal
