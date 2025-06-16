/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse , NextRequest} from 'next/server';
import prismadb from '@/lib/prismadb';

export async function GET(req: NextRequest) {
  try {
    const searchParams: any = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = 10; // Her sayfada 10 öğe
    
    const user = await prismadb.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { id: 'asc' },
    });

    const totalCount = await prismadb.user.count();
    const hasNextPage = page * pageSize < totalCount;
    
    return NextResponse.json({
      data: user,
      nextPage: hasNextPage ? page + 1 : null,
    },{status:200});

  } catch (error) {
    console.log(error)
    return NextResponse.json(error,{status:400})
  }
}