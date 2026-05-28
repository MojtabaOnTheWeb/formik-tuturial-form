import { GravityStarsBackground } from "./components/animate-ui/components/backgrounds/gravity-stars"
import { SignupForm } from "./components/signup-form"

export function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-120">
        <SignupForm />
      </div>
      <div className="fixed top-0 left-0 -z-10 h-full w-full">
        <GravityStarsBackground />
      </div>
    </div>
  )
}

export default App
