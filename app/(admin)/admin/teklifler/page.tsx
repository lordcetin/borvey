/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { auth } from '@/auth';
import { DataTableDemo } from '@/components/DataTable/DataTable';
import { DataTableOffer } from '@/components/DataTable/DataTableOffer';
import prismadb from '@/lib/prismadb'
import { isEmpty } from 'lodash';
import { redirect } from 'next/navigation';

type Props = {}

const Offers = async (props: Props) => {
  const session:any = await auth()
  const offer:any = await prismadb.offers.findMany({
    include:{
      gig:{
        include:{
          profiles:true
        }
      },
      profiles:true
    }
  })

  if(isEmpty(session) || session?.user?.adminStatus !== 'admin'){
    return redirect('/')
  }else{
  return (
    <div className='flex justify-center items-center w-full px-10 mt-5'>       
      <DataTableOffer data={offer}/>
    </div>
  )
}
}

export default Offers