import { Closing } from "./closing/closing"
import { Developers } from "./developers/developers"
import { Footer } from "./footer/footer"
import { OverscrollReveal } from "./footer/overscroll-reveal"
import { Hero } from "./hero/hero"
import { Posts } from "./posts/posts"
import { description } from "./site-copy"
import { StructuredData } from "./structured-data"

export default function HomePage() {
  return (
    <OverscrollReveal>
      <StructuredData description={description} />
      <main>
        <Hero />
        <Posts />
        <Developers />
        <Closing />
      </main>
      <Footer />
    </OverscrollReveal>
  )
}
