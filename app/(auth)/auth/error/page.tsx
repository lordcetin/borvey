
import AuthErrorPage from "@/components/Error"
import PreLoading from "@/components/PreLoading/PreLoading"
import { Suspense } from "react"
 
export default function ErrorPage() {
 
  return (
    <Suspense fallback={<PreLoading/>}>
      <AuthErrorPage/>
    </Suspense>
  )
}