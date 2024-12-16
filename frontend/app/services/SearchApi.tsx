import SearchResultInterface from '../types/SearchResultInterface'
import { mockSearchResults } from '../utils/mockData';

export default function searchApi(serviceNo: string): SearchResultInterface[] {  
  return serviceNo == "88" ? mockSearchResults : [];
}
