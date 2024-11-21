import { create } from 'zustand'
import { combine } from 'zustand/middleware'

import toast from 'react-hot-toast'
import Api from '@/api/Api'


export interface Competition {
    id: number
    name: string
    code: string
    format: string
    status: string
    season_id: number
    start_date: string
    end_date: string
    created_at: string
    updated_at: string
    season: number
    image: any
    type: string
    sequence: number
    featured: Boolean

}

let timeOut: any
const path = '/matches/series-api'

const useSeriesStore = create(
    combine(
        {
            competition: {
                id: null as any,
                list: [] as Competition[],
                total: 0,
                page: 1,
                size: 10,
                search: null as string | null,
                paginate: true as boolean

                // timeOut: null as any
            }
        },
        (set, get) => ({
            get: {
                list: async () => {
                    const {
                        competition: { size, search, paginate }
                    } = get()
                    set(prev => ({
                        competition: {
                            ...prev.competition,
                            list: []
                        }
                    }))
                    toast.promise(Api.get(path, { query: { per_page: size, } }), {
                        loading: 'fetching...',
                        success: res => {
                            set(prev => ({
                                competition: {
                                    ...prev.competition,
                                    list: res?.data?.items,
                                    total: res?.meta?.total
                                }
                            }))
                            return res?.message || 'fetched'
                        },
                        error: err => {
                            return err
                        }
                    })
                },
                paginate: ({
                    page,
                    size,
                    search,
                    paginate
                }: {
                    page?: number
                    size?: number
                    search?: string
                    paginate?: boolean
                }) => {
                    set(prev => ({ competition: { ...prev.competition, search: search || '' } }))

                    clearTimeout(timeOut)

                    const init = () => {
                        set(prev => ({
                            competition: {
                                ...prev.competition,
                                page: page || prev.competition.page,
                                size: size || prev.competition.size,
                                search: search || prev.competition.search,
                                paginate: paginate ?? true
                            }
                        }))
                        useSeriesStore.getState().get.list()
                    }

                    if (search) {
                        timeOut = setTimeout(() => {
                            init()
                        }, 1000)
                        set(prev => ({ competition: { ...prev.competition, search: search } }))
                        return
                    }
                    init()
                }
            },
            select: (id: any) => set(prev => ({ competition: { ...prev.competition, id: id } })),


            get_team_list: async () => {
                let id = get().competition.id

                if (!id) return

                return await toast.promise(Api.get(`${path}/teams/${id}`), {
                    loading: '',
                    success: res => {
                        console.log('res: ', res)
                        return res?.message
                    },
                    error: err => {
                        return err
                    }
                })
            },
            setFeature: async (compId?: number, feature?: Boolean) => {
                if (!compId) return

                return await toast.promise(Api.put(`${path}/${compId}`, { feature: feature }), {
                    loading: '',
                    success: res => {
                        console.log('res: ', res)
                        return res?.message
                    },
                    error: err => {
                        return err
                    }
                })
            },
            // get_all_comp: async () => {
            //   return await toast.promise(Api.get(`${path}/teams/${id}`), {
            //     loading: '',
            //     success: res => {
            //       console.log('res: ', res)
            //       return res?.message
            //     },
            //     error: err => {
            //       return err
            //     }
            //   })
            // }
        })
    )
)

export default useSeriesStore
