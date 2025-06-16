/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { createContext, useContext, ReactNode, useState, useEffect} from 'react';

interface UserProfile{
  id:    string   
  userId: string   
  token: string
  name:  string
  image: string
  count: number
  history: any
}

type AppContextType = {
  // Burada state veya fonksiyonların tanımlarını ekleyin
  isMuted: boolean;
  setMute: React.Dispatch<React.SetStateAction<boolean>>;

  ilanId: string;
  setIlanId: string;

  conversationId: string;
  setConversationId: string;

  baseCoinId:string;
  setBaseCoinId:React.Dispatch<React.SetStateAction<string>>;

  isChart: string[] | any;
  setIsChart:React.Dispatch<React.SetStateAction<string[] | any>>;

  littleMovieDatas: UserProfile | string[] | any;
  setLittleMovieDatas:React.Dispatch<React.SetStateAction<UserProfile | string[] | any>>;
};

const AppContext = createContext<AppContextType | any | undefined>(undefined);

type AppContextProviderProps = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {

  const [isMuted, setMute] = useState(true);

  const [networkId, setNetworkId] = useState('');
  const [ilanId, setIlanId] = useState('');
  const [conversationId, setConversationId] = useState('');

  const [isChart, setIsChart] = useState<string[] | any>([]);

  const [littleMovieDatas, setLittleMovieDatas] = useState<UserProfile | string[] | any>([]);


  return (
    <AppContext.Provider
    value={{ 
      isMuted,
      networkId,
      setNetworkId,
      ilanId,
      setIlanId,
      conversationId,
      setConversationId,
      setMute,
      isChart,setIsChart,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
