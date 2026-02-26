'use client'

import type { JSX } from 'react'
import { LoadingButton } from '@repo/ui-web/loading-button'
import { Button } from '@repo/ui-web/primitives/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@repo/ui-web/primitives/sheet'
import { toast } from '@repo/ui-web/primitives/sonner'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import { FormProviderUserAdd, FormUserAdd } from '@/components/form-user-add'
import { actionAddUser } from './action-add'

export function ButtonUserAdd(): JSX.Element {
  const [open, setOpen] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: actionAddUser,
    onSuccess(output) {
      switch (output.type) {
        case 'ok': {
          toast.success('User added successfully.')
          router.refresh()
          setOpen(false)
          break
        }
        case 'bad': {
          toast.warning(output.message)
          break
        }
      }
    },
  })

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          Add user
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add user</SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <div className="px-4">
          <FormProviderUserAdd>
            <FormUserAdd formRef={formRef} onSubmit={mutate} />
          </FormProviderUserAdd>
        </div>
        <SheetFooter>
          <LoadingButton
            isLoading={isPending}
            className="w-full"
            onClick={() => {
              formRef.current?.requestSubmit()
            }}
          >
            Confirm
          </LoadingButton>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
