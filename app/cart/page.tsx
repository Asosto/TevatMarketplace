import { Navigation } from "@/components/navigation"
import { CartView } from "@/components/cart-view"

export default function CartPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <CartView />
    </main>
  )
}
