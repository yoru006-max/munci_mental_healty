'use client'

import SupportContacts from '@/components/support-contacts'
import { ProtectedContent } from '@/components/protected-content'

export default function Page() {
  return (
    <ProtectedContent title="Contactos de Emergencia">
      <div className="p-6">
        <SupportContacts />
      </div>
    </ProtectedContent>
  )
}
