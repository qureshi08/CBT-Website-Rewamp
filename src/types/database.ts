export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            case_studies: {
                Row: {
                    client_id: string
                    content: string | null
                    created_at: string
                    id: string
                    published: boolean
                    service_area: string | null
                    slug: string
                    summary: string | null
                    tags: string[]
                    title: string
                }
                Insert: {
                    client_id: string
                    content?: string | null
                    created_at?: string
                    id?: string
                    published?: boolean
                    service_area?: string | null
                    slug: string
                    summary?: string | null
                    tags?: string[]
                    title: string
                }
                Update: {
                    client_id?: string
                    content?: string | null
                    created_at?: string
                    id?: string
                    published?: boolean
                    service_area?: string | null
                    slug?: string
                    summary?: string | null
                    tags?: string[]
                    title?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "case_studies_client_id_fkey"
                        columns: ["client_id"]
                        isOneToOne: false
                        referencedRelation: "clients"
                        referencedColumns: ["id"]
                    }
                ]
            }
            clients: {
                Row: {
                    created_at: string
                    description: string | null
                    display_order: number
                    id: string
                    industry: string | null
                    is_featured: boolean
                    logo_url: string | null
                    name: string
                }
                Insert: {
                    created_at?: string
                    description?: string | null
                    display_order?: number
                    id?: string
                    industry?: string | null
                    is_featured?: boolean
                    logo_url?: string | null
                    name: string
                }
                Update: {
                    created_at?: string
                    description?: string | null
                    display_order?: number
                    id?: string
                    industry?: string | null
                    is_featured?: boolean
                    logo_url?: string | null
                    name?: string
                }
                Relationships: []
            }
            contact_submissions: {
                Row: {
                    company: string | null
                    created_at: string
                    email: string
                    id: string
                    message: string | null
                    name: string
                    status: string
                    subject: string | null
                }
                Insert: {
                    company?: string | null
                    created_at?: string
                    email: string
                    id?: string
                    message?: string | null
                    name: string
                    status?: string
                    subject?: string | null
                }
                Update: {
                    company?: string | null
                    created_at?: string
                    email?: string
                    id?: string
                    message?: string | null
                    name?: string
                    status?: string
                    subject?: string | null
                }
                Relationships: []
            }
            partner_enquiries: {
                Row: {
                    company: string
                    contact_name: string
                    created_at: string
                    email: string
                    id: string
                    message: string | null
                    partnership_type: string
                    status: string
                }
                Insert: {
                    company: string
                    contact_name: string
                    created_at?: string
                    email: string
                    id?: string
                    message?: string | null
                    partnership_type: string
                    status?: string
                }
                Update: {
                    company?: string
                    contact_name?: string
                    created_at?: string
                    email?: string
                    id?: string
                    message?: string | null
                    partnership_type?: string
                    status?: string
                }
                Relationships: []
            }
            products: {
                Row: {
                    appsource_url: string | null
                    category: string
                    created_at: string
                    demo_url: string | null
                    display_order: number
                    docs_url: string | null
                    full_description: string | null
                    id: string
                    is_featured: boolean
                    name: string
                    screenshot_urls: string[]
                    short_description: string | null
                    slug: string
                }
                Insert: {
                    appsource_url?: string | null
                    category: string
                    created_at?: string
                    demo_url?: string | null
                    display_order?: number
                    docs_url?: string | null
                    full_description?: string | null
                    id?: string
                    is_featured?: boolean
                    name: string
                    screenshot_urls?: string[]
                    short_description?: string | null
                    slug: string
                }
                Update: {
                    appsource_url?: string | null
                    category?: string
                    created_at?: string
                    demo_url?: string | null
                    display_order?: number
                    docs_url?: string | null
                    full_description?: string | null
                    id?: string
                    is_featured?: boolean
                    name?: string
                    screenshot_urls?: string[]
                    short_description?: string | null
                    slug?: string
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
