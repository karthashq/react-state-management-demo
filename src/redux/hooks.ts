import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// RTK 2.x idiom: pre-typed hooks so components never re-annotate the store type.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
