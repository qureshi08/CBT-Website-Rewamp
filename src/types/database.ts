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
                    region: string | null
                    industry: string | null
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
                    region?: string | null
                    industry?: string | null
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
                    region?: string | null
                    industry?: string | null
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
                    region: string | null
                    industry: string | null
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
                    region?: string | null
                    industry?: string | null
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
                    region?: string | null
                    industry?: string | null
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
                    industry: string | null
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
                    industry?: string | null
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
                    industry?: string | null
                }
                Relationships: []
            }
            cgap_cohorts: {
                Row: {
                    id: string
                    created_at: string
                    cohort_number: number
                    start_date: string | null
                    status: "open" | "closed" | "in-progress"
                    application_url: string | null
                    is_featured: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    cohort_number: number
                    start_date?: string | null
                    status?: "open" | "closed" | "in-progress"
                    application_url?: string | null
                    is_featured?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    cohort_number?: number
                    start_date?: string | null
                    status?: "open" | "closed" | "in-progress"
                    application_url?: string | null
                    is_featured?: boolean
                }
                Relationships: []
            }
            cgap_alumni: {
                Row: {
                    id: string
                    created_at: string
                    name: string
                    role: string | null
                    company: string | null
                    cohort: string | null
                    quote: string | null
                    avatar_url: string | null
                    display_order: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    name: string
                    role?: string | null
                    company?: string | null
                    cohort?: string | null
                    quote?: string | null
                    avatar_url?: string | null
                    display_order?: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    role?: string | null
                    company?: string | null
                    cohort?: string | null
                    quote?: string | null
                    avatar_url?: string | null
                    display_order?: number
                }
                Relationships: []
            }
            partners: {
                Row: {
                    id: string
                    created_at: string
                    name: string
                    logo_url: string | null
                    website_url: string | null
                    partner_type: "Technology" | "Delivery" | "Referral"
                    display_order: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    name: string
                    logo_url?: string | null
                    website_url?: string | null
                    partner_type: "Technology" | "Delivery" | "Referral"
                    display_order?: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    name?: string
                    logo_url?: string | null
                    website_url?: string | null
                    partner_type?: "Technology" | "Delivery" | "Referral"
                    display_order?: number
                }
                Relationships: []
            }
            testimonials: {
                Row: {
                    id: string
                    created_at: string
                    quote: string
                    author: string
                    company: string
                    role: string | null
                    avatar_url: string | null
                    page: "Home" | "CGAP" | "Partners" | "Products" | "General"
                    display_order: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    quote: string
                    author: string
                    company: string
                    role?: string | null
                    avatar_url?: string | null
                    page?: "Home" | "CGAP" | "Partners" | "Products" | "General"
                    display_order?: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    quote?: string
                    author?: string
                    company?: string
                    role?: string | null
                    avatar_url?: string | null
                    page?: "Home" | "CGAP" | "Partners" | "Products" | "General"
                    display_order?: number
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
