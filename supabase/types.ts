export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      assessment_responses: {
        Row: {
          created_at: string | null
          dimension: string | null
          id: number
          participant_id: string | null
          question_key: string
          response_text: string | null
          response_value: string
        }
        Insert: {
          created_at?: string | null
          dimension?: string | null
          id?: number
          participant_id?: string | null
          question_key: string
          response_text?: string | null
          response_value: string
        }
        Update: {
          created_at?: string | null
          dimension?: string | null
          id?: number
          participant_id?: string | null
          question_key?: string
          response_text?: string | null
          response_value?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_responses_participant_id_fkey"
            columns: ["participant_id"]
            isOneToOne: false
            referencedRelation: "participants"
            referencedColumns: ["id"]
          },
        ]
      }
      assessment_sessions: {
        Row: {
          access_code: string | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          expires_at: string | null
          id: string
          is_premium: boolean | null
          organization_id: string | null
          status: string | null
          title: string | null
          type: string
        }
        Insert: {
          access_code?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_premium?: boolean | null
          organization_id?: string | null
          status?: string | null
          title?: string | null
          type: string
        }
        Update: {
          access_code?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_premium?: boolean | null
          organization_id?: string | null
          status?: string | null
          title?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_sessions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          employee_count: number | null
          id: string
          industry: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          employee_count?: number | null
          id?: string
          industry?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      participants: {
        Row: {
          completed_at: string | null
          department: string | null
          email: string | null
          id: string
          invited_at: string | null
          ip_address: unknown | null
          level: string | null
          name: string | null
          role: string | null
          session_id: string | null
          started_at: string | null
          tenure: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          department?: string | null
          email?: string | null
          id?: string
          invited_at?: string | null
          ip_address?: unknown | null
          level?: string | null
          name?: string | null
          role?: string | null
          session_id?: string | null
          started_at?: string | null
          tenure?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          department?: string | null
          email?: string | null
          id?: string
          invited_at?: string | null
          ip_address?: unknown | null
          level?: string | null
          name?: string | null
          role?: string | null
          session_id?: string | null
          started_at?: string | null
          tenure?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "session_overview"
            referencedColumns: ["id"]
          },
        ]
      }
      questions: {
        Row: {
          created_at: string | null
          dimension: string
          id: string
          is_active: boolean | null
          key: string
          options: Json | null
          order_index: number | null
          question_type: string | null
          target_audience: string[] | null
          text: string
        }
        Insert: {
          created_at?: string | null
          dimension: string
          id?: string
          is_active?: boolean | null
          key: string
          options?: Json | null
          order_index?: number | null
          question_type?: string | null
          target_audience?: string[] | null
          text: string
        }
        Update: {
          created_at?: string | null
          dimension?: string
          id?: string
          is_active?: boolean | null
          key?: string
          options?: Json | null
          order_index?: number | null
          question_type?: string | null
          target_audience?: string[] | null
          text?: string
        }
        Relationships: []
      }
      session_results: {
        Row: {
          completion_rate: number | null
          computed_at: string | null
          consensus_variance: Json | null
          department_breakdown: Json | null
          dimension_scores: Json | null
          id: string
          level_breakdown: Json | null
          overall_score: number | null
          risk_level: string | null
          risk_score: number | null
          session_id: string | null
          total_participants: number | null
        }
        Insert: {
          completion_rate?: number | null
          computed_at?: string | null
          consensus_variance?: Json | null
          department_breakdown?: Json | null
          dimension_scores?: Json | null
          id?: string
          level_breakdown?: Json | null
          overall_score?: number | null
          risk_level?: string | null
          risk_score?: number | null
          session_id?: string | null
          total_participants?: number | null
        }
        Update: {
          completion_rate?: number | null
          computed_at?: string | null
          consensus_variance?: Json | null
          department_breakdown?: Json | null
          dimension_scores?: Json | null
          id?: string
          level_breakdown?: Json | null
          overall_score?: number | null
          risk_level?: string | null
          risk_score?: number | null
          session_id?: string | null
          total_participants?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "session_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "assessment_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "session_results_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: true
            referencedRelation: "session_overview"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_responses: {
        Row: {
          created_at: string
          id: string
          respondent_company: string
          respondent_email: string | null
          respondent_name: string
          respondent_title: string
          responses: Json
          results: Json
          session_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          respondent_company: string
          respondent_email?: string | null
          respondent_name: string
          respondent_title: string
          responses: Json
          results: Json
          session_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          respondent_company?: string
          respondent_email?: string | null
          respondent_name?: string
          respondent_title?: string
          responses?: Json
          results?: Json
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "survey_responses_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "survey_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      survey_sessions: {
        Row: {
          company_name: string
          created_at: string
          created_by: string | null
          expires_at: string | null
          id: string
          notes: string | null
          responses_count: number | null
          session_code: string
          status: string | null
        }
        Insert: {
          company_name: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          notes?: string | null
          responses_count?: number | null
          session_code: string
          status?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string
          created_by?: string | null
          expires_at?: string | null
          id?: string
          notes?: string | null
          responses_count?: number | null
          session_code?: string
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      session_overview: {
        Row: {
          completed_participants: number | null
          completion_rate: number | null
          created_at: string | null
          id: string | null
          organization_id: string | null
          organization_name: string | null
          status: string | null
          title: string | null
          total_participants: number | null
          type: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessment_sessions_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      calculate_dimension_scores: {
        Args: { session_uuid: string }
        Returns: Json
      }
      get_completion_rate: {
        Args: { session_uuid: string }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
