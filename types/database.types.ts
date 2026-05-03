export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ─── Row types ──────────────────────────────────────────────

export interface SiteSettingsRow {
  id: string
  tenant_id: string
  site_name: string | null
  tagline: string | null
  logo_url: string | null
  logo_dark_url: string | null
  favicon_url: string | null
  primary_color: string | null
  secondary_color: string | null
  font_family: string | null
  email: string | null
  phone: string | null
  address: string | null
  linkedin_url: string | null
  og_image_url: string | null
  updated_at: string
}

export interface SeoSettingsRow {
  id: string
  tenant_id: string
  meta_title: string | null
  meta_description: string | null
  keywords: string | null
  canonical_url: string | null
  og_title: string | null
  og_description: string | null
  google_analytics_id: string | null
  updated_at: string
}

export interface NavigationItemRow {
  id: string
  tenant_id: string
  label: string
  url: string
  type: 'internal' | 'external'
  location: 'header' | 'footer'
  order_index: number
  created_at: string
}

export interface ModuleRow {
  id: string
  tenant_id: string
  key: string
  enabled: boolean
  label: string | null
  updated_at: string
}

export interface FormFieldDef {
  id: string
  type: 'text' | 'email' | 'textarea' | 'phone' | 'select'
  label: string
  placeholder?: string
  required: boolean
  options?: string[]  // for select
}

export interface FormRow {
  id: string
  tenant_id: string
  name: string
  email_to: string | null
  fields: FormFieldDef[]
  created_at: string
  updated_at: string
}

// ─── Existing table types ────────────────────────────────────

