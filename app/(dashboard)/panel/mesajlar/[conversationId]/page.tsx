/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { auth } from "@/auth"
import { isEmpty } from "lodash"
import { redirect } from "next/navigation"

type Props = {}

const Messages = async (props: Props) => {
  const session:any = await auth()

  if(isEmpty(session)){
    return redirect('/')
  }else{
  return (
    <></>
  )
}
}
export default Messages