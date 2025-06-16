/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import qs from 'query-string';
import { useInfiniteQuery } from '@tanstack/react-query';

import { useSocket } from '@/components/providers/socketProvider';
import { isEmpty } from 'lodash';

type Props = {
  queryKey: any;
  apiUrl: any;
  paramKey: any;
  paramValue: any;
}

export const useChatQuery = ({queryKey,apiUrl,paramKey = "",paramValue = ""}:Props) => {
  const { isConnected } = useSocket();

  const fetchMessages = async ({ pageParam = undefined}) => {

    const url = qs.stringifyUrl({
      url:apiUrl,
      query:{
        cursor: pageParam,
        [paramKey]: paramValue,
      }
    }, { skipNull:true })


    const res = await fetch(!isEmpty(paramKey) ? url : apiUrl,{cache:'no-store'});
    const data = await res.json() || { offers: [], nextCursor: null };

    return data
  }

  
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status
} = useInfiniteQuery({
  queryKey: [queryKey],
  queryFn: fetchMessages,
  getNextPageParam: (lastPage:any) => lastPage?.nextCursor,
  refetchInterval: isConnected ? false : 1000,
}as any);

return {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status
}

}