export interface Database {
  public: {
    Tables: {
      publications: {
        Row: {
          id: string
          tenant_id: string | null
          title: string
          slug: string
          description: string | null
          excerpt: string | null
          label: string | null
          flip_url: string | null
          content: string | null
          image_url: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id?: string | null
          title: string
          slug: string
          description?: string | null
          excerpt?: string | null
          label?: string | null
          flip_url?: string | null
          content?: string | null
          image_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string | null
          title?: string
          slug?: string
          description?: string | null
          excerpt?: string | null
          label?: string | null
          flip_url?: string | null
          content?: string | null
          image_url?: string | null
          published?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          id: string
          tenant_id: string | null
          name: string
          role: string | null
          content: string
          rating: number
          avatar_url: string | null
          published: boolean
          project_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id?: string | null
          name: string
          role?: string | null
          content: string
          rating?: number
          avatar_url?: string | null
          published?: boolean
          project_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string | null
          name?: string
          role?: string | null
          content?: string
          rating?: number
          avatar_url?: string | null
          published?: boolean
          project_id?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          id: string
          tenant_id: string
          title: string
          slug: string
          category: string | null
          excerpt: string | null
          content: string | null
          image_url: string | null
          screenshot_url: string | null
          website_url: string | null
          highlights: string[]
          featured: boolean
          published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id?: string
          title: string
          slug: string
          category?: string | null
          excerpt?: string | null
          content?: string | null
          image_url?: string | null
          screenshot_url?: string | null
          website_url?: string | null
          highlights?: string[]
          featured?: boolean
          published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          title?: string
          slug?: string
          category?: string | null
          excerpt?: string | null
          content?: string | null
          image_url?: string | null
          screenshot_url?: string | null
          website_url?: string | null
          highlights?: string[]
          featured?: boolean
          published?: boolean
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      pages: {
        Row: {
          id: string
          tenant_id: string | null
          title: string
          slug: string
          content: string | null
          meta_description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id?: string | null
          title: string
          slug: string
          content?: string | null
          meta_description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string | null
          title?: string
          slug?: string
          content?: string | null
          meta_description?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          id: string
          key: string
          value: string | null
          label: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: string | null
          label?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: string | null
          label?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string; tenant_id: string; site_name: string | null; tagline: string | null
          logo_url: string | null; logo_dark_url: string | null; favicon_url: string | null
          primary_color: string | null; secondary_color: string | null; font_family: string | null
          email: string | null; phone: string | null; address: string | null
          linkedin_url: string | null; og_image_url: string | null; updated_at: string
        }
        Insert: {
          id?: string; tenant_id: string; site_name?: string | null; tagline?: string | null
          logo_url?: string | null; logo_dark_url?: string | null; favicon_url?: string | null
          primary_color?: string | null; secondary_color?: string | null; font_family?: string | null
          email?: string | null; phone?: string | null; address?: string | null
          linkedin_url?: string | null; og_image_url?: string | null; updated_at?: string
        }
        Update: {
          id?: string; tenant_id?: string; site_name?: string | null; tagline?: string | null
          logo_url?: string | null; logo_dark_url?: string | null; favicon_url?: string | null
          primary_color?: string | null; secondary_color?: string | null; font_family?: string | null
          email?: string | null; phone?: string | null; address?: string | null
          linkedin_url?: string | null; og_image_url?: string | null; updated_at?: string
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          id: string; tenant_id: string; meta_title: string | null; meta_description: string | null
          keywords: string | null; canonical_url: string | null; og_title: string | null
          og_description: string | null; google_analytics_id: string | null; updated_at: string
        }
        Insert: {
          id?: string; tenant_id: string; meta_title?: string | null; meta_description?: string | null
          keywords?: string | null; canonical_url?: string | null; og_title?: string | null
          og_description?: string | null; google_analytics_id?: string | null; updated_at?: string
        }
        Update: {
          id?: string; tenant_id?: string; meta_title?: string | null; meta_description?: string | null
          keywords?: string | null; canonical_url?: string | null; og_title?: string | null
          og_description?: string | null; google_analytics_id?: string | null; updated_at?: string
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          id: string; tenant_id: string; label: string; url: string
          type: 'internal' | 'external'; location: 'header' | 'footer'
          order_index: number; created_at: string
        }
        Insert: {
          id?: string; tenant_id: string; label: string; url: string
          type?: 'internal' | 'external'; location?: 'header' | 'footer'
          order_index?: number; created_at?: string
        }
        Update: {
          id?: string; tenant_id?: string; label?: string; url?: string
          type?: 'internal' | 'external'; location?: 'header' | 'footer'
          order_index?: number
        }
        Relationships: []
      }
      modules: {
        Row: {
          id: string; tenant_id: string; key: string
          enabled: boolean; label: string | null; updated_at: string
        }
        Insert: {
          id?: string; tenant_id: string; key: string
          enabled?: boolean; label?: string | null; updated_at?: string
        }
        Update: {
          id?: string; tenant_id?: string; key?: string
          enabled?: boolean; label?: string | null; updated_at?: string
        }
        Relationships: []
      }
      forms: {
        Row: {
          id: string; tenant_id: string; name: string
          email_to: string | null; fields: FormFieldDef[]
          created_at: string; updated_at: string
        }
        Insert: {
          id?: string; tenant_id: string; name: string
          email_to?: string | null; fields?: FormFieldDef[]
          created_at?: string; updated_at?: string
        }
        Update: {
          id?: string; tenant_id?: string; name?: string
          email_to?: string | null; fields?: FormFieldDef[]
          updated_at?: string
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          id: string
          tenant_id: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          image_url: string | null
          status: 'draft' | 'published'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tenant_id?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          image_url?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          image_url?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      publication_blocks: {
        Row: {
          id: string
          publication_id: string
          type: 'text' | 'features' | 'cta'
          title: string | null
          content: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          publication_id: string
          type?: 'text' | 'features' | 'cta'
          title?: string | null
          content?: string | null
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          publication_id?: string
          type?: 'text' | 'features' | 'cta'
          title?: string | null
          content?: string | null
          order_index?: number
        }
        Relationships: []
      }
      author_requests: {
        Row: {
          id: string
          tenant_id: string
          name: string
          company: string | null
          email: string
          subject: string | null
          message: string | null
          status: 'new' | 'contacted'
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id?: string
          name: string
          company?: string | null
          email: string
          subject?: string | null
          message?: string | null
          status?: 'new' | 'contacted'
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          company?: string | null
          email?: string
          subject?: string | null
          message?: string | null
          status?: 'new' | 'contacted'
        }
        Relationships: []
      }
      chat_conversations: {
        Row: {
          id: string
          status: 'open' | 'closed'
          created_at: string
        }
        Insert: {
          id?: string
          status?: 'open' | 'closed'
          created_at?: string
        }
        Update: {
          id?: string
          status?: 'open' | 'closed'
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          id: string
          conversation_id: string
          sender: 'user' | 'admin'
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender: 'user' | 'admin'
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender?: 'user' | 'admin'
          message?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

// ─── NewsArticle ─────────────────────────────────────────────

export interface NewsArticle {
  id: string
  tenant_id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  image_url: string | null
  status: 'draft' | 'published'
  published_at: string | null
  created_at: string
  updated_at: string
}

// ─── AuthorRequest ────────────────────────────────────────────

export interface AuthorRequest {
  id: string
  tenant_id: string
  name: string
  company: string | null
  email: string
  subject: string | null
  message: string | null
  status: 'new' | 'contacted'
  created_at: string
}

// ─── PublicationBlock ─────────────────────────────────────────

export interface PublicationBlock {
  id: string
  publication_id: string
  type: 'text' | 'features' | 'cta'
  title: string | null
  content: string | null
  order_index: number
  created_at: string
}

// ─── Convenience exports ─────────────────────────────────────

export type Publication   = Database['public']['Tables']['publications']['Row']
export type NewPublication = Database['public']['Tables']['publications']['Insert']
export type UpdatePublication = Database['public']['Tables']['publications']['Update']

export type Testimonial   = Database['public']['Tables']['testimonials']['Row']
export type NewTestimonial = Database['public']['Tables']['testimonials']['Insert']
export type UpdateTestimonial = Database['public']['Tables']['testimonials']['Update']

export type Project = Database['public']['Tables']['projects']['Row']
export type NewProject = Database['public']['Tables']['projects']['Insert']
export type UpdateProject = Database['public']['Tables']['projects']['Update']

export type Page          = Database['public']['Tables']['pages']['Row']
export type Setting       = Database['public']['Tables']['settings']['Row']

export type { SiteSettingsRow as SiteSettings }
export type { SeoSettingsRow as SeoSettings }
export type { NavigationItemRow as NavigationItem }
export type { ModuleRow as Module }
export type { FormRow as Form }

// ─── Chat ─────────────────────────────────────────────────────

export interface ChatConversation {
  id: string
  status: 'open' | 'closed'
  created_at: string
}

export interface ChatMessage {
  id: string
  conversation_id: string
  sender: 'user' | 'admin'
  message: string
  created_at: string
}
