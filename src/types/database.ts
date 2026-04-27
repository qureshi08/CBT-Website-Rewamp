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
                    id: string
                    created_at: string
                    slug: string
                    title: string
                    published: boolean
                    display_order: number

                    client_id: string | null
                    client_descriptor: string | null
                    industry_slug: string | null
                    service_area: string | null
                    timeline: string | null

                    summary: string | null
                    content: string | null
                    challenge: string | null
                    approach: string | null
                    impact: string | null
                    deliverables: string[]

                    outcome_value: string | null
                    outcome_label: string | null
                    secondary_metrics: Array<{ value: string; label: string }>

                    stack: string[]
                    tags: string[]

                    featured_image_url: string | null
                    thumbnail_url: string | null
                    architecture_diagram_url: string | null
                    architecture_caption: string | null

                    quote_text: string | null
                    quote_author: string | null
                    quote_role: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    slug: string
                    title: string
                    published?: boolean
                    display_order?: number

                    client_id?: string | null
                    client_descriptor?: string | null
                    industry_slug?: string | null
                    service_area?: string | null
                    timeline?: string | null

                    summary?: string | null
                    content?: string | null
                    challenge?: string | null
                    approach?: string | null
                    impact?: string | null
                    deliverables?: string[]

                    outcome_value?: string | null
                    outcome_label?: string | null
                    secondary_metrics?: Array<{ value: string; label: string }>

                    stack?: string[]
                    tags?: string[]

                    featured_image_url?: string | null
                    thumbnail_url?: string | null
                    architecture_diagram_url?: string | null
                    architecture_caption?: string | null

                    quote_text?: string | null
                    quote_author?: string | null
                    quote_role?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    slug?: string
                    title?: string
                    published?: boolean
                    display_order?: number

                    client_id?: string | null
                    client_descriptor?: string | null
                    industry_slug?: string | null
                    service_area?: string | null
                    timeline?: string | null

                    summary?: string | null
                    content?: string | null
                    challenge?: string | null
                    approach?: string | null
                    impact?: string | null
                    deliverables?: string[]

                    outcome_value?: string | null
                    outcome_label?: string | null
                    secondary_metrics?: Array<{ value: string; label: string }>

                    stack?: string[]
                    tags?: string[]

                    featured_image_url?: string | null
                    thumbnail_url?: string | null
                    architecture_diagram_url?: string | null
                    architecture_caption?: string | null

                    quote_text?: string | null
                    quote_author?: string | null
                    quote_role?: string | null
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
                    logo_full_url: string | null
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
                    logo_full_url?: string | null
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
                    logo_full_url?: string | null
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
                    category: "Custom Visuals" | "ECL Calculator" | "Data Tool"
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
                    badge_text: string | null
                    detail_path: string | null
                    partner_note: string | null
                }
                Insert: {
                    appsource_url?: string | null
                    category: "Custom Visuals" | "ECL Calculator" | "Data Tool"
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
                    badge_text?: string | null
                    detail_path?: string | null
                    partner_note?: string | null
                }
                Update: {
                    appsource_url?: string | null
                    category?: "Custom Visuals" | "ECL Calculator" | "Data Tool"
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
                    badge_text?: string | null
                    detail_path?: string | null
                    partner_note?: string | null
                }
                Relationships: []
            }
            services: {
                Row: {
                    id: string
                    created_at: string
                    slug: string
                    name: string
                    section: "strategy" | "foundations" | "intelligence"
                    num: string
                    description: string | null
                    tools: string[]
                    icon: string | null
                    emerging: boolean
                    display_order: number
                    is_active: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    slug: string
                    name: string
                    section: "strategy" | "foundations" | "intelligence"
                    num: string
                    description?: string | null
                    tools?: string[]
                    icon?: string | null
                    emerging?: boolean
                    display_order?: number
                    is_active?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    slug?: string
                    name?: string
                    section?: "strategy" | "foundations" | "intelligence"
                    num?: string
                    description?: string | null
                    tools?: string[]
                    icon?: string | null
                    emerging?: boolean
                    display_order?: number
                    is_active?: boolean
                }
                Relationships: []
            }
            industries: {
                Row: {
                    id: string
                    created_at: string
                    slug: string
                    label: string
                    tagline: string | null
                    hero_headline: string
                    hero_italic: string | null
                    hero_sub: string | null
                    context_title: string | null
                    context_italic: string | null
                    context_body: string | null
                    where_we_help: Array<{ num: string; title: string; body: string }>
                    outcome_highlights: Array<{ number: string; label: string; note: string }>
                    display_order: number
                    is_active: boolean
                }
                Insert: {
                    id?: string
                    created_at?: string
                    slug: string
                    label: string
                    tagline?: string | null
                    hero_headline: string
                    hero_italic?: string | null
                    hero_sub?: string | null
                    context_title?: string | null
                    context_italic?: string | null
                    context_body?: string | null
                    where_we_help?: Array<{ num: string; title: string; body: string }>
                    outcome_highlights?: Array<{ number: string; label: string; note: string }>
                    display_order?: number
                    is_active?: boolean
                }
                Update: {
                    id?: string
                    created_at?: string
                    slug?: string
                    label?: string
                    tagline?: string | null
                    hero_headline?: string
                    hero_italic?: string | null
                    hero_sub?: string | null
                    context_title?: string | null
                    context_italic?: string | null
                    context_body?: string | null
                    where_we_help?: Array<{ num: string; title: string; body: string }>
                    outcome_highlights?: Array<{ number: string; label: string; note: string }>
                    display_order?: number
                    is_active?: boolean
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
            stats: {
                Row: {
                    id: string
                    created_at: string
                    label: string
                    value: number
                    suffix: string | null
                    display_order: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    label: string
                    value: number
                    suffix?: string | null
                    display_order?: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    label?: string
                    value?: number
                    suffix?: string | null
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